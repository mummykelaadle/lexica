import { Button, Navbar, NavbarBrand } from "@heroui/react";
import { Upload } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { useClerk } from "@clerk/clerk-react";
import { ModeToggle } from "../components/mode-toggle"; // Import ModeToggle

function Header() {
  const { signOut } = useClerk();

  return (
    <div className="flex flex-col bg-background transition-colors duration-300">
      {/* Navbar */}
      <Navbar 
        className="bg-background text-foreground shadow-md px-6 py-4 border-b border-border transition-colors duration-300"
      >
        <NavbarBrand>
          <span className="text-lg font-bold flex items-center">
            <Upload className="mr-2" /> Lexica
          </span>
        </NavbarBrand>
        
        {/* Theme Toggle Button */}
        <ModeToggle />
        
        {/* User Profile Button */}
        <ProfileButton />

        {/* Manual Logout Button */}
        <Button 
          onClick={() => signOut().then(() => window.location.href = "/")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 rounded-md"
        >
          Logout
        </Button>
      </Navbar>
    </div>
  );
}

export default Header;
