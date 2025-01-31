import { SignUp } from "@clerk/clerk-react";

export default function Register(){
    return (
        <div className="flex items-center justify-center h-screen">
            <SignUp  signInUrl="/login" forceRedirectUrl={'/dashboard'}/>
        </div>
    )
}