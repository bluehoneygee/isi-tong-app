import SocialAuthForm from "@/components/forms/SocialAuthForm";
import Image from "next/image";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[url('/auth-light.png')] dark:bg-[url('/auth-dark.png')] bg-cover bg-center bg-no-repeat px-4 py-10 ">
      <section className="border-[#f4f6f8] dark:border-[#151821] min-w-full bg-[#f4f6f8] dark:bg-[#0f1117] rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8">
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold">Gabung IsiTong</h1>
            <p className="paragraph-regular text-[#101012] dark:text-[#858ead]">
              Dari dapur ke tong, kelola rumah lebih bijak.
            </p>
          </div>
          <Image
            src="/logo.svg"
            alt="IsiTong Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
