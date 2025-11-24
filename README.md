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

## <a name="introduction">🤖 Introduction</a>

IsiTong is a community Q&A platform for waste management, with AI-generated answers, gamification, recommendations, and a directory of Jakarta waste banks (for now, more cities coming). Built on Next.js (SSG, ISR, SSR, PPR, Server Actions, Caching, Revalidation) for a production-ready experience.

Tech stack: MongoDB for data, NextAuth/Auth.js for authentication (Email/Password, Google), Tailwind + ShadCN UI for the interface. Users can ask and answer questions, request AI help, vote, bookmark, organize tags, join communities, earn badges/rewards, and browse waste bank listings.

## <a name="tech-stack">⚙️ Tech Stack</a>

- Zod
- Next.js
- NextAuth
- Open AI
- MongoDB
- ShadCN UI
- TypeScript
- TailwindCSS
- React Hook Form

## <a name="features">🔋 Features</a>

👉 **Authentication**: Secure sign-in with NextAuth, supporting Email/Password and Google

👉 **Home Page**: Displays questions with filters, search, and pagination for easy navigation.

👉 **Recommendations**: Personalized suggestions on the home page.

👉 **Complex Layout**: Organized layout with popular questions and tags in view.

👉 **Question Details**: View questions with rich content, including images and code blocks.

👉 **Voting**: Upvote/downvote on questions to highlight helpful content.

👉 **View Counter**: Tracks the number of views for each question.

👉 **Bookmarking**: Save questions for quick access later.

👉 **Answer Posting**: MDX editor with light/dark modes for submitting answers.

👉 **AI Answer Generation**: Get AI-generated responses to questions.

👉 **Answer Filtering**: Sort answers by newest or most-voted, with pagination.

👉 **Answer Voting**: Upvote/downvote answers to rank quality responses.

👉 **Collections**: Organized saved questions with filters, search, and pagination.

👉 **Community**: Browse all users with search, filters, and pagination.

👉 **Profile**: View user info, badges, and engagement history with pagination.

👉 **Job Finder**: Discover jobs with filters and search, tailored to the user’s location.

👉 **Tags Page**: List of all tags with question counts, filters, and pagination.

👉 **Tag Details**: View questions by tag with search and pagination.

👉 **Ask a Question**: Simple interface for posting new questions.

👉 **Edit & Delete**: Update or remove questions and answers with validation and authorization.

👉 **Global Search**: Find content across questions, users, tags, and more.

👉 **Responsive Design**: Fully optimized for a seamless experience on desktops, tablets, and mobile devices.

👉 **High Performance**: Fast loading and smooth interactions for an efficient user experience.

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone hhttps://github.com/bluehoneygee/isi-tong-app.git
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
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
NEXTAUTH_URL=

```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up on the respective websites

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
