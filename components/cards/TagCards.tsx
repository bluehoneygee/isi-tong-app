import Link from "next/link";
import { Badge } from "../ui/badge";
import ROUTES from "@/constants/routes";
import Image from "next/image";
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
            alt="Close Icon"
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
      <Link href={ROUTES.TAGS(_id)} className="flex justify-between gap-2">
        {Content}
      </Link>
    );
  }
};

export default TagCard;
