import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Weekly - Your Weekly AI News Digest",
  description: "Weekly curated AI news covering LLMs, Agents, Chips, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
