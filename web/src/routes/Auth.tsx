import { useState } from "react";
import SignUp from "../components/auth/signUp";
import SignIn from "../components/auth/singIn";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="bg-cyan-900 flex flex-1 justify-center items-center min-h-screen">
      {isSignUp ? (
        <SignUp setIsSignUp={setIsSignUp} />
      ) : (
        <SignIn setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
}
