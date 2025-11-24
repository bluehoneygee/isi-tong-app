import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import NavLinks from "./NavLinks";
import { auth, signOut } from "@/auth";
import { LogOut } from "lucide-react";

const MobileNavigation = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-white dark:bg-[#0f1117] border-none p-4"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1 ">
          <Image src="/logo.svg" width={40} height={40} alt="Logo IsiTong" />
          <p className="font-grotesk h2-bold text-black dark:text-white ">
            Isi <span className="text-[#ff7000]">Tong</span>
          </p>
        </Link>
        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            {userId ? (
              <SheetClose asChild>
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
                    <span className=" text-[#151821] dark:text-white">
                      {" "}
                      Keluar{" "}
                    </span>
                  </Button>
                </form>
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_IN}>
                    <Button className="small-medium bg-[#f4f6f8] dark:bg-[#212734] min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient"> Log In</span>
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={ROUTES.SIGN_UP}>
                    <Button className="small-medium border-[#dce3f1] dark:border-[#212734] bg-[#dce3f1] dark:bg-[#151821] text-[#212734] dark:text-white min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                      <span> Sign Up</span>
                    </Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
