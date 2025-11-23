import { auth } from "@/auth";
import ProfileLink from "@/components/user/ProfileLink";

import { getUser } from "@/lib/actions/user.action";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RouteParams } from "@/types/global";
import UserAvatar from "@/components/ui/UserAvatar";
import Stats from "@/components/user/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = async ({ params }: RouteParams) => {
  const { id } = await params;

  if (!id) notFound();

  const loggedInUser = await auth();
  const { success, data, error } = await getUser({
    userId: id,
  });

  if (!success)
    return (
      <div>
        <div className="h1-bold">{error?.message}</div>
      </div>
    );

  const { user, totalQuestions, totalAnswers } = data!;
  const { _id, name, image, portfolio, location, createdAt, username, bio } =
    user;

  return (
    <>
      <section className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <UserAvatar
            id={_id}
            name={name}
            imageUrl={image}
            className="size-[140px] rounded-full object-cover"
            fallbackClassname="text-6xl fond-bolder"
          />

          <div className="mt-3">
            <h2 className="h2-bold ">{name}</h2>
            <p className="paragraph-regular text-[#0f1117] dark:text-[#f4f6f8] ">
              @{username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {portfolio && (
                <ProfileLink
                  imgUrl="/icons/link.svg"
                  href={portfolio}
                  title="Portfolio"
                />
              )}
              {location && (
                <ProfileLink imgUrl="/icons/location.svg" title="Portfolio" />
              )}
              <ProfileLink
                imgUrl="/icons/calendar.svg"
                title={dayjs(createdAt).format("MMMM YYYY")}
              />
            </div>

            {bio && (
              <p className="paragraph-regular  text-[#212734] dark:text-[#f4f6f8] mt-8">
                {bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {loggedInUser?.user?.id === id && (
            <Link href="/profile/edit">
              <Button className="paragraph-medium bg-[#f4f6f8] dark:bg-[#212734] text-[#151821] dark:text-white min-h-12 min-w-44 px-4 py-3">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>
      </section>
      <Stats
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={{ GOLD: 0, BRONZE: 0, SILVER: 0 }}
      />
      <section className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="w-[400px] flex-2">
          <TabsList className="bg-[#f4f6f8] dark:bg-[#212734] min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Pertanyaan Teratas
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Jawaban
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            List of Questions
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            List of Answers
          </TabsContent>
        </Tabs>
        <div className="flex w-full min-w-[250px] flex-1 flex-col max-lg:hidden">
          <h3 className="h3-bold  text-[#0f1117] dark:text-white">Top Tags</h3>
          <div className="mt-7 flex flex-col gap-4">
            <p>List of tags</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
