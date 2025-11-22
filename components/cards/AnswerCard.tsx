import { Answer } from "@/types/global";
import UserAvatar from "../ui/UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { getTimeStamp } from "@/lib/utils";
import Preview from "../editor/Preview";
import { Suspense } from "react";
import Votes from "../votes/Votes";
import { hasVoted } from "@/lib/actions/vote.action";

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
}: Answer) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article className="border-[#f4f6f8] dark:border-[#151821] border-b  py-10">
      <span id={JSON.stringify(_id)} className="hash-span" />
      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 gap-1 items-start sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-2"
          />
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col sm:flex-row sm:items-center max-sm:ml-1"
          >
            <p className="body-semibold text-[#151821] dark:text-[#dce3f1]">
              {author.name ?? "Anonymous"}
            </p>
            <p className="small-regular text-[#858ead] dark:text-[#7b8ec8] ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden">•</span>
              Answered {getTimeStamp(createdAt)}
            </p>
          </Link>
        </div>
        <div className="flex justify-end">
          <Suspense fallback={<div>Loading...</div>}>
            <Votes
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              targetId={_id}
              hasVotedPromise={hasVotedPromise}
            />
          </Suspense>
        </div>
      </div>
      <Preview content={content} />
    </article>
  );
};

export default AnswerCard;
