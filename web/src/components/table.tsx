import React, { useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import CustomSnackbar from './CustomSnackBar';

interface Order {
  id: number;
  requestId: string;
  orderNumber: string;
  parts: string;
  location: string;
  status: string;
  updatedAt: Date;
}

const OrdersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const data = useMemo<Order[]>(() => [
    {
      id: 1,
      requestId: '12345',
      orderNumber: '50179738',
      parts: 'Peça X, Peça Y',
      location: 'Picking Point (Depto. Major)',
      status: 'Pronto para Recolha',
      updatedAt: new Date('2025-03-08T10:30:00'),
    },
    {
      id: 2,
      requestId: '67890',
      orderNumber: '50180704',
      parts: 'Peça A',
      location: 'Stock Out',
      status: 'Em Processamento',
      updatedAt: new Date('2025-03-08T09:00:00'),
    },
  ], []);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((order) =>
      order.requestId.toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.parts.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

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
    { field: 'requestId', headerName: 'Request ID', flex: 1, resizable: false },
    { field: 'orderNumber', headerName: 'Pedido', flex: 1, resizable: false },
    { field: 'parts', headerName: 'Peças', flex: 1.5, resizable: false },
    { field: 'location', headerName: 'Localização Atual', flex: 1.5, resizable: false },
    { field: 'status', headerName: 'Estado', flex: 1.2, resizable: false },
    {
      field: 'action',
      headerName: 'Ação',
      flex: 1,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        const { status, orderNumber } = params.row as Order;

        if (status === 'Pronto para Recolha') {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSnackbar({
                open: true,
                message: `Pedido ${orderNumber} confirmado!`,
                severity: "success",
              })}
              sx={{ textTransform: 'none', fontSize: '0.875rem' }}
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
            sx={{ textTransform: 'none', fontSize: '0.875rem' }}
          >
            Aguardar
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
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
            sortModel: [{ field: 'updatedAt', sort: 'desc' }],
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
