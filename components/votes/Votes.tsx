"use client";

import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

interface Params {
  upvotes: number;
  hasupVoted: boolean;
  downvotes: number;
  hasdownVoted: boolean;
}
const Votes = ({ upvotes, hasupVoted, downvotes, hasdownVoted }: Params) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [isLoading, setIsLoading] = useState(false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast.error("Please log in to vote", {
        description: "You need to be logged in to use this feature",
      });

    setIsLoading(true);
    try {
      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasupVoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasdownVoted ? "added" : "removed"} successfully`;

      toast.success(`${successMessage}`, {
        description: "Your vote has been recorded",
      });
    } catch (error) {
      toast.error("Failed to vote", {
        description: "An error ocurred while voting. Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center gap-2.5">
      <div className="flex items-center justify-between gap-1.5">
        <Image
          src={hasupVoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          width={18}
          height={18}
          alt="upvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />
        <div className="flex items-center justify-center bg-[#dce3f1] dark:bg-[#212734] min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-[#212734] dark:text-white">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1.5">
        <Image
          src={hasdownVoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          width={18}
          height={18}
          alt="downvote"
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />
        <div className="flex items-center justify-center bg-[#dce3f1] dark:bg-[#212734] min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-[#212734] dark:text-white">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
