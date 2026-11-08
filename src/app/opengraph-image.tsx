import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt =
  "Ishan Kc — Computer Science student and HCI researcher at Kathmandu University";
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
          alignItems: "stretch",
          backgroundColor: "#F5EAD4",
          display: "flex",
          height: "100%",
          padding: "52px",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "#FAF0DC",
            border: "4px solid #3B2A20",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "20px" }}>
            <div
              style={{
                alignItems: "center",
                backgroundColor: "#800020",
                border: "3px solid #3B2A20",
                borderRadius: "999px",
                color: "#FFF4E0",
                display: "flex",
                fontSize: "30px",
                fontWeight: 700,
                height: "84px",
                justifyContent: "center",
                width: "84px",
              }}
            >
              KC
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#800020",
                  fontSize: "22px",
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                }}
              >
                Portfolio
              </span>
              <span style={{ color: "#584141", fontSize: "22px" }}>
                {site.location}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#3B2A20",
                fontSize: "96px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              Ishan Kc
            </span>
            <span
              style={{
                color: "#800020",
                fontSize: "38px",
                marginTop: "18px",
              }}
            >
              Computer Science Student &amp; HCI Researcher
            </span>
            <span
              style={{
                color: "#584141",
                fontSize: "26px",
                marginTop: "12px",
              }}
            >
              Kathmandu University · Frontend developer
            </span>
          </div>

          <div style={{ alignItems: "center", display: "flex", gap: "14px" }}>
            <span
              style={{ backgroundColor: "#B8923A", height: "2px", width: "64px" }}
            />
            <span style={{ color: "#584141", fontSize: "22px" }}>
              Human-computer interaction, web tools, and AI experiments
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
