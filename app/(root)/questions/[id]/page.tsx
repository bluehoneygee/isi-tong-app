import TagCard from "@/components/cards/TagCards";
import Preview from "@/components/editor/Preview";

import Metric from "@/components/Metric";
import UserAvatar from "@/components/ui/UserAvatar";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { RouteParams } from "@/types/global";
import Link from "next/link";
import { redirect } from "next/navigation";

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { success, data: question } = await getQuestion({ questionId: id });

  if (!success || !question) return redirect("404");
  const { author, createdAt, answers, views, tags, content, title } = question;
  return (
    <>
      <div className="flex justify-start items-center w-full flex-col">
        <div className="w-full flex flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              className="size-[22px]"
              fallbackClassname="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-[#151821] dark:text-[#dce3f1] ">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end ">
            <p>Votes</p>
          </div>
        </div>
        <h2 className="h2-semibold text-[#0f1117] dark:text-white mt-3.5 w-full">
          {title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-[#212734] dark:text-[#dce3f1]"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyles="small-regular text-[#212734] dark:text-[#dce3f1]"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title=""
          textStyles="small-regular text-[#212734] dark:text-[#dce3f1]"
        />
      </div>
      <Preview content={content} />

      <div className="mt-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
    </>
  );
};

export default QuestionDetails;
