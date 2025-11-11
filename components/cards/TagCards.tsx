import Link from "next/link";
import { Badge } from "../ui/badge";
import ROUTES from "@/constants/routes";
interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}

const TagCard = ({ _id, name, questions, showCount, compact }: Props) => {
  return (
    <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
      <Badge className="text-[10px] font-medium leading-[13px] bg-[#F4F6F8] dark:bg-[#151821] text-[#858EAD] dark:text-[#7B8EC8] rounded-md border-none px-4 py-2 uppercase">
        <div className="flex-center space-x-2">
          <span>{name}</span>
        </div>
      </Badge>
      {showCount && (
        <p className="text-[12px] font-medium leading-[15.6px] text-[#101012] dark:text-[#DCE3F1]">
          {questions}
        </p>
      )}
    </Link>
  );
};

export default TagCard;
