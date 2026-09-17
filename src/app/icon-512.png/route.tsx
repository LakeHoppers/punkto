import { ImageResponse } from "next/og";
import { BrandMark } from "@/shared/brand-mark";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<BrandMark size={512} />, { width: 512, height: 512 });
}
