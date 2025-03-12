import { useEffect, useState } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

export default function WorkStation() {
  const [workStation, setWorkStation] = useState("");
  const [benches, setBenches] = useState([]);

  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    const userJson = localStorage.getItem("user");

    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user) {
          setUserId(user.id);
        } else {
          console.error("User ID not found in the user object.");
        }
      } catch (error) {
        console.error("Error parsing user JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8800/api/benches/getUserBenches${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBenches(data);
      });
  }, [token, userId]);

  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!workStation) {
      alert("Please enter your workstation");
      return;
    }

    console.log(workStation);

    navigate("/dashboard");
  };

  return (
    <div className="bg-cyan-900 flex flex-1 justify-center items-center min-h-screen p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Work Station Setup
        </h2>
        <input
          type="text"
          placeholder="Enter your workstation"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
          value={workStation}
          onChange={(e) => setWorkStation(e.target.value)}
        />
        <Button text="Confirmar" onClick={handleConfirm} />
      </div>
    </div>
  );
}
