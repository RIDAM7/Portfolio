/**
 * Shared artwork for the auto-generated social cards (opengraph-image +
 * twitter-image). 1200×630, on-brand: near-black canvas, faint engineering
 * grid, a violet→blue gradient name, and the role line. Rendered by next/og's
 * ImageResponse (Satori), so styles stay to the supported inline subset and
 * every multi-child element sets display:flex.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT =
  "Ridam Agrawal — Full-Stack Developer | Backend & AI Engineer";

const BG = "#0a0a0b";
const ACCENT = "#8b73e8";
const ACCENT_2 = "#4f8cff";
const FG = "#ededef";
const FG_MUTED = "#a1a1aa";

export function OgCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: BG,
        padding: "80px",
        position: "relative",
      }}
    >
      {/* Violet glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-160px",
          width: "640px",
          height: "640px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(110,86,207,0.45), transparent 70%)",
        }}
      />

      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: FG_MUTED,
          fontFamily: "monospace",
        }}
      >
        Portfolio
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 116,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        <span style={{ color: FG, marginRight: "0.28em" }}>Ridam</span>
        <span
          style={{
            backgroundImage: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})`,
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Agrawal
        </span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 40,
          color: FG_MUTED,
        }}
      >
        Full-Stack Developer · Backend &amp; AI Engineer
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 56,
          width: 200,
          height: 8,
          borderRadius: 9999,
          background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})`,
        }}
      />
    </div>
  );
}
