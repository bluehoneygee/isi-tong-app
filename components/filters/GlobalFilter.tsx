"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { GlobalSearchFilters } from "@/constants/filter";

const GlobalFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    let newUrl = "";

    if (active === item) {
      setActive("");

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["type"],
      });
    } else {
      setActive(item);

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-[#212734] dark:text-white body-medium">Type:</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`border-[#dce3f1] dark:bg-[#212734] small-medium rounded-2xl px-5 py-2 capitalize ${
              active === item.value
                ? "bg-[#ff7000] text-white"
                : "bg-[#dce3f1] text-[#212734] hover:text-[#ff7000] dark:bg-[#101012] dark:text-[#f4f6f8] dark:hover:text-[#ff7000]"
            }`}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilter;
