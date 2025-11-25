<div align="center">

  <h3 align="center">IsiTong</h3>

   <div align="center">
 A Next.js 16 (App Router) app for Q&A on waste management and the environment. Users can sign up/sign in, post questions, answer, vote, save questions, generate AI answers, and browse a Jakarta waste-bank directory (for now).
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🌐 [Environment](#environment)

## <a name="introduction">🤖 Introduction</a>

IsiTong is a community Q&A platform for waste management with AI-generated answers,gamification, recommendations, and a Jakarta waste-bank directory sourced from Satu Data Jakarta. Built on Next.js 16 App Router (SSG, ISR, SSR, PPR, Server Actions, caching, revalidation) for a production-ready experience. Auth runs on NextAuth/Auth.js (credentials + Google + GitHub), MongoDB stores the data, and Tailwind + shadcn/ui keep the UI consistent.

Users can ask and answer questions, request AI help, vote, bookmark, organize tags, join communities, and browse verified waste-bank listings. The editor supports MDX with light/dark modes, and OpenAI powers the AI answers.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js 16 (App Router) + React 19
- TypeScript
- MongoDB + Mongoose
- NextAuth/Auth.js (Credentials, Google)
- OpenAI (AI answers)
- TailwindCSS 4 + shadcn/ui
- React Hook Form + Zod
- MDX Editor (@mdxeditor/editor)
- Pino logger

## <a name="features">🔋 Features</a>

👉 **Authentication**: NextAuth with credentials (email/password), Google providers; session-aware UI.

👉 **Home Feed**: Questions list with search, filters (recent, trending, unanswered, most viewed), and pagination.

👉 **Ask & Edit**: MDX editor (light/dark), tag suggestions, server-side validation, and authorization for edits/deletes.

👉 **Question Details**: Rich content, view counter, answer sorting (newest/top), and AI-generated answer helper.

👉 **Voting & Bookmarks**: Upvote/downvote questions and answers, track interactions, and save items to collections.

👉 **Tags & Search**: Tag index with usage counts, tag detail pages, and global search across questions/users/tags.

👉 **Community & Profiles**: User directory with filters, plus profile pages showing badges, activity, and saved content.

👉 **Bank Sampah**: Jakarta waste-bank directory with wilayah filters, status, and pagination (hourly revalidation).

👉 **Responsive & Themed**: Light/dark themes, accessible components, and mobile-friendly layouts.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/bluehoneygee/isi-tong-app.git
cd isi-tong-app
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
# Mongodb
MONGODB_URI=

# OpenAI
OPENAI_API_KEY=

# Auth
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
NEXTAUTH_URL=
# Optional, overrides the default http://localhost:3000/api
NEXT_PUBLIC_BASE_URL=

```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the respective websites

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

For production, run `npm run build` then `npm start`.

## <a name="environment">🌐 Environment</a>

- Node.js 18+ is recommended (required by Next.js 16).
- MongoDB connection is mandatory for any data operations.
- OpenAI API key is required for AI answer generation.
- External data: the Bank Sampah directory fetches data from the Satu Data Jakarta public API with hourly revalidation.
