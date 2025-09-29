"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DotLoader from "@/components/DotLoader/DotLoader";

export default function AuthLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <main className="padding-bottom">{children}</main>
    </>
  );
}
