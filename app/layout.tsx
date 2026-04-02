import type { Metadata } from "next";
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
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
