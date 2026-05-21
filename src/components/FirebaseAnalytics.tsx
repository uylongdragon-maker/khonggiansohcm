"use client";
import { useEffect } from "react";
import { initAnalytics } from "@/src/lib/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    initAnalytics().catch(console.error);
  }, []);

  return null;
}
