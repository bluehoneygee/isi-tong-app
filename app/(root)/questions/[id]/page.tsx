import TagCard from "@/components/cards/TagCards";
import Preview from "@/components/editor/Preview";

import Metric from "@/components/Metric";
import UserAvatar from "@/components/ui/UserAvatar";
import ROUTES from "@/constants/routes";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { RouteParams } from "@/types/global";
import Link from "next/link";

const sampleQuestion = {
  id: "q123",
  title:
    "Bagaimana cara mengelola sampah dapur agar lebih bijak dan tidak cepat menumpuk?",
  content: `### Question

Aku sedang belajar mengelola sampah dapur agar lebih rapi, tidak bau, dan lebih ramah lingkungan. Di rumah, hampir setiap hari ada sisa sayuran, kulit buah, bungkus makanan, dan minyak goreng bekas. Aku ingin lebih teratur memilah dan mengolahnya supaya tidak langsung berakhir di tong sampah.

#### What I've Tried:
- Memisahkan sampah organik & anorganik di dua wadah berbeda
- Menyimpan kulit jeruk dan buah untuk dibuat eco-enzym
- Mengurangi plastik sekali pakai
- Mengumpulkan minyak jelantah untuk dijual/donasi

#### Issues:
- Sampah organik cepat bau walaupun sudah dipisah
- Kadang bingung membedakan sampah yang bisa diolah vs yang tidak
- Eco-enzym kadang gagal karena busa berlebihan atau toples menggembung
- Antrian sampah menumpuk saat lupa memilah di hari sibuk

#### Key Areas I Need Help With:
1. Cara paling efektif mengurangi bau sampah organik di dapur
2. Tips memilah sampah rumah tangga dengan benar (organik, B3, plastik, kertas)
3. Langkah eco-enzym yang paling aman untuk pemula
4. Kebiasaan harian yang bisa diterapkan supaya sampah tidak numpuk

Berikut contoh sampah dapur harian di rumahku (kulit buah, sisa sayur, dan plastik tipis). Mungkin aku salah menanganinya? Tolong koreksi kalau ada yang keliru:

\`\`\`txt
Sisa sayur mentah: dimasukkan ke wadah organik
Kulit jeruk & lemon: disimpan untuk eco-enzym
Kemasan plastik minuman: dicuci dulu (tapi kadang lupa)
Minyak jelantah: ditampung, tapi cepat penuh
Sisa makanan matang: masih bingung apakah bisa jadi eco-enzym atau tidak
\`\`\`

#### Questions:
1. Apakah kulit buah harus dicuci dulu sebelum dibuat eco-enzym?
2. Bagaimana cara mengurangi bau sampah organik tanpa harus membuang setiap hari?
3. Apa tanda eco-enzym berhasil difermentasi dengan benar?
4. Apakah benar tidak semua plastik bisa langsung didaur ulang?
5. Tips sederhana agar keluarga ikut disiplin memilah sampah?

**Tags:** EcoEnzym, WasteSorting, GreenLiving, RumahTangga
`,
  createdAt: "2025-01-15T12:34:56.789Z",
  upvotes: 42,
  downvotes: 3,
  views: 1234,
  answers: 5,
  tags: [
    { _id: "tag1", name: "EcoEnzym" },
    { _id: "tag2", name: "WasteSorting" },
    { _id: "tag3", name: "Household" },
  ],
  author: {
    _id: "u456",
    name: "Ibu Melati",
    image: "/avatars/ibu-melati.png",
  },
};

const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const { author, createdAt, answers, views, tags, content } = sampleQuestion;
  return (
    <>
      <div className="flex justify-start items-center w-full flex-col">
        <div className="w-full flex flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              className="size-[22px]"
              fallbackClassname="text-[10px]"
            />
            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-[#151821] dark:text-[#dce3f1] ">
                {author.name}
              </p>
            </Link>
          </div>
          <div className="flex justify-end ">
            <p>Votes</p>
          </div>
        </div>
        <h2 className="h2-semibold text-[#0f1117] dark:text-white mt-3.5 w-full">
          {sampleQuestion.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock icon"
          value={`asked ${getTimeStamp(new Date(createdAt))}`}
          title=""
          textStyles="small-regular text-[#212734] dark:text-[#dce3f1]"
        />
        <Metric
          imgUrl="/icons/message.svg"
          alt="message icon"
          value={answers}
          title=""
          textStyles="small-regular text-[#212734] dark:text-[#dce3f1]"
        />
        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye icon"
          value={formatNumber(views)}
          title=""
          textStyles="small-regular text-[#212734] dark:text-[#dce3f1]"
        />
      </div>
      <Preview content={content} />

      <div className="mt-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id as string}
            name={tag.name}
            compact
          />
        ))}
      </div>
    </>
  );
};

export default QuestionDetails;
