import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";

import Metric from "../Metric";
import ROUTES from "@/constants/routes";
import TagCard from "./TagCards";
import { Question, Tag } from "@/types/global";

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) => {
  return (
    <div className=" bg-[#FFFFFF] dark:bg-[#0F1117] shadow-[0_12px_20px_0_rgba(184,184,184,0.03),0_6px_12px_0_rgba(184,184,184,0.02),0_2px_4px_0_rgba(184,184,184,0.03)] dark:shadow-[0_2px_10px_0_rgba(46,52,56,0.10)] p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="text-[10px] font-normal leading-[13px] text-[#212734] dark:text-[#DCE3F1] line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold text-[18px] font-semibold leading-[25.2px] text-[#0F1117] dark:text-[#FFFFFF] line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: Tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>
      <div className="mt-6 w-full flex items-center justify-between flex-wrap gap-3">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)} `}
          href={ROUTES.PROFILE(author._id)}
          textStyles="text-[14px] font-medium leading-[18.2px] text-[#212734] dark:text-[#DCE3F1]"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="like"
            value={upvotes}
            title="Votes"
            textStyles="text-[12px] font-medium leading-[15.6px] text-[#212734] dark:text-[#F4F6F8]"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="answers"
            value={answers}
            title="Answers"
            textStyles="text-[12px] font-medium leading-[15.6px] text-[#212734] dark:text-[#F4F6F8]"
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="views"
            value={views}
            title="Views"
            textStyles="text-[12px] font-medium leading-[15.6px] text-[#212734] dark:text-[#F4F6F8]"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
