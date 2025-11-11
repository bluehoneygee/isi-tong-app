"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

interface Props {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const LocalSearch = ({ route, imgSrc, placeholder, otherClasses }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Stabilkan string params buat dependency
  const searchParamsStr = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  // Ambil nilai awal dari URL
  const initialQuery = searchParams.get("query") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Sinkronkan input kalau URL berubah (back/forward)
  useEffect(() => {
    const q = new URLSearchParams(searchParamsStr).get("query") ?? "";
    setSearchQuery(q);
  }, [searchParamsStr]);

  // Debounce
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (pathname !== route) return; // batasi ke rute target

      const q = searchQuery.trim();
      if (q.length > 0) {
        const newUrl = formUrlQuery({
          params: searchParamsStr,
          key: "query",
          value: q,
          // kalau util-mu mendukung basePath, sertakan:
          // basePath: pathname,
        });
        router.replace(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParamsStr,
          keysToRemove: ["query"],
          // basePath: pathname,
        });
        router.replace(newUrl, { scroll: false });
      }
    }, 400);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery, pathname, route, router, searchParamsStr]);

  return (
    <div
      className={`bg-[#F4F6F8] dark:bg-[#0F1117] flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${
        otherClasses ?? ""
      }`}
    >
      <Image
        src={imgSrc}
        alt="Search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="text-[16px] font-normal leading-[22.4px] no-focus border-none shadow-none outline-none placeholder:text-[#858ead] dark:placeholder:text-[#7b8ec8] text-[#212734] dark:text-[#dce3f1]"
      />
    </div>
  );
};

export default LocalSearch;
