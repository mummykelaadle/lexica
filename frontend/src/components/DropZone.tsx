"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

function DropZone() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const maxSize = 20971520; // Max file size (20 MB)

  const onDrop = async (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]); // Store the first selected file
    setIsProcessing(true);
    const res = await axios.post(`${backendBaseUrl}/api/v1/pdf/upload`, acceptedFiles[0]);
    setIsProcessing(false);
    alert(res.data.message);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    onDrop,
    multiple: false, // Allow only one file
    maxSize, // Set max size for file upload
    accept: { 'application/pdf': [] }, // Only accept PDF files
  });

  // Check if file is too large
  const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
  // Check if file is not PDF
  const isFileNotPdf = fileRejections.length > 0 && fileRejections[0].file.type !== "application/pdf";

  // Check if multiple files were selected, even though multiple: false
  const isMultipleFiles = fileRejections.length > 1;

  return (
    <section className="m-4 flex justify-center items-center before:content-none after:content-none">

      <div
        {...getRootProps()}
        className={cn(
          "w-1/2 h-60 flex flex-col justify-center items-center p-5 border-4 border-dashed rounded-lg text-center mt-8",  // Added border width (4px)
          isDragActive
            ? "bg-[#035FFE] text-white animate-pulse border-blue-500"  // Blue border when active
            : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400 border-slate-300",  // Light border when inactive
          isDragReject && "bg-red-500 text-white border-red-600" // Red border if file is rejected
        )}
      >
        <input {...getInputProps()} />

        {/* Conditional message rendering based on drag state */}
        <p>
          {!isDragActive && !isDragReject && "Click here or drop a file to upload!"}
        </p>
        <p>
          {isDragActive && !isDragReject && "Drop to upload this file!"}
        </p>
        <p>
          {isDragReject && isFileNotPdf && "File type not accepted. Only PDF files are allowed."}
        </p>
        <p>
          {isDragReject && isFileNotPdf && "File type not accepted. Only PDF files are allowed."}
        </p>
        {/* Show message if multiple files are selected */}
        {isMultipleFiles && (
          <p >You can only upload one file at a time.</p>
        )}
      </div>

      {/* File size warning */}
      {isFileTooLarge && (
        <div className="text-red-500 mt-2">File is too large. Max size is 20MB.</div>
      )}
      {isProcessing && (
        <div className="text-red-500 mt-2">Processing.... Please wait!</div>
      )}

      {/* File name display */}
      {file && <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>}
    </section>
  );
}

export default DropZone;
