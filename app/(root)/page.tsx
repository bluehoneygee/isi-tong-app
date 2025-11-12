import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "Kalau plastik kemasan detergen termasuk jenis apa ya?",
    description:
      "Aku mau setor ke bank sampah, tapi bingung plastik Rinso sama Sunlight itu jenisnya apa. Harus dipisah nggak sih, Bu?",
    tags: [
      { _id: "1", name: "plastik kemasan" },
      { _id: "2", name: "bank sampah" },
    ],
    author: {
      _id: "1",
      name: "Bu Rini",
      image:
        "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    },
    upvotes: 23,
    answers: 7,
    views: 180,
    createdAt: new Date(),
  },

  {
    _id: "3",
    title: "Cara bikin kompos dari sisa dapur yang gampang gimana?",
    description:
      "Aku punya sisa sayur dan kulit buah tiap hari. Pengen coba bikin kompos sendiri, tapi takut bau atau kotor. Ada tipsnya, Bu?",
    tags: [
      { _id: "5", name: "kompos" },
      { _id: "6", name: "organik" },
    ],
    author: {
      _id: "3",
      name: "Bu Lina",
      image:
        "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    },
    upvotes: 42,
    answers: 15,
    views: 310,
    createdAt: new Date("2025-10-04"),
  },
  {
    _id: "4",
    title: "Perlu dicuci nggak sih sebelum buang botol minuman?",
    description:
      "Aku kadang males nyuci botol plastik sebelum buang. Tapi katanya harus dicuci dulu biar nggak bau. Gimana pengalaman ibu-ibu lain?",
    tags: [
      { _id: "7", name: "plastik" },
      { _id: "8", name: "daur ulang" },
    ],
    author: {
      _id: "4",
      name: "Bu Nia",
      image:
        "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg",
    },
    upvotes: 19,
    answers: 4,
    views: 120,
    createdAt: new Date("2025-10-03"),
  },
];

const test = async () => {
  try {
    await dbConnect();
  } catch (error) {
    return handleError(error);
  }
};
interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const HomePage = async ({ searchParams }: SearchParams) => {
  const result = await test();
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

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
      <section className="mt-11 ">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 w-full flex flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
