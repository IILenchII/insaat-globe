import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import { LanguageProvider } from "@/components/site/LanguageProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aydiner Construction",
  description: "Aydiner Construction bilingual project showcase website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-light">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
