import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, OG_ALT } from "@/lib/og";

// Same card as the Open Graph image, served for the Twitter/X summary_large_image.
export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard />, { ...OG_SIZE });
}
