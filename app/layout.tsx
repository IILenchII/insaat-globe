import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Insaat Globe",
  description: "Interactive globe for Insaat project locations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
