import React from "react";
import NavLinks from "./navbar/NavLinks";
import { Button } from "../ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

const LeftSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <section className="custom-scrollbar bg-white dark:bg-[#0f1117] border-[#f4f6f8] dark:border-[#151821] sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-30 shadow-[-10px_10px_20px_0px_rgba(218_213_213_0.1)] dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-2">
        <NavLinks userId={userId} />
      </div>
      <div className="flex flex-col gap-3">
        {userId ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              className="base-medium w-fit bg-transparent! px-4 py-3"
            >
              <LogOut className="size-5 text-black dark:text-white" />
              <span className="max-lg:hidden text-[#151821] dark:text-white">
                {" "}
                Logout{" "}
              </span>
            </Button>
          </form>
        ) : (
          <>
            <Button
              asChild
              className="small-medium bg-[#f4f6f8] dark:bg-[#212734] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <Link href={ROUTES.SIGN_IN}>
                <Image
                  src="/icons/account.svg"
                  alt="Account"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  {" "}
                  Log In
                </span>{" "}
              </Link>
            </Button>

            <Button
              asChild
              className="small-medium border-[#dce3f1] dark:border-[#212734] bg-[#dce3f1] dark:bg-[#151821] text-[#212734] dark:text-white min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
            >
              <Link href={ROUTES.SIGN_UP}>
                <Image
                  src="/icons/sign-up.svg"
                  alt="Sign up"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden"> Sign Up</span>{" "}
              </Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;
