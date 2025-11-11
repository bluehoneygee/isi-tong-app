import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Theme } from "./Theme";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white dark:bg-[#0f1117] fixed z-50 w-full p-6 dark:shadow-none sm:px-12 shadow-[-10px_10px_20px_0px_rgba(218,213,213,0.1)] gap-5">
      <Link href="/" className="flex items-center gap-1">
        <Image src="logo.svg" width={23} height={23} alt="isi tong logo" />
        <p className="font-grotesk h2-bold text-black dark:text-white max-sm:hidden">
          Isi<span className="text-[#ff7000]">Tong</span>
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex justify-between items-center gap-5">
        <Theme />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
