import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { Location } from "../routes/ManageLocations"; // Ajuste o caminho conforme teu projeto

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  location: Location | null;
  saveLocation: (location: Location) => void;
}

const AddEditLocationModal: React.FC<ModalProps> = ({
  open,
  handleClose,
  location,
  saveLocation,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState<Location["type"]>("Repair Type");

  // Quando a prop "location" muda, atualizamos o estado local
  useEffect(() => {
    if (location) {
      setId(location.id);
      setName(location.name);
      setType(location.type);
    } else {
      setId("");
      setName("");
      setType("Repair Type");
    }
  }, [location]);

  const handleSubmit = () => {
    if (!id || !name || !type) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    // Chama a função para adicionar/editar a localização
    saveLocation({ id, name, type });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{location ? "Editar Localização" : "Adicionar Localização"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="ID"
          fullWidth
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
          disabled={!!location} // Desativa se já for edição
        />
        <TextField
          margin="dense"
          label="Nome"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Tipo</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as Location["type"])}
            label="Tipo"
          >
            <MenuItem value="Repair Type">Repair Type</MenuItem>
            <MenuItem value="Picking">Picking</MenuItem>
            <MenuItem value="Bancada">Bancada</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {location ? "Atualizar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditLocationModal;
