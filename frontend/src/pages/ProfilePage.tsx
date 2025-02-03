import { UserProfile} from "@clerk/clerk-react";

export default function ProfilePage() {


  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      {/* User Profile Section */}
      <UserProfile />

    </div>
  );
}
