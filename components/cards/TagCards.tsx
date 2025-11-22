import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
}

const TagCard = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const Content = (
    <>
      <Badge className="flex flex-row gap-2 text-[10px] font-medium leading-[13px] bg-[#F4F6F8] dark:bg-[#151821] text-[#858EAD] dark:text-[#7B8EC8] rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            width={12}
            height={12}
            alt="close icon"
            className="cursor-pointer object-contain invert-0 dark:invert"
            onClick={handleRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="text-[12px] font-medium leading-[15.6px] text-[#101012] dark:text-[#DCE3F1]">
          {questions}
        </p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button onClick={handleClick} className="flex justify-between gap-2">
        {Content}
      </button>
    ) : (
      <Link href={ROUTES.TAG(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light100_darknone">
      <article className="background-[#f4f6f8] dark:bg-[#0f1117] border-[#f4f6f8] dark:border-[#151821] flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-[#f4f6f8] dark:bg-[#212734] w-fit rounded-sm px-5 py-1.5">
            <p className="paragraph-semibold text-[#151821] dark:text-white">
              {name}
            </p>
          </div>
        </div>

        <p className="small-medium text-[#212734] dark:text-[#7b8ec8] mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {questions}+
          </span>
          Pertanyaan
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
