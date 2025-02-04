
import { Button, Navbar, NavbarBrand } from "@heroui/react";
import { Upload } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { useClerk } from "@clerk/clerk-react";
import { ModeToggle } from "../components/mode-toggle"; // Import ModeToggle


function Header() {
  const { signOut } = useClerk();

  return (
    <div className="flex flex-col bg-gray-100">
    {/* Navbar */}
    <Navbar className="bg-white shadow-md px-6 py-4">
      <NavbarBrand>
        <span className="text-lg font-bold flex items-center">
          <Upload className="mr-2" /> Lexica
        </span>
      </NavbarBrand>
      <ModeToggle /> {/* Theme Toggle Button */}
      {/* <UserButton afterSignOutUrl="/"/> */}
     <ProfileButton />
     
      {/* Manual Logout Button */}
      <Button 
        onClick={() => signOut().then(() => window.location.href = "/")}
      
      >
        Logout
      </Button>
    </Navbar>
    </div>
  );
}

export default Header;
