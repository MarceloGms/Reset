import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Order } from "../routes/DashboardLogistica";
import CustomSnackbar from './CustomSnackBar';

interface OrdersTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onViewHistory: (order: Order) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onEdit, onViewHistory }) => {
  // Estado para controlar o CustomSnackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const columns: GridColDef[] = [
    { field: "requestId", headerName: "Request ID", flex: 1, resizable: false },
    { field: "orderNumber", headerName: "Pedido", flex: 1, resizable: false },
    { field: "parts", headerName: "Peças", flex: 1.5, resizable: false },
    { field: "location", headerName: "Localização Atual", flex: 1.5, resizable: false },
    {
      field: "status",
      headerName: "Estado",
      flex: 1.2,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        const statusColor =
          params.value === "Em Picking"
            ? "bg-yellow-400"
            : params.value === "Stock Out"
            ? "bg-red-500"
            : "bg-green-500";
        return (
          <span className={`text-white px-3 py-1 rounded-lg ${statusColor}`}>
            {params.value}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Ação",
      flex: 1.5,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div style={{ display: "flex", gap: 8 }}>
          {params.row.status !== "Recolhido" && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onEdit(params.row as Order)}
              style={{ textTransform: "none" }}
            >
              ✏️ Atualizar
            </Button>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onViewHistory(params.row as Order)}
            style={{ textTransform: "none" }}
          >
            📜 Histórico
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={orders}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default OrdersTable;