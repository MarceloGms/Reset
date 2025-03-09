import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    alert("Logout efetuado!"); // Aqui podes substituir pela tua lógica de logout
    navigate("/login");
  };

  return (
    <nav className="w-full bg-blue-900 text-white p-4 flex items-center justify-between shadow-lg fixed top-0 left-0 z-50">
      {/* Título da empresa que redireciona para o Dashboard */}
      <h2 
        className="text-xl font-bold cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate("/dashboard")}
      >
        XPTO
      </h2>

      {/* Seção do perfil */}
      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="flex items-center space-x-2 bg-white text-blue-900 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          <span className="text-lg">👤</span>
          <span className="font-medium">Perfil</span>
          <span className={`transition-transform ${isProfileOpen ? "rotate-180" : "rotate-0"}`}>
            🔽
          </span>
        </button>

        {/* Menu suspenso do perfil */}
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden">
            <button 
              onClick={() => navigate("/definições")} 
              className="block w-full px-4 py-3 hover:bg-gray-100 text-left"
            >
              ⚙️ Definições
            </button>
            <button 
              onClick={handleLogout} 
              className="block w-full px-4 py-3 hover:bg-gray-100 text-left"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
