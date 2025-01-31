import { Button } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default function Lexica() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar className="bg-white shadow-md px-6 py-4">
        <NavbarBrand>
          <span className="text-lg font-bold flex items-center">
            <Upload className="mr-2" /> Lexica
          </span>
        </NavbarBrand>
        <NavbarContent className="ml-auto">
          <NavbarItem>
            <Button variant="outline">Login / Signup</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      {/* Hero Section */}
      <header className="flex items-center py-16 bg-[#441752] text-white">
        <div className="text-center w-full md:w-1/2">
          <h6 className="text-sm uppercase">Reader: Daily Lessons</h6>
          <h1 className="text-4xl font-bold mt-2">Read Smarter with Pre-Learning</h1>
          <p className="mt-4">Uninterrupting your reading experience while enjoying your book.</p>
          <Button className="mt-6 px-6 py-3 text-lg">Upload Your PDF</Button>
        </div>
        <div className="w-full md:w-1/2">
          <img src="/src/assets/header-img.png" alt="Hero Image" className="w-full h-auto" />
        </div>
      </header>

      
      {/* Features Section */}
      <section className="container mx-auto py-16 px-6 flex-grow">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl font-bold">Enhancing Reading Fluency!</h1>
            <p className="mt-4 text-gray-700">
              This project enhances reading fluency by extracting text from user-uploaded PDFs and analyzing vocabulary. 
              It identifies complex words, organizes them by page, and provides definitions, example sentences, and quizzes. 
              Users can preview challenging words before reading, ensuring a seamless experience.
            </p>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold">Upload your PDF</h2>
              <Input type="file" className="mt-4" />
              <Button className="mt-4 w-full">Analyze</Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="text-center py-6 bg-[#441752] text-white">
        <p>&copy; 2025 Lexica. All rights reserved.</p>
      </footer>
    </div>
  );
}
