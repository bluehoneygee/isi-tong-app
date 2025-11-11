import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <section className="w-full flex flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold">Semua Pertanyaan</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 text-white "
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Buat Pertanyaan</Link>
        </Button>
      </section>
      <section className="mt-11 ">LocalSearchBar</section>
      HomeFilter
      <div className="mt-10 w-full flex flex-col gap-6">
        <p>Question card 1</p>
        <p>Question card 1</p>
        <p>Question card 1</p>
        <p>Question card 1</p>
      </div>
    </>
  );
};

export default HomePage;
