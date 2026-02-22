"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Force scroll to top on every fresh page load / hard refresh
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);
  return null;
}
