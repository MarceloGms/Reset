import React from "react";
import OrdersTable from "../components/table";
import Navbar from "../components/navbar"; // Importa a nova navbar

const DashboardTecnico: React.FC = () => {
  return (
    <div className="">
      {/* Navbar no topo */}
      <Navbar />

      {/* Conteúdo Principal */}
      <main className="p-5 mt-16"> {/* Adicionamos margem no topo para evitar sobreposição */}
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
