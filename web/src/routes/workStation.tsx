import { useState } from "react";
import Button from "../components/button";

export default function WorkStation() {
  const [workStation, setWorkStation] = useState("");

  const handleConfirm = () => {
    if (!workStation) {
      alert("Please enter your workstation");
      return;
    }

    console.log(workStation);
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
