# Lexica

-------------------------------------------------

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
