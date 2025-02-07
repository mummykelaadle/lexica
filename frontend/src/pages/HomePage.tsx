import { Button } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ModeToggle } from "../components/mode-toggle";
import PharaohScroll from "../assets/img2.jpg";
import Mummy from "../assets/img3.jpg";
import WeekendOfCodeLogo from "../assets/logo.png"; // Ensure correct placement

export default function Lexica() {
  const { isLoaded, user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) navigate("/dashboard");
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <Navbar className="bg-background shadow-md px-6 py-4 border-b border-border">
        <NavbarBrand>
          <span className="text-lg font-bold flex items-center egyptian-text">
            <Upload className="mr-2" /> Lexica
          </span>
        </NavbarBrand>
        <NavbarContent className="ml-auto">
          <NavbarItem>
            {isLoaded && !user ? (
              <>
                <ModeToggle />
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => signOut(() => navigate("/"))}>
                Logout
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Hero Section */}
      <div className="bg-[#1e130c] text-gold min-h-screen">
      <header className="relative flex items-center py-16 egyptian-bg text-white">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Weekend of Code Logo (Top-Right) */}
        <img
          src={WeekendOfCodeLogo}
          alt="Weekend of Code"
          className="absolute top-4 right-6 w-16 h-16 object-contain"
        />

        {/* Text Content */}
        <div className="text-center w-full md:w-1/2 z-10">
          <h6 className="text-sm uppercase tracking-widest text-[#f4c542] egyptian-text">Sacred Knowledge</h6>
          <h1 className="text-4xl font-bold mt-2 egyptian-text">Unlock the Wisdom of the Ancients</h1>
          <p className="mt-4 text-gray-300">
            Experience the power of ancient texts with AI-driven analysis.
          </p>
          <Button className="mt-6 px-6 py-3 text-lg bg-[#f4c542] text-black hover:bg-[#d4a431] shadow-gold">
            Upload Your Sacred Scroll
          </Button>
        </div>
      </header>

      {/* Feature Sections - Alternating Layout */}
      <section className="container mx-auto py-16 px-6">
        {/* First Feature - Text Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#f4c542] egyptian-text">Decipher Ancient Scrolls</h2>
            <p className="mt-4 text-gray-300">
              Upload your sacred texts and let us analyze the meanings, translations, synonyms, and antonyms.
            </p>
          </div>
          <img src={PharaohScroll} alt="Pharaoh Scroll" className="w-full h-auto drop-shadow-lg" />
        </div>

        {/* Second Feature - Image Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <img src={Mummy} alt="Mummy Scroll" className="w-full h-auto drop-shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold text-[#f4c542] egyptian-text">Take Interactive Quizzes</h2>
            <p className="mt-4 text-gray-300">
              Test your knowledge with quizzes based on extracted text. Improve your understanding with questions.
            </p>
          </div>
        </div>

        {/* Third Feature - Text Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <h2 className="text-3xl font-bold text-[#f4c542] egyptian-text">Real-time Word Analysis</h2>
            <p className="mt-4 text-gray-300">
              Get instant word translations, synonyms, antonyms, and pronunciation help.
            </p>
          </div>
          <Card className="shadow-lg bg-[#3a2a18] egyptian-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-[#f4c542]">Upload Your Scroll</h3>
              <Input type="file" className="mt-4 egyptian-input" />
              <Button className="mt-4 w-full bg-[#f4c542] text-black hover:bg-[#d4a431]">
                Analyze Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      </div>
      {/* Footer */}
      <footer className="text-center py-6 bg-[#1e130c] text-[#f4c542] egyptian-text">
        <p>&copy; 2025 Lexica. All rights reserved.</p>
      </footer>
    </div>
  );
}
