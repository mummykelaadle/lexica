"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFUploading } from "@/animations/PDFUploading";
const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

function DropZone() {
  const [file, setFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coverImg, setCoverImg] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const maxSize = 20971520; // Max file size (20 MB)

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]); // Store the first selected file
    setTitle(acceptedFiles[0].name); // Set the title to the file name initially
    setIsDialogOpen(true);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    multiple: false, // Allow only one file
    maxSize, // Set max size for file upload
    accept: { "application/pdf": [] }, // Only accept PDF files
  });

  // Check if file is too large
  const isFileTooLarge =
    fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
  // Check if file is not PDF
  const isFileNotPdf =
    fileRejections.length > 0 &&
    fileRejections[0].file.type !== "application/pdf";

  // Check if multiple files were selected, even though multiple: false
  const isMultipleFiles = fileRejections.length > 1;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    if (coverImg) {
      formData.append("cover", coverImg);
    }

    try {
      const res = await axios.post(
        `${backendBaseUrl}/api/v1/pdf/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
      setIsDialogOpen(false); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <section className="m-4 flex justify-center items-center before:content-none after:content-none">
      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          className={cn(
            "w-[80vw] h-60 flex flex-col justify-center items-center p-5 border-4 border-dashed rounded-lg text-center mt-8", // Added border width (4px)
            isDragActive
              ? "bg-[#035FFE] text-white animate-pulse border-blue-500" // Blue border when active
              : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400 border-slate-300", // Light border when inactive
            isDragReject && "bg-red-500 text-white border-red-600" // Red border if file is rejected
          )}
        >
          <input {...getInputProps()} />

          {/* Conditional message rendering based on drag state */}
          <p>
            {!isDragActive &&
              !isDragReject &&
              "Click here or drop a file to upload!"}
          </p>
          <p>{isDragActive && !isDragReject && "Drop to upload this file!"}</p>
          <p>
            {isDragReject &&
              isFileNotPdf &&
              "File type not accepted. Only PDF files are allowed."}
          </p>
          <p>
            {isDragReject &&
              isFileNotPdf &&
              "File type not accepted. Only PDF files are allowed."}
          </p>
          {/* Show message if multiple files are selected */}
          {isMultipleFiles && <p>You can only upload one file at a time.</p>}
        </div>

        {/* File size warning */}
        {isFileTooLarge && (
          <div className="text-red-500 mt-2">
            File is too large. Max size is 20MB.
          </div>
        )}
        <BookDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          fileName={file?.name}
          title={title}
          setTitle={setTitle}
          setCoverImg={setCoverImg}
          handleSubmit={handleSubmit}
        />
      </form>
    </section>
  );
}

interface BookDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string | undefined;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setCoverImg: React.Dispatch<React.SetStateAction<File | null>>;
  handleSubmit: (event: React.FormEvent) => void;
}

function BookDialog({
  isDialogOpen,
  setIsDialogOpen,
  fileName,
  title,
  setTitle,
  setCoverImg,
  handleSubmit,
}: BookDialogProps) {
  const [isUploading, setIsUploading] = useState(false); // State for animation

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    setTitle(fileName || "");
  }, [fileName]);

  // Modified upload function to control animation
  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true); // Start animation when Add Book is clicked

    try {
      await handleSubmit(event); // Call original upload function
    } finally {
      setIsUploading(false); // Stop animation after upload completes
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>
              Please enter the details of the book you want to add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                value={title}
                onChange={handleNameChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cover" className="text-right">
                Cover
              </Label>
              <Input
                id="cover"
                name="cover"
                type="file"
                accept="image/*"
                className="col-span-3"
                onChange={(e) =>
                  setCoverImg(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpload}>
              Add Book
            </Button>
          </DialogFooter>
          {/* Show animation when isUploading is true */}
          {isUploading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
              <PDFUploading />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DropZone;
