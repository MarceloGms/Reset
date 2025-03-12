import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import type { Order, HistoryRecord } from "../routes/DashboardLogistica";

interface OrderHistoryModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
  historyRecords: HistoryRecord[];
}

const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  open,
  onClose,
  order,
  historyRecords,
}) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Histórico do Pedido {order.orderNumber}</DialogTitle>
      <DialogContent>
        {historyRecords.length === 0 ? (
          <p>Nenhum histórico disponível para este pedido.</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status Anterior</TableCell>
                <TableCell>Localização Anterior</TableCell>
                <TableCell>Novo Status</TableCell>
                <TableCell>Nova Localização</TableCell>
                <TableCell>Atualizado Por</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.changedAt.toLocaleString()}</TableCell>
                  <TableCell>{record.previousStatus}</TableCell>
                  <TableCell>{record.previousLocation}</TableCell>
                  <TableCell>{record.newStatus}</TableCell>
                  <TableCell>{record.newLocation}</TableCell>
                  <TableCell>{record.updatedBy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderHistoryModal;
