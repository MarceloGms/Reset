import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { Order } from "../routes/DashboardLogistica";
import CustomSnackbar from "./CustomSnackBar";

interface UpdateOrderModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  newStatus: string;
  setNewStatus: (value: string) => void;
  newLocation: string;
  setNewLocation: (value: string) => void;
  onUpdate: () => void;
  locationMapping: { [key: string]: string };
}

const UpdateOrderModal: React.FC<UpdateOrderModalProps> = ({
  open,
  onClose,
  order,
  newStatus,
  setNewStatus,
  newLocation,
  setNewLocation,
  onUpdate,
}) => {
  // Estado para controlar o CustomSnackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  if (!order) return null;

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleUpdate = () => {
    onUpdate();
    setSnackbar({
      open: true,
      message: `Pedido ${order.orderNumber} atualizado com sucesso!`,
      severity: "success",
    });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Atualizar Pedido</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Estado</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as string)}
            >
              <MenuItem value="Em Picking">Em Picking</MenuItem>
              <MenuItem value="Stock Out">Stock Out</MenuItem>
              <MenuItem value="Pronto para Recolha">
                Pronto para Recolha
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Localização</InputLabel>
            <Select
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value as string)}
            >
              <MenuItem value="Picking">Picking</MenuItem>
              <MenuItem value="Stock Out">Stock Out</MenuItem>
              <MenuItem value="Zona de Recolha (Depto. Major)">
                Zona de Recolha (Depto. Major)
              </MenuItem>
              <MenuItem value="Zona de Recolha (Depto. Middle)">
                Zona de Recolha (Depto. Middle)
              </MenuItem>
              <MenuItem value="Zona de Recolha (Depto. Minor)">
                Zona de Recolha (Depto. Minor)
              </MenuItem>
              <MenuItem value="Zona de Recolha (Depto. Surgical)">
                Zona de Recolha (Depto. Surgical)
              </MenuItem>
              <MenuItem value="Zona de Recolha (Depto. Electronics)">
                Zona de Recolha (Depto. Electronics)
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </>
  );
};

export default UpdateOrderModal;
