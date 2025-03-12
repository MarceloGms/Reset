import { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Button, TextField } from "@mui/material";
import CustomSnackbar from "./CustomSnackBar";

interface Location {
  id: number;
  name: string;
}

interface Order {
  id: number;
  requestId: string;
  orderNumber: string;
  tipoReparoId: number;
  localizacaoAtualId: number;
  tecnicoId: number;
  finalizado: boolean;
  status: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getOrders = await fetch(
          "http://localhost:8800/api/auth/getOpenOrders"
        );
        const ordersData: Order[] = await getOrders.json();

        // const getLocations = await fetch("http://localhost:8800/api/auth/getLocations");
        // const locationsData: Location[] = await getLocations.json();

        console.log("Pedidos Recebidos:", ordersData);
        // console.log("Localizações Recebidas:", locationsData);

        setOrders(ordersData);
        // setLocations(locationsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  // Função para encontrar o nome da localização pelo ID
  const getLocationName = (locationId: number): string => {
    const location = locations.find((loc) => loc.id === locationId);
    return location ? location.name : "Desconhecido";
  };

  // Filtragem baseada no termo de pesquisa
  const filteredData = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(
      (order) =>
        order.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getLocationName(order.localizacaoAtualId)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, orders]);

  // Estado para controlar o CustomSnackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const columns: GridColDef[] = [
    { field: "requestId", headerName: "Request ID", flex: 1, resizable: false },
    { field: "orderNumber", headerName: "Pedido", flex: 1, resizable: false },
    { field: "parts", headerName: "Peças", flex: 1.5, resizable: false },
    {
      field: "location",
      headerName: "Localização Atual",
      flex: 1.5,
      resizable: false,
    },
    { field: "status", headerName: "Estado", flex: 1.2, resizable: false },
    {
      field: "action",
      headerName: "Ação",
      flex: 1,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { status, orderNumber } = params.row as Order;

        if (status === "Pronto para Recolha") {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setSnackbar({
                  open: true,
                  message: `Pedido ${orderNumber} confirmado!`,
                  severity: "success",
                })
              }
              sx={{ textTransform: "none", fontSize: "0.875rem" }}
            >
              Confirmar Recolha
            </Button>
          );
        }

        return (
          <Button
            variant="contained"
            color="secondary"
            disabled
            sx={{ textTransform: "none", fontSize: "0.875rem" }}
          >
            Aguardar
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Pesquisar por"
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 1 }}
      />

      <DataGrid
        rows={filteredData}
        columns={columns}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "updatedAt", sort: "desc" }],
          },
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        checkboxSelection={false}
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
