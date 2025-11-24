# isi-tong-app

A Next.js 16 (App Router) app for tanya-jawab seputar pengelolaan sampah. Pengguna bisa mendaftar/masuk, membuat pertanyaan, menjawab, memberi vote, menyimpan pertanyaan, dan menghasilkan jawaban AI di editor markdown.

## Fitur Utama
- Auth dengan NextAuth (OAuth) dan session-based actions.
- CRUD pertanyaan & jawaban dengan editor MDX (rich markdown).
- Vote up/down untuk pertanyaan & jawaban.
- Simpan pertanyaan (collections) + cek status tersimpan.
- Pencarian & filter (home, tags, collections).
- Rekomendasi pertanyaan (berdasar interaksi/tag).
- Statistik pengguna: total Q/A, badges (gold/silver/bronze), top tags.
- Right sidebar hot questions & top tags.

## Teknologi
- Next.js 16, React 19, TypeScript.
- Tailwind (globals + komponen shadcn).
- NextAuth.
- MongoDB/Mongoose.
- MDXEditor untuk rich text.
- ai / @ai-sdk/openai untuk jawaban AI.
- Sonner untuk toast.

## Menjalankan Secara Lokal
1) Instal dependencies:
```
npm install
```
2) Siapkan `.env.local` minimal:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
OPENAI_API_KEY=...
```
Jika DNS SRV bermasalah, gunakan URI non-SRV dengan `directConnection=true&tls=true`.

3) Jalanankan dev server:
```
npm run dev
```
Buka http://localhost:3000.

## Script NPM
- `npm run dev` – development server.
- `npm run build` – build produksi.
- `npm run start` – menjalankan hasil build.

## Catatan Pengembangan
- Halaman App Router; banyak action di `lib/actions/*` bergantung pada session (authorize).
- Komponen client menggunakan dynamic import untuk editor (`components/editor`).
- Pagination memakai query param `page` dan `pageSize`.
- Pastikan Mongo terkoneksi agar sidebar (hot questions/top tags) dan rekomendasi tidak error.

