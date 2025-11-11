import { auth } from "@/auth";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
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
    author: { _id: "1", name: "Bu Rini" },
    upvotes: 23,
    answers: 7,
    views: 180,
    createdAt: new Date("2025-10-06"),
  },
  {
    _id: "2",
    title: "Sisa minyak goreng bisa dimanfaatin lagi nggak?",
    description:
      "Biasanya aku buang di wastafel, tapi katanya bisa nyumbat saluran air. Ada yang punya cara aman atau ide buat olah minyak jelantah?",
    tags: [
      { _id: "3", name: "minyak jelantah" },
      { _id: "4", name: "tips rumah tangga" },
    ],
    author: { _id: "2", name: "Bu Yanti" },
    upvotes: 35,
    answers: 12,
    views: 250,
    createdAt: new Date("2025-10-05"),
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
    author: { _id: "3", name: "Bu Lina" },
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
    author: { _id: "4", name: "Bu Nia" },
    upvotes: 19,
    answers: 4,
    views: 120,
    createdAt: new Date("2025-10-03"),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}
const HomePage = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );
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
      {/* HomeFilter */}
      <div className="mt-10 w-full flex flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default HomePage;
