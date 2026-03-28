"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// During build/prerender, the URL might be missing. We provide a placeholder 
// to prevent the client from crashing the build, as the real URL will be 
// available at runtime once configured in Vercel.
const convex = new ConvexReactClient(convexUrl || "https://invalid-url-for-build-time.convex.cloud");

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convexUrl) {
    console.warn("⚠️ NEXT_PUBLIC_CONVEX_URL is not defined. Convex features will be disabled until configured.");
  }
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
