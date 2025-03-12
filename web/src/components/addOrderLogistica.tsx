import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import CustomSnackbar from "./CustomSnackBar";
import type { Order } from "../routes/DashboardLogistica";

// Props esperadas pelo componente
interface AddOrderModalProps {
  open: boolean;
  handleClose: () => void;
  addOrder: (order: Order) => void;
}

const repairTypes = ["Major", "Middle", "Minor", "Surgical", "Electronics"];

const AddOrderModal: React.FC<AddOrderModalProps> = ({
  open,
  handleClose,
  addOrder,
}) => {
  const [requestId, setRequestId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [parts, setParts] = useState("");
  const [repairType, setRepairType] = useState("");

  // Estado para controlar o CustomSnackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = () => {
    if (!requestId || !orderNumber || !parts || !repairType) {
      setSnackbar({
        open: true,
        message: "Todos os campos são obrigatórios.",
        severity: "error",
      });
      return;
    }

    const newOrder: Order = {
      id: Date.now(), // Apenas para exemplo; idealmente viria do backend
      requestId,
      orderNumber,
      parts,
      location: "Picking",
      status: "Em Picking",
      repairType,
      updatedAt: new Date(),
    };

    addOrder(newOrder);
    handleClose();

    // Limpa o formulário
    setRequestId("");
    setOrderNumber("");
    setParts("");
    setRepairType("");

    setSnackbar({
      open: true,
      message: "Pedido adicionado com sucesso!",
      severity: "success",
    });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Adicionar Novo Pedido</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Request ID"
            fullWidth
            variant="outlined"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Order Number"
            fullWidth
            variant="outlined"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Peças (separadas por vírgula)"
            fullWidth
            variant="outlined"
            value={parts}
            onChange={(e) => setParts(e.target.value)}
          />
          <FormControl margin="dense" fullWidth>
            <InputLabel>Tipo de Reparação</InputLabel>
            <Select
              value={repairType}
              label="Tipo de Reparação"
              onChange={(e) => setRepairType(e.target.value)}
            >
              {repairTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            Adicionar Pedido
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

export default AddOrderModal;
