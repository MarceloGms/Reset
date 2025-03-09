import React, { useState, useMemo } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Box, Button } from "@mui/material";
import Navbar from "../components/navbar";
import OrdersTable from "../components/OrdersTable";
import UpdateOrderModal from "../components/updateOrderModal";
import OrderHistoryModal from "../components/orderHistoryModal";
import AddOrderModal from "../components/addOrderLogistica";
import CustomSnackbar from '../components/CustomSnackBar';

// Define as interfaces para Order e HistoryRecord
export interface Order {
  id: number;
  requestId: string;
  orderNumber: string;
  parts: string;
  location: string;
  status: string;
  repairType: string;
  updatedAt: Date;
}

export interface HistoryRecord {
  id: number;
  orderId: number;
  changedAt: Date;
  previousStatus: string;
  previousLocation: string;
  newStatus: string;
  newLocation: string;
  updatedBy: string;
}

// Estados possíveis
const statuses = ["Em Picking", "Stock Out", "Pronto para Recolha", "Recolhido"];

// Mapeamento de localizações por tipo de reparação
const locationMapping: { [key: string]: string } = {
  "Major": "Zona de Recolha (Depto. Major)",
  "Middle": "Zona de Recolha (Depto. Middle)",
  "Minor": "Zona de Recolha (Depto. Minor)",
  "Surgical": "Zona de Recolha (Depto. Surgical)",
  "Electronics": "Zona de Recolha (Depto. Electronics)",
};

// Dados estáticos de exemplo
const staticOrders: Order[] = [
  {
    id: 1,
    requestId: "12345",
    orderNumber: "50179738",
    parts: "Peça X, Peça Y",
    location: "Picking",
    status: "Recolhido",
    repairType: "Major",
    updatedAt: new Date("2025-03-08T10:30:00"),
  },
  {
    id: 2,
    requestId: "67890",
    orderNumber: "50180704",
    parts: "Peça A",
    location: "Stock Out",
    status: "Stock Out",
    repairType: "Middle",
    updatedAt: new Date("2025-03-08T09:00:00"),
  },
];

const DashboardLogistica: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [orders, setOrders] = useState<Order[]>(staticOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newLocation, setNewLocation] = useState("");

  // Estado para o histórico dos pedidos
  const [orderHistory, setOrderHistory] = useState<HistoryRecord[]>([]);
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [selectedHistoryOrder, setSelectedHistoryOrder] = useState<Order | null>(null);

  // Estado para controlar o AddOrderModal
  const [openAddOrderModal, setOpenAddOrderModal] = useState(false);

  // Estado para controlar o CustomSnackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Filtra os pedidos com base na pesquisa e no filtro de status
  const filteredData = useMemo(() => {
    return orders.filter((order) =>
      (searchTerm === "" ||
        order.requestId.includes(searchTerm) ||
        order.orderNumber.includes(searchTerm) ||
        order.parts.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "" || order.status === filterStatus)
    );
  }, [searchTerm, filterStatus, orders]);

  // Abre o modal de atualização e define os valores iniciais
  const handleEdit = (order: Order) => {
    if (order.status === "Recolhido") {
      setSnackbar({
        open: true,
        message: "Pedidos no estado 'Recolhido' não podem ser editados.",
        severity: "error",
      });
      return;
    }
    setSelectedOrder(order);
    setNewStatus(order.status);
    setNewLocation(order.location);
    setOpenDialog(true);
  };

  // Fecha o modal de atualização
  const handleClose = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  // Atualiza o pedido e grava um registro de histórico
  const handleUpdate = () => {
    if (!selectedOrder) return;

    // Validação: para "Pronto para Recolha", a localização deve ser a correta
    if (newStatus === "Pronto para Recolha" && newLocation !== locationMapping[selectedOrder.repairType]) {
      alert(`Erro: A localização deve ser "${locationMapping[selectedOrder.repairType]}" para pedidos do tipo ${selectedOrder.repairType}.`);
      return;
    }

    const updatedOrder: Order = { ...selectedOrder, status: newStatus, location: newLocation };
    setOrders(prevOrders => prevOrders.map(order => order.id === updatedOrder.id ? updatedOrder : order));

    // Registra a alteração no histórico
    const newRecord: HistoryRecord = {
      id: orderHistory.length + 1,
      orderId: updatedOrder.id,
      changedAt: new Date(),
      previousStatus: selectedOrder.status,
      previousLocation: selectedOrder.location,
      newStatus: newStatus,
      newLocation: newLocation,
      updatedBy: "Operador Logística",
    };
    setOrderHistory(prev => [...prev, newRecord]);

    setOpenDialog(false);
  };

  // Abre o modal de histórico para um pedido
  const handleViewHistory = (order: Order) => {
    setSelectedHistoryOrder(order);
    setOpenHistoryDialog(true);
  };

  // Função para adicionar um novo pedido (chamada pelo AddOrderModal)
  const addNewOrder = (order: Order) => {
    setOrders(prevOrders => [...prevOrders, order]);
  };

  return (
    <div>
      <Navbar />
      <main className="p-5 mt-16">
        <header className="mt-5 mb-5">
          <h1 className="text-3xl font-bold">Gestão de Pedidos - Logística</h1>
        </header>

        {/* Botão para abrir o AddOrderModal */}
        <Button variant="contained" onClick={() => setOpenAddOrderModal(true)} sx={{ mb: 5, textTransform: "none" }}>
          ➕ Adicionar Pedido
        </Button>

        {/* Pesquisa e filtro */}
        <section className="flex gap-5 mb-5">
          <TextField
            label="Pesquisar Pedido, Peça ou Localização"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as string)}
              label="Filtrar por Estado"
            >
              <MenuItem value="">Todos</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </section>

        {/* Tabela de pedidos */}
        <Box sx={{ width: "100%" }}>
          <OrdersTable orders={filteredData} onEdit={handleEdit} onViewHistory={handleViewHistory} />
        </Box>

        {/* Modal de atualização */}
        <UpdateOrderModal
          open={openDialog}
          onClose={handleClose}
          order={selectedOrder}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          onUpdate={handleUpdate}
          locationMapping={locationMapping}
        />

        {/* Modal de histórico */}
        <OrderHistoryModal
          open={openHistoryDialog}
          onClose={() => setOpenHistoryDialog(false)}
          order={selectedHistoryOrder}
          historyRecords={orderHistory.filter(record => record.orderId === selectedHistoryOrder?.id)}
        />

        {/* Modal para adicionar novo pedido */}
        <AddOrderModal
          open={openAddOrderModal}
          handleClose={() => setOpenAddOrderModal(false)}
          addOrder={addNewOrder}
        />
      </main>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default DashboardLogistica;