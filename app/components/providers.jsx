"use client"; // Mark this as a Client Component
import React from "react";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}