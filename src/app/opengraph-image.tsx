import { ImageResponse } from "next/og";
import { OgImageContent, OG_ALT, OG_SIZE } from "@/utils/ogImage";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
