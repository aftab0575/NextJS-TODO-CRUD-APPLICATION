"use client";  // 👈 Make it a Client Component

import "./globals.css";
import { Providers } from "./components/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
