import React, { useEffect, useState } from "react";
import OrdersTable from "../components/table";
import Navbar from "../components/navbar";

// Define o tipo correto
type Pedido = {
  id: number;
  requestId: string;
  orderNumber: string;
  finalizado: boolean;
};

const DashboardTecnico: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [orders, setOrders] = useState<Pedido[]>([]);

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
    const fetchData = async () => {
      const response = await fetch("http://localhost:8800/api/auth/getOpenOrders");
      const data: Pedido[] = await response.json();

      console.log("Dados recebidos da API:", data);
      setOrders(data);
    };

    fetchData();
  }, []);  
  return (
    <div>
      <Navbar />
      <main className="p-5 mt-16">
        <header className="mt-5 mb-5">
          <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        </header>

        <section className="flex gap-5 mb-5 mt-2">
          <div className="bg-yellow-400 text-white p-5 rounded-lg shadow w-52 text-center">
            <h3 className="text-lg font-semibold">Pedidos Pendentes</h3>
            <p className="text-2xl font-bold">{ orders.filter((order) => !order.finalizado).length }</p>
          </div>
          <div className="bg-green-500 text-white p-5 rounded-lg shadow w-52 text-center">
            <h3 className="text-lg font-semibold">Pronto para Recolha</h3>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div className="bg-blue-500 text-white p-5 rounded-lg shadow w-52 text-center">
            <h3 className="text-lg font-semibold">Finalizados</h3>
            <p className="text-2xl font-bold">5</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-5 mb-5">Lista de Pedidos</h2>
          <OrdersTable />
        </section>
      </main>
    </div>
  );
};

export default DashboardTecnico;
