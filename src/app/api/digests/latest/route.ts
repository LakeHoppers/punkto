import { NextResponse } from "next/server";
import { getLatestDigest } from "@/modules/digest/infrastructure/digest-view";
import { isLocale } from "@/shared/locale";

export async function GET(request: Request) {
  const lang = new URL(request.url).searchParams.get("lang");
  const locale = isLocale(lang) ? lang : "tr";
  const digest = await getLatestDigest([], locale);
  if (!digest) {
    return NextResponse.json({ error: "No digest available yet" }, { status: 404 });
  }
  return NextResponse.json(digest);
}
