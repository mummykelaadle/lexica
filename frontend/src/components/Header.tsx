
import { Navbar, NavbarBrand } from "@heroui/react";
import { Upload } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Header() {
  return (
    <div className="flex flex-col bg-gray-100">
    {/* Navbar */}
    <Navbar className="bg-white shadow-md px-6 py-4">
      <NavbarBrand>
        <span className="text-lg font-bold flex items-center">
          <Upload className="mr-2" /> Lexica
        </span>
      </NavbarBrand>
      <UserButton afterSignOutUrl="/"/>
    </Navbar>
    </div>
  );
}

export default Header;
