import { UserButton } from "@clerk/clerk-react";

export default function Dashboard(){
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white">
                <UserButton afterSignOutUrl="/"/>
            </div>
           <h1 className="white">Dashboard</h1>
        </div>
    )
}