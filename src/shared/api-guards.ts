import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/shared/prisma";

export class UnauthorizedError extends Error {}
export class ForbiddenError extends Error {}

/**
 * Lazily syncs the signed-in Clerk user into our User table (with a default
 * UserPreference row) on first authenticated request. There's no Clerk
 * webhook wired up yet (planned for later), so this upsert is the only thing
 * standing between "has a Clerk session" and "has an app-side User row".
 *
 * A user's `clerkId` can change out from under an existing row (e.g. the
 * 2026-09-15 Clerk Development -> Production cutover re-created every real
 * user with a new Clerk user id under the same email). Falling back to a
 * lookup by email and re-linking it, instead of blindly inserting, avoids a
 * unique-constraint crash on `email` and keeps the user's existing
 * preferences/subscription/history attached to the same app-side User row.
 */
export async function getOrCreateCurrentUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new UnauthorizedError("Not signed in");
  }

  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new UnauthorizedError("Not signed in");
  }

  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Clerk user has no email address");
  }

  const byClerkId = await prisma.user.findUnique({ where: { clerkId: userId }, include: { preference: true } });
  if (byClerkId) {
    return byClerkId;
  }

  const byEmail = await prisma.user.findUnique({ where: { email } });
  if (byEmail) {
    return prisma.user.update({
      where: { id: byEmail.id },
      data: { clerkId: userId, name: clerkUser.fullName || byEmail.name },
      include: { preference: true },
    });
  }

  return prisma.user.create({
    data: {
      clerkId: userId,
      email,
      name: clerkUser.fullName || undefined,
      preference: { create: {} },
    },
    include: { preference: true },
  });
}

/**
 * Vercel Cron invokes the target path with GET and, when CRON_SECRET is set,
 * automatically adds `Authorization: Bearer <CRON_SECRET>` — there's no way
 * to configure a custom header, so we check that convention directly.
 */
export function requireCronSecret(request: Request): void {
  const provided = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret?.trim() || provided !== `Bearer ${secret}`) {
    throw new UnauthorizedError("Invalid or missing cron secret");
  }
}

export async function requireAdmin() {
  const user = await getOrCreateCurrentUser();
  if (!user.isAdmin) {
    throw new ForbiddenError("Not an admin");
  }
  return user;
}
