import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "AgriSim: Multi-Agent Crop Simulator",
  description:
    "Advanced simulation platform for modeling complex agricultural systems using multi-agent technology.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={archivo.className}>{children}</body>
    </html>
  );
}

import "./globals.css";
