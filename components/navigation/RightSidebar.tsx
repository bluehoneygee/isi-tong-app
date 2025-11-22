import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCards";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "../DataRenderer";
import { title } from "process";
import { getTopTags } from "@/lib/actions/tag.action";

const popularTags = [
  { _id: "1", name: "sampah rumah tangga", questions: 130 },
  { _id: "2", name: "plastik kemasan", questions: 110 },
  { _id: "3", name: "bank sampah", questions: 95 },
  { _id: "4", name: "kompos", questions: 85 },
  { _id: "5", name: "tips hemat", questions: 70 },
];

const RightSidebar = async () => {
  const { success, data: hotQuestions, error } = await getHotQuestions();
  const {
    success: tagSuccess,
    data: tags,
    error: tagError,
  } = await getTopTags();
  return (
    <section className="pt-30 custom-scrollbar bg-white dark:bg-[#0f1117] border-[#f4f6f8] dark:border-[#151821] sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-[-10px_10px_20px_0px_rgba(218_213_213_0.1)] dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-[#0f1117] dark:text-white ">
          Pertanyaan Teratas
        </h3>

        <DataRenderer
          data={hotQuestions}
          empty={{
            title: "No questions found",
            message: "No questions have been asked yet.",
          }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {hotQuestions.map(({ _id, title }) => (
                <Link
                  key={_id}
                  href={ROUTES.QUESTION(_id)}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-[#101012] dark:text-[#dce3f1] line-clamp-2">
                    {title}
                  </p>

                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-16">
        <h3 className="text-[20px] font-bold leading-[26px] text-[#0F1117] dark:text-white">
          Topik Populer
        </h3>

        <DataRenderer
          data={tags}
          empty={{
            title: "No tags found",
            message: "No tags have been created yet.",
          }}
          success={tagSuccess}
          error={tagError}
          render={(tags) => (
            <div className="mt-7 flex w-full flex-col gap-[30px]">
              {tags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  showCount
                  compact
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
