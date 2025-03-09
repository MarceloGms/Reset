import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Navbar from "../components/navbar"; // Ajuste o caminho de acordo com teu projeto
import AddEditLocationModal from "../components/AddEditLocation";

// Definição da interface para localizações
export interface Location {
  id: string;
  name: string;
  type: "Repair Type" | "Picking" | "Bancada";
}

// Localizações iniciais (exemplo estático)
const initialLocations: Location[] = [
  { id: "100", name: "Zona de Recolha (Depto. Major)", type: "Repair Type" },
  { id: "200", name: "Picking", type: "Picking" },
  { id: "1100", name: "WSB100", type: "Bancada" },
];

const ManageLocations: React.FC = () => {
  // Estado principal com as localizações
  const [locations, setLocations] = useState<Location[]>(initialLocations);

  // Estados para pesquisa e filtro
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  // Estados para controlo do modal
  const [openModal, setOpenModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  // Filtra os dados conforme o termo de pesquisa e o filtro de tipo
  const filteredData = useMemo(() => {
    return locations.filter((loc) =>
      (searchTerm === "" ||
        loc.id.includes(searchTerm) ||
        loc.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterType === "" || loc.type === filterType)
    );
  }, [searchTerm, filterType, locations]);

  // Função para abrir o modal em modo "Adicionar"
  const handleOpenAdd = () => {
    setEditingLocation(null);
    setOpenModal(true);
  };

  // Função para abrir o modal em modo "Editar"
  const handleOpenEdit = (location: Location) => {
    setEditingLocation(location);
    setOpenModal(true);
  };

  // Função para remover uma localização
  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta localização?")) {
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    }
  };

  // Função de callback para salvar (adição ou edição) de uma localização
  const saveLocation = (location: Location) => {
    setLocations((prev) => {
      // Se existe uma localização em edição
      if (editingLocation) {
        return prev.map((loc) => (loc.id === location.id ? location : loc));
      } else {
        // Adição de nova localização
        return [...prev, location];
      }
    });
    setOpenModal(false);
  };

  // Definição das colunas para a DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Nome", flex: 2 },
    { field: "type", headerName: "Tipo", flex: 1 },
    {
      field: "action",
      headerName: "Ações",
      flex: 1.5,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleOpenEdit(params.row as Location)}
            sx={{ mr: 1 }}
          >
            ✏️ Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            🗑️ Remover
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <Box sx={{ p: 5 }}>
        <h1 className="text-3xl font-bold mb-5">Gestão de Localizações</h1>

        {/* Botão para adicionar localização */}
        <Button variant="contained" onClick={handleOpenAdd} sx={{ mb: 3, textTransform: "none" }}>
          ➕ Adicionar Localização
        </Button>

        {/* Campos de pesquisa e filtro */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Pesquisar Localização"
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Tipo</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as string)}
              label="Filtrar por Tipo"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Repair Type">Repair Type</MenuItem>
              <MenuItem value="Picking">Picking</MenuItem>
              <MenuItem value="Bancada">Bancada</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tabela de localizações */}
        <Paper sx={{ width: "100%", mt: 2 }}>
          <DataGrid
            rows={filteredData}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20]}
            getRowId={(row) => row.id} // Usa o campo "id" como identificador único
          />
        </Paper>

        {/* Modal de Adicionar/Editar Localização */}
        <AddEditLocationModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          location={editingLocation}
          saveLocation={saveLocation}
        />
      </Box>
    </div>
  );
};

export default ManageLocations;
