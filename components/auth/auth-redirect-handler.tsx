"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    // Check if we have recovery tokens in the hash (password reset)
    const hash = window.location.hash;
    if (hash && hash.includes("access_token") && hash.includes("type=recovery")) {
      // Redirect to reset password page with the hash intact
      router.replace(`/login/reset-password${hash}`);
    }
  }, [router]);

  return null;
}
