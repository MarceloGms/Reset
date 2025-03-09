import { useState } from "react";
import Button from "../../components/button";

interface SignUpProps {
  setIsSignUp: (value: boolean) => void;
}

export default function SignUp({ setIsSignUp }: SignUpProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      `Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Add sign up logic here
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
      <form className="space-y-4 mt-4" onSubmit={signUp}>
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
          <p>Confirm Password</p>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="confirmPassword"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <Button text="Sign Un" type="submit" />
        </div>
        <div className="text-center">
          <button
            type="button"
            className="text-cyan-900 underline cursor-pointer text-center"
            onClick={() => setIsSignUp(false)}
          >
            Already have an account? Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
