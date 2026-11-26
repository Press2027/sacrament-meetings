import { ImageResponse } from "next/og";

export const alt = "Sacrament Meeting Planner - Plan and organize sacrament meetings";
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #102a43 0%, #176b87 60%, #20a4a8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 25,
            fontWeight: 600,
            letterSpacing: 5,
            color: "#b8f3ee",
            marginBottom: 30,
          }}
        >
          MEETING PLANNING MADE SIMPLE
        </div>

        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 950,
          }}
        >
          Sacrament Meeting Planner
        </div>

        <div
          style={{
            fontSize: 30,
            marginTop: 35,
            color: "#e0f2fe",
          }}
        >
          Plan, organize, and manage meeting schedules.
        </div>

        <div
          style={{
            width: 150,
            height: 8,
            background: "#5eead4",
            marginTop: 55,
            borderRadius: 10,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
