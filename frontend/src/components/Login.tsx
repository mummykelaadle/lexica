import { SignIn } from "@clerk/clerk-react";

export default function Login(){
    return (
        <div className="flex items-center justify-center h-screen">
            <SignIn signUpUrl="/register" forceRedirectUrl={'/dashboard'}/>
        </div>
    )
}