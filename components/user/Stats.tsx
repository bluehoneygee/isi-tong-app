import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types/global";
import Image from "next/image";
import React from "react";

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
  reputationPoints: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => (
  <div className="border-[#f4f6f8] dark:border-[#151821] bg-white dark:bg-[#151821] flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-[-10px_10px_20px_0px_rgba(218_213_213_0.1)]  dark:shadow-[2px_0px_20px_0px_rgba(39_36_36_0.04)]">
    <Image src={imgUrl} alt={title} width={40} height={50} />
    <div>
      <p className="paragraph-semibold text-[#0f1117] dark:text-white">
        {value}
      </p>
      <p className="body-medium text-[#151821] dark:text-[#dce3f1]">{title}</p>
    </div>
  </div>
);
const Stats = ({
  totalQuestions,
  totalAnswers,
  badges,
  reputationPoints,
}: Props) => {
  return (
    <div className="mt-3 ">
      <h4 className="h3-semibold text-[#0f1117] dark:text-white ">
        Stats{" "}
        <span className="small-semibold primary-text-gradient">
          {formatNumber(reputationPoints)}
        </span>
      </h4>
      <div className="mt-5 grid grid-cols-2 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="border-[#f4f6f8] dark:border-[#151821] bg-white dark:bg-[#151821] flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-[-10px_10px_20px_0px_rgba(218_213_213_0.1)]  dark:shadow-[2px_0px_20px_0px_rgba(39_36_36_0.04)]">
          <div>
            <p className="paragraph-semibold text-[#0f1117] dark:text-white">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-[#212734] dark:text-[#dce3f1]">
              Pertanyaan
            </p>
          </div>
          <div>
            <p className="paragraph-semibold text-[#0f1117] dark:text-white">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-[#212734] dark:text-[#dce3f1]">
              Jawaban
            </p>
          </div>
        </div>
        <StatsCard
          imgUrl="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
