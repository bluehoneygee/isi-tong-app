"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { use, useState } from "react";

import { createVote } from "@/lib/actions/vote.action";
import { formatNumber } from "@/lib/utils";
import { HasVotedResponse } from "@/types/action";
import { ActionResponse } from "@/types/global";
import { toast } from "sonner";

interface Params {
  targetType: "question" | "answer";
  targetId: string;
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({
  upvotes,
  downvotes,
  hasVotedPromise,
  targetId,
  targetType,
}: Params) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { success, data } = use(hasVotedPromise);

  const [isLoading, setIsLoading] = useState(false);

  const { hasUpvoted, hasDownvoted } = data || {};

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast.success("Please login to vote", {
        description: "Only logged-in users can vote.",
      });

    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        toast.error("Failed to vote", {
          description:
            result.error?.message ||
            "Something went wrong while recording your vote",
        });
        return;
      }

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${
              !hasUpvoted ? "berhasil ditambahkan" : "berhasil dihapus"
            }`
          : `Downvote ${
              !hasDownvoted ? "berhasil ditambahkan" : "berhasil dihapus"
            }`;

      toast.success(`${successMessage}`, {
        description: "Vote kamu berhasil dicatatque",
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
          src={hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
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
          src={hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
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
