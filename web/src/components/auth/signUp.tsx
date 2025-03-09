import { useState } from "react";
import Button from "../../components/button";

interface SignUpProps {
  setIsSignUp: (value: boolean) => void;
}

export default function SignUp({ setIsSignUp }: SignUpProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(
      `Email: ${username}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Add sign up logic here
    try {
      const result = await fetch("http://localhost:8800/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          tipo: "tecnico",
        }),
      });
      const data = await result.json();
      console.log(data);
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
      <form className="space-y-4 mt-4" onSubmit={signUp}>
        <div>
          <p>Username</p>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <Button text="Sign Up" type="submit" />
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
