import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "Data Tidak Ditemukan",
  message:
    "Sepertinya database sedang kosong. Tambahkan data baru untuk memulainya.",
  button: {
    text: "Tambah Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Terjadi Kesalahan",
  message: "Ups, sepertinya ada masalah pada sistem. Coba ulangi kembali ya.",
  button: {
    text: "Coba Lagi",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTION = {
  title: "Belum Ada Pertanyaan",
  message:
    "Papan pertanyaan masih kosong. Mungkin sedang menunggu pertanyaan cemerlang darimu!",
  button: {
    text: "Buat Pertanyaan",
    href: ROUTES.ASK_QUESTION,
  },
};

export const EMPTY_TAGS = {
  title: "Topik Tidak Ditemukan",
  message:
    "Belum ada topik yang dibuat. Tambahkan beberapa kata kunci untuk memulainya.",
  button: {
    text: "Buat Topik",
    href: ROUTES.TAGS,
  },
};

export const EMPTY_COLLECTIONS = {
  title: "Koleksi Masih Kosong",
  message:
    "Kamu belum membuat koleksi apa pun. Mulai kumpulkan hal-hal menarikmu di sini.",
  button: {
    text: "Buat Koleksi",
    href: ROUTES.COLLECTION,
  },
};

export const EMPTY_ANSWERS = {
  title: "Belum Ada Jawaban",
  message: "Papan jawaban masih kosong. Yuk berikan jawaban terbaikmu!",
};
