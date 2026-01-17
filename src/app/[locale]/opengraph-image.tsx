import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "HDG Design & Engineering Consultancy";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { locale: string } }) {
  const locale = params.locale;

  const titles: Record<string, string> = {
    vi: "Giải pháp kỹ thuật tối ưu",
    en: "Optimal Engineering Solutions",
    zh: "最优工程解决方案",
  };

  const subtitles: Record<string, string> = {
    vi: "Tư vấn Thiết kế Xây dựng",
    en: "Design & Engineering Consultancy",
    zh: "设计与工程咨询",
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a365d 0%, #243b53 50%, #334e68 100%)",
          padding: "60px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            background: "#d69e2e",
            borderRadius: "24px",
            fontSize: "48px",
            fontWeight: "bold",
            color: "#1a365d",
            marginBottom: "40px",
          }}
        >
          HDG
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          {titles[locale] || titles.en}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#bcccdc",
            textAlign: "center",
          }}
        >
          {subtitles[locale] || subtitles.en}
        </div>

        {/* Accent line */}
        <div
          style={{
            width: "120px",
            height: "4px",
            background: "#319795",
            marginTop: "40px",
            borderRadius: "2px",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

