import { useState } from "react";
import Button from "../../components/button";

interface SignInProps {
  setIsSignUp: (value: boolean) => void;
}

export default function SignIn({ setIsSignUp }: SignInProps) {
  const [username, setUsernames] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    // Add sign in logic here
    try {
      const result = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        credentials: "include",
      });

      const data = await result.json();

      console.log(data);

      // Store token and username in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);

      // Redirect to workStation or desired page
      //window.location.href = "/workStation";
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 className="text-2xl font-semibold text-center">Sign In</h1>
      <form className="space-y-4 mt-4" onSubmit={signIn}>
        <div>
          <p>Email</p>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsernames(e.target.value)}
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
