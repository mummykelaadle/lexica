
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
  // const { user } = useClerk();
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Custom Button to Open UserProfile */}
      <Button  onClick={() => navigate("/profile")} className="p-2">
        {/* {user?.firstName || "Profile"} */}
        Profile
      </Button>

     
    </div>
  );
}
