import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, OG_ALT } from "@/lib/og";

// Auto-generated Open Graph card. Next picks this up via the file convention and
// wires the absolute URL into the page metadata (metadataBase set in layout).
export const runtime = "edge";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgCard />, { ...OG_SIZE });
}
