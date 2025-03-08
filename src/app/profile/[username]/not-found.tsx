"use client";  // 👈 This tells Next.js it's a Client Component

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function NotFound() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className={`flex h-screen items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"} text-blue-500`}>
      <div className="text-center space-y-4 bg-blue-500 p-8 rounded-2xl shadow-lg border border-blue-700 text-white">
        <h2 className="text-3xl font-bold">404 - Not Found</h2>
        <p className="text-lg">Could not find the requested resource.</p>
        <p className="italic">This is our custom not found page.</p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
