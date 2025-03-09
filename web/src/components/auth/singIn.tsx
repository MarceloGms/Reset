import { useState } from "react";
import Button from "../../components/button";

interface SignInProps {
  setIsSignUp: (value: boolean) => void;
}

export default function SignIn({ setIsSignUp }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    // Add sign in logic here

    // redirect to workStation page
    window.location.href = "/workStation";
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-semibold text-center">Sign In</h1>
      <form className="space-y-4 mt-4" onSubmit={signIn}>
        <div>
          <p>Email</p>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button text="Sign In" type="submit" />
        </div>
        <div
          className="
                flex
                justify-between
                items-center
              "
        >
          <button
            type="button"
            className="text-cyan-900 cursor-pointer underline text-center"
            onClick={() => setIsSignUp(true)}
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
