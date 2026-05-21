import type { Metadata } from "next";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Không gian văn hoá hồ chí minh Hội LHPN Phường Bình Đông",
  description: "Không Gian Văn Hóa Hồ Chí Minh trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
