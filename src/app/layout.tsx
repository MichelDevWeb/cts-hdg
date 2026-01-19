import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HDG Design & Engineering Consultancy",
    template: "%s | HDG",
  },
  description:
    "HDG is a design and engineering consultancy providing highly feasible technical solutions, optimizing investment efficiency and aligning with real-world project conditions.",
  keywords: [
    "design consultancy",
    "engineering",
    "construction",
    "architecture",
    "MEP",
    "Vietnam",
    "HDG",
    "tư vấn thiết kế",
    "xây dựng",
  ],
  authors: [{ name: "HDG Design & Engineering" }],
  creator: "HDG Design & Engineering",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hdg.vn"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US", "zh_CN"],
    siteName: "HDG Design & Engineering Consultancy",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
