import type { Metadata } from "next";
import React from "react";
import "../src/index.css";
import FirebaseAnalytics from "../src/components/FirebaseAnalytics";

export const metadata: Metadata = {
  title: "Không gian văn hoá hồ chí minh Hội LHPN Phường Bình Đông",
  description: "Không Gian Văn Hóa Hồ Chí Minh - Hội Liên Hiệp Phụ Nữ Phường Bình Đông. Học tập và làm theo tấm gương đạo đức, phong cách Hồ Chí Minh.",
  keywords: ["Hồ Chí Minh", "văn hóa", "di sản", "Bình Đông", "triển lãm số"],
  openGraph: {
    title: "Không gian văn hoá Hồ Chí Minh - Hội LHPN Phường Bình Đông",
    description: "Triển lãm số về di sản văn hóa Hồ Chí Minh",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <FirebaseAnalytics />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
