<h1 align="center"><i>Lexica</i></h1>
<p align="center">
  <img src="https://i.postimg.cc/njCM24kx/woc.jpg" height=60px>
</p>


## 📖 Introduction

Lexica enhances the reading experience by allowing users to seamlessly look up unfamiliar words without interrupting their flow. Key features include:

✅ **Scrollable Word Feed** – Instantly view word meanings while reading.  
✅ **Pre-reading Word Review** – Review difficult words before starting a book.  
✅ **Enhanced Comprehension** – Improve understanding and expand vocabulary effortlessly.

Lexica makes reading **smoother, faster, and more enjoyable!**

---

## 🚀 Tech Stack

Lexica is built using modern web technologies:

- 🛢 **MongoDB** – NoSQL database for storing words, books, and user data.
- ⚙ **Express.js** – Backend API to serve book and word data.
- ⚛ **React.js** – Frontend for a smooth and interactive UI.
- 🌐 **Node.js** – Server-side runtime environment.
- 🎨 **Shadcn + TailwindCSS** – Beautiful and responsive UI components.
- 🔷 **TypeScript** – Ensures type safety and better development experience.

---

## 🛠 Installation & Setup

1️⃣ Clone the repository:
```bash
 git clone https://github.com/your-repo-name.git
```

2️⃣ Install dependencies:
```bash
 cd lexica
 pnpm install
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
</p>

🏆 _Built with passion during_ [Weekend of Code](https://weekendofcode.computercodingclub.in/).

## File Structure
```
backend/
├── src/
│   ├── config/                <-- Configuration files
│   │   └── dbConnect.ts       <-- Database connection
│   ├── external/              <-- External API integrations
│   │   └── wordMeaningApi.ts  <-- Handles interaction with word-meaning API
│   ├── logs/                  <-- Folder for log files
│   │   ├── app.log            <-- General log file
│   │   └── error.log          <-- Error-specific log file (Will manage later)
│   ├── models/                <-- Mongoose models for MongoDB
│   │   ├── bookModel.ts       <-- Book schema
│   │   ├── pageModel.ts       <-- Page schema
│   │   └── wordModel.ts       <-- Word schema
│   ├── routes/                <-- Route definitions
│   │   ├── bookRoutes.ts      <-- Routes related to books
│   │   └── wordRoutes.ts      <-- Routes related to words
│   ├── services/              <-- Business logic and database interactions
│   │   ├── bookService.ts     <-- Operations on books
│   │   └── wordService.ts     <-- Operations on words
│   ├── utils/                 <-- Utility files
│   │   └── logger.ts          <-- Centralized logging utility
│   └── server.ts              <-- Backend entry point
├── package.json               <-- Backend dependencies and scripts
├── tsconfig.json              <-- TypeScript configuration for backend
├── .env                       <-- Environment variables (e.g., DB URI, API keys)
└── logs/                      <-- Log storage (may be outside src/ for clarity)
    ├── app.log
    └── error.log

frontend/
├── public/                    <-- Public assets
│   └── index.html             <-- Main HTML template
├── src/                       <-- Frontend source code
│   ├── api/                   <-- API calls to the backend
│   │   ├── bookApi.ts         <-- Calls related to book endpoints
│   │   └── wordApi.ts         <-- Calls related to word endpoints
│   ├── components/            <-- Reusable React components
│   │   ├── BookList.tsx       <-- Displays book list
│   │   ├── WordList.tsx       <-- Displays word list
│   │   └── PDFUpload.tsx      <-- PDF upload component
│   ├── pages/                 <-- Main pages of the app
│   │   ├── Login.tsx          <-- Login page
│   │   └── Dashboard.tsx      <-- Dashboard after login
│   ├── styles/                <-- Tailwind CSS customization or extra styles
│   │   └── globals.css        <-- Tailwind and custom CSS
│   ├── App.tsx                <-- Main React app entry
│   └── index.tsx              <-- React entry point
├── package.json               <-- Frontend dependencies and scripts
├── tsconfig.json              <-- TypeScript configuration for frontend
└── .env                       <-- Frontend environment variables (if needed)


root/
├── package.json               <-- Scripts to run Frontend and Backend concurrently
├── README.md                  <-- Documentation for the project
└── .gitignore                 <-- Ignore files for Git

```
