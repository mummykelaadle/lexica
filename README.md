![cover](https://github.com/user-attachments/assets/a00cb1bf-0b07-4b29-83a8-2635e2bd8dbe)
## 📖 Introduction

Lexica enhances the reading experience by allowing users to seamlessly look up unfamiliar words without interrupting their flow. Key features include:

✅ **Scrollable Word Feed** – Instantly view word meanings while reading.  
✅ **Pre-reading Word Review** – Review difficult words before starting a book.  
✅ **Enhanced Comprehension** – Improve understanding and expand vocabulary effortlessly.

Lexica makes reading **smoother, faster, and more enjoyable!**

[![Last commit](https://img.shields.io/github/last-commit/mummykelaadle/lexica?color=green)](https://github.com/mummykelaadle/lexica)
[![Size](https://img.shields.io/github/repo-size/mummykelaadle/lexica?color=green)](https://github.com/mummykelaadle/lexica)

---

## 🚀 Tech Stack

Lexica is built using modern web technologies:

- 🛢 **MongoDB** – NoSQL database for storing words, books, and user data.
- ⚙  **Express.js** – Backend API to serve book and word data.
- ⚛  **React.js** – Frontend for a smooth and interactive UI.
- 🌐 **Node.js** – Server-side runtime environment.
- 🎨 **Shadcn + TailwindCSS** – Beautiful and responsive UI components.
- 🔷 **TypeScript** – Ensures type safety and better development experience.
- 📦 **DataMuse API** – API for word and book data.

---

## 🛠 Installation & Setup

Since we are using [pnpm](https://pnpm.io/) as our package manager, we highly recommend installing it globally first.
Install pnpm by running the following command in your terminal:

```bash
npm install -g pnpm
```

1️⃣ Clone the repository:
```bash
 git clone https://github.com/mummykelaadle/lexica.git
```

2️⃣ Install dependencies:
```bash
 cd lexica
 pnpm install-all
```

3️⃣ Start the development server:
```bash
 pnpm run dev
```

---

## 👨‍💻 Contributors

🔹 **Team Name:** MummyKeLaadle

- 👤 [Desh Deepak Kushwaha](https://github.com/DeshDeepakKushwaha)
- 👤 [Rajat Shukla](https://github.com/RajatX24)
- 👤 [Rituraj Singh](https://github.com/gintoki027)
- 👤 [Sujeet Mahto](https://github.com/MahtoSujeet)

🌟 _We welcome contributions! Feel free to fork and submit PRs._

---

## 🎉 Made at

<p align="center">
  <a href="https://weekendofcode.computercodingclub.in/">
    <img src="https://i.postimg.cc/Z9fC676j/devjam.jpg" height=60px>
  </a>
  <img src="https://i.postimg.cc/njCM24kx/woc.jpg" height=60px>
</p>

🏆 _Built with passion during_ [Weekend of Code](https://weekendofcode.computercodingclub.in/).

## File Structure
```
├── backend  
│   ├── package.json              <---- Backend package configuration  
│   ├── pnpm-lock.yaml            <---- Lock file for package dependencies  
│   ├── tsconfig.json             <---- TypeScript configuration  
│   └── src                       <---- Source code for backend  
│       ├── config  
│       │   ├── cloudinary.ts     <---- Cloudinary configuration for image uploads  
│       │   └── db.ts             <---- MongoDB configuration and connection setup  
│       ├── controllers           <---- Controller files handling API logic  
│       │   ├── bookController.ts <---- Handles book-related API requests  
│       │   ├── pdfController.ts  <---- Handles PDF processing requests  
│       │   ├── quizController.ts <---- Manages quiz API endpoints  
│       │   ├── userController.ts <---- Manages user-related logic  
│       │   └── wordController.ts <---- Manages word processing logic  
│       ├── data                  <---- Data sources for word difficulty models  
│       │   ├── concreteness.json <---- JSON data for word concreteness  
│       │   └── KupermanAoA.json  <---- Age of Acquisition data  
│       ├── external              <---- External API integrations  
│       │   └── dictionaryApi.ts  <---- Handles dictionary API requests  
│       ├── interfaces            <---- TypeScript interfaces  
│       │   ├── IBook.ts          <---- Interface for book objects  
│       │   ├── IPagePromise.ts   <---- Interface for page promises  
│       │   └── IWordPromise.ts   <---- Interface for word promises  
│       ├── middlewares           <---- Middleware functions  
│       │   └── uploadCover.ts    <---- Handles cover image uploads  
│       ├── models                <---- Mongoose models  
│       │   ├── bookModel.ts      <---- Schema for books  
│       │   ├── favouriteWord.ts  <---- Schema for favorite words  
│       │   ├── onBoardingTestScore.ts <---- Schema for onboarding test scores  
│       │   ├── pageModel.ts      <---- Schema for pages  
│       │   ├── SpacedRepetitionHistory.ts <---- Schema for spaced repetition  
│       │   ├── userModel.ts      <---- Schema for users  
│       │   ├── wordHistory.ts    <---- Schema for word history  
│       │   └── wordModel.ts      <---- Schema for words  
│       ├── routes                <---- API routes  
│       │   ├── bookRoutes.ts     <---- Routes for book operations  
│       │   ├── pdfRoutes.ts      <---- Routes for PDF operations  
│       │   ├── quizRoutes.ts     <---- Routes for quiz operations  
│       │   ├── userRoutes.ts     <---- Routes for user operations  
│       │   └── wordRoutes.ts     <---- Routes for word operations  
│       ├── server.ts             <---- Backend server setup  
│       └── utils                 <---- Utility functions  
│           ├── logger.ts         <---- Logging utilities  
│           ├── pdfParser.ts      <---- PDF parsing logic  
│           ├── pdfParserNew.ts   <---- Updated PDF parsing logic  
│           ├── pdfParsing/pdfUtils.ts <---- PDF utility functions  
│           └── word-difficulty   <---- Utilities for calculating word difficulty  
│           ├── difficult.ts      <---- Functions for identifying difficult words  
│           ├── getWordDifficulty.ts <---- Logic for calculating word difficulty  
│           ├── readAoAData.ts    <---- Reads Age of Acquisition data  
│           ├── readConcretenessData.ts <---- Reads concreteness data  
│           └── tmp.ts            <---- Temporary utilities  
├── frontend                      <---- Frontend project directory  
│   ├── components.json           <---- Component configuration  
│   ├── eslint.config.js          <---- ESLint configuration  
│   ├── index.html                <---- Frontend entry point  
│   ├── package.json              <---- Frontend package configuration  
│   ├── pnpm-lock.yaml            <---- Lock file for frontend dependencies  
│   ├── postcss.config.js         <---- PostCSS configuration  
│   ├── public                    <---- Public assets  
│   │   └── logo.svg              <---- Project logo  
│   ├── README.md                 <---- Frontend readme  
│   ├── src                       <---- Source code for frontend  
│   │   ├── animations            <---- Animation components  
│   │   │   ├── BooksLoading.tsx  <---- Book loading animation  
│   │   │   ├── NotEnoughWordPage.tsx <---- Animation for insufficient words  
│   │   │   ├── NotFound.tsx      <---- Not found page component  
│   │   │   ├── NotFoundAnimation.tsx <---- Animation for 404  
│   │   │   └── Spinner.tsx       <---- Loading spinner animation  
│   │   ├── App.css               <---- Global styles  
│   │   ├── App.tsx               <---- Main App component  
│   │   ├── assets                <---- Static assets  
│   │   │   ├── guruji.jpg        <---- Image asset  
│   │   │   ├── header-img.png    <---- Header image  
│   │   │   ├── shakes.jpg        <---- Image asset  
│   │   │   └── shree.jpg         <---- Image asset  
│   │   ├── components            <---- UI components  
│   │   │   ├── AppSidebar.tsx    <---- Sidebar component  
│   │   │   ├── BookCard.tsx      <---- Book card component  
│   │   │   ├── DropZone.tsx      <---- File upload component  
│   │   │   └── WordFeed.tsx      <---- Word feed component  
│   │   ├── hooks                 <---- Custom React hooks  
│   │   │   └── use-mobile.tsx    <---- Hook for mobile detection  
│   │   ├── index.css             <---- Global styles  
│   │   ├── interfaces            <---- TypeScript interfaces  
│   │   │   └── IBook.tsx         <---- Book interface  
│   │   ├── lib                   <---- Utility functions for frontend  
│   │   └── pages                 <---- Page components  
│   │       ├── Dashboard.tsx     <---- Dashboard page  
│   │       ├── FavoriteWords.tsx <---- Favorite words page  
│   │       ├── QuestionsPage.tsx <---- Questions page  
│   │       └── TestAddWordToHistory.tsx <---- Test word history addition  
│   ├── tailwind.config.js        <---- Tailwind CSS configuration  
│   ├── tsconfig.app.json         <---- TypeScript app config  
│   ├── tsconfig.node.json        <---- TypeScript node config  
│   └── vite.config.ts            <---- Vite configuration  
├── LICENSE                       <---- License file  
├── package.json                  <---- Root project package configuration  
├── pnpm-lock.yaml                <---- Root lock file  
└── README.md                     <---- Root project README file
```

