"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const filters = [
  { name: "kompos", value: "kompos" },
  { name: "plastik", value: "plastik" },
  //   { name: "Newest", value: "newest" },
  //   { name: "Popular", value: "popular" },
  //   { name: "Unanswered", value: "unanswered" },
  //   { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";
    if (filter === active) {
      setActive("");
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }

    router.push(newUrl, {
      scroll: false,
    });
  };
  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          className={cn(
            `body-medium rounded-lg capitalize px-6 py-3 shadow-none`,
            active === filter.value
              ? "bg-[#fff1e6] text-[#ff7000] hover:bg-[#fff1e6] dark:bg-[#212734] dark:text-[#ff7000] dark:hover:bg-[#212734]"
              : " bg-[#f4f6f8] text-[#7b8ec8] hover:bg-[#f4f6f8] dark:bg-[#151821] dark:text-[#7b8ec8] dark:hover:bg-[#151821]"
          )}
          key={filter.name}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
