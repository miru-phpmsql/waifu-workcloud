import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waifu WorksCloud",
  description: "Anime-inspired workspace for coding agents",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
