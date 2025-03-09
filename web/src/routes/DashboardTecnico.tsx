import OrdersTable from "../components/table";
import Navbar from "../components/navbar"; // Importa a nova navbar
import { useEffect, useState } from "react";

const DashboardTecnico: React.FC = () => {
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

  console.log("Token:", token, "User ID:", userId);

  return (
    <div className="">
      {/* Navbar no topo */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="p-5 mt-16">
        {" "}
        {/* Adicionamos margem no topo para evitar sobreposição */}
        <header className="mt-5 mb-5">
          <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        </header>
        {/* Cartões de status */}
        <section className="flex gap-5 mb-5 mt-2">
          <div className="bg-yellow-400 text-white p-5 rounded-lg shadow w-52 text-center">
            <h3 className="text-lg font-semibold">Pedidos Pendentes</h3>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-green-500 text-white p-5 rounded-lg shadow w-52 text-center">
            <h3 className="text-lg font-semibold">Pronto para Recolha</h3>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div className="bg-blue-500 text-white p-5 rounded-lg shadow w-52 text-center">
            <h3 className="text-lg font-semibold">Finalizados</h3>
            <p className="text-2xl font-bold">7</p>
          </div>
        </section>
        {/* Lista de pedidos */}
        <section>
          <h2 className="text-2xl font-bold mt-5 mb-5">Lista de Pedidos</h2>
          <OrdersTable />
        </section>
      </main>
    </div>
  );
};

export default DashboardTecnico;
