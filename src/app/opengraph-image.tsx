import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(255,184,0,0.24), rgba(0,0,0,0) 40%), linear-gradient(180deg, #202020 0%, #111111 100%)",
          color: "white",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "36px",
            padding: "48px",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, textTransform: "uppercase" }}>
            <span>KAY</span>
            <span style={{ color: "#f4bf18" }}>BAKS</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, textTransform: "uppercase" }}>
              Oluklu Mukavva &amp; Kutu
            </div>
            <div style={{ fontSize: 28, color: "rgba(255,255,255,0.76)" }}>
              1999’dan beri üretimde · 2010’dan beri KAYBAKS markasıyla
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
