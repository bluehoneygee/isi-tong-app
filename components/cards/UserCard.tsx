import Link from "next/link";

import ROUTES from "@/constants/routes";
import UserAvatar from "../ui/UserAvatar";

interface User {
  _id: string;
  name: string;
  image?: string;
  username: string;
}
const UserCard = ({ _id, name, image, username }: User) => (
  <div className="shadow-light-100 dark:shadow-none w-full xs:w-[230px]">
    <article className="bg-white dark:bg-[#0f1117] border-[#f4f6f8] dark:border-[#151821] flex w-full flex-col items-center justify-center rounded-2xl border p-8">
      <UserAvatar
        id={_id}
        name={name}
        imageUrl={image}
        className="size-[100px] rounded-full object-cover"
        fallbackClassname="text-3xl tracking-widest"
      />

      <Link href={ROUTES.PROFILE(_id)}>
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">{name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">@{username}</p>
        </div>
      </Link>
    </article>
  </div>
);

export default UserCard;
