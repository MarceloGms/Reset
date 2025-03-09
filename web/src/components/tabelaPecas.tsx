import React, { useMemo, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Peca {
  id: number;
  codigo: string;
  descricao: string;
  quantidade: number;
  status: string;
  updatedAt: Date; // formato ISO, ex: "2025-03-09T10:15:00"
}

const PecasTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados de exemplo
  const data = useMemo<Peca[]>(
    () => [
      {
        id: 1,
        codigo: 'P001',
        descricao: 'Parafuso 10mm',
        quantidade: 50,
        status: 'Disponível',
        updatedAt: new Date('2025-03-09T10:15:00'),
      },
      {
        id: 2,
        codigo: 'P002',
        descricao: 'Porca 10mm',
        quantidade: 30,
        status: 'Em Falta',
        updatedAt: new Date('2025-03-08T09:00:00'),
      },
      {
        id: 3,
        codigo: 'P003',
        descricao: 'Arruela 10mm',
        quantidade: 0,
        status: 'Em Falta',
        updatedAt: new Date('2025-03-07T14:30:00'),
      },
      {
        id: 4,
        codigo: 'P004',
        descricao: 'Bucha de Fixação',
        quantidade: 100,
        status: 'Disponível',
        updatedAt: new Date('2025-03-05T16:45:00'),
      },
    ],
    []
  );

  // Filtra pelo termo de busca
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      (item) =>
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // Definição das colunas
  const columns: GridColDef[] = [
    { field: 'codigo', headerName: 'Código', flex: 1 , resizable: false,},
    { field: 'descricao', headerName: 'Descrição', flex: 2 , resizable: false,},
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      type: 'number',
      resizable: false,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      resizable: false,
      flex: 1,
    },
    {
      field: 'updatedAt',
      headerName: 'Data Atualização',
      type: 'dateTime',
      resizable: false,
      flex: 1,
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Pesquisar Peças"
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
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
      />
    </Box>
  );
};

export default PecasTable;
