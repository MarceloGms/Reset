import React from 'react';
import Sidebar from '../components/navbar';

import PecasTable from '../components/tabelaPecas';

const PedidoDePecas: React.FC = () => {
  // Simulação dos pedidos do técnico
//   const pedidos = useMemo(
//     () => [
//       { status: 'Pronto para Recolha' },
//       { status: 'Em Picking' },
//       { status: 'Stock Out' },
//       { status: 'Em Picking' },
//       { status: 'Stock Out' },
//     ],
//     []
//   );



return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar com links hipotéticos */}
  
      <Sidebar />
      {/* Conteúdo Principal */}
      <main className="flex-1 p-5">
        <header className="mb-5">
          <h1 className="text-3xl font-bold">Minhas Peças</h1>
        </header>

        {/* Cartões de status */}
        <section className="flex gap-5 mb-5">
  <div className="bg-yellow-400 text-white p-5 rounded-lg shadow w-52 text-center">
    <h3 className="text-lg font-semibold">Pedidos Pendentes</h3>
    <p className="text-2xl font-bold">3</p>
  </div>
  <div className="bg-green-500 text-white p-5 rounded-lg shadow w-52 text-center">
    <h3 className="text-lg font-semibold">Pronto para Recolha</h3>
    <p className="text-2xl font-bold">1</p>
  </div>

</section>


        {/* Lista de pedidos */}
        <section>
          <h2 className="text-2xl font-bold mb-3">Lista de Pedidos</h2>
          <PecasTable />
        </section>
      </main>
    </div>
  );
};
export default PedidoDePecas;
