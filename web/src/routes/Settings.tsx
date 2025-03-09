import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import Navbar from "../components/navbar";

const Settings: React.FC = () => {
  // Dados pessoais
  const [name, setName] = useState("Seu Nome");
  const [role, setRole] = useState("Logística"); // Opções: "Logística" ou "Técnico"
  const [bench, setBench] = useState("WSB100"); // Exemplo de bancada

  // Dados para atualização de senha
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mensagem de feedback
  const [message, setMessage] = useState("");

  // Controle do collapse para senha
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);

  // Função para atualizar dados pessoais
  const handleNameAndRoleUpdate = () => {
    // Aqui você pode fazer a chamada à API para atualizar os dados pessoais
    setMessage("Dados atualizados com sucesso!");
  };

  // Função para atualizar senha
  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      setMessage("As senhas não conferem.");
      return;
    }
    // Aqui você faria a chamada à API para atualizar a senha
    setMessage("Senha atualizada com sucesso!");
    // Limpa os campos e fecha a seção de senha
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsPasswordSectionOpen(false);
  };

  return (
    <div>
      {/* Navbar fixa no topo */}
      <Navbar />

      {/* Conteúdo principal com padding para compensar a Navbar */}
      <main className="p-5 mt-16">
        {/* <header className="mt-5 mb-5">
          <Typography variant="h3" component="h1" className="font-bold">
            Definições
          </Typography>
        </header> */}
        <header className="mt-8 mb-16">
          <h1 className="text-3xl font-bold">Definições</h1>
        </header>

        {/* Seção de Dados Pessoais */}
        <section className="mb-5" style={{ width: "66.67%", margin: "0 auto" }}>
          <Typography variant="h6" className="mb-2">
            Dados Pessoais
          </Typography>
          <Box sx={{ display: "flex", gap: 5, mb: 2 }}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Função</InputLabel>
              <Select
            label="Função"
            value={role}
            onChange={(e) => setRole(e.target.value as string)}
              >
            <MenuItem value="Logística">Logística</MenuItem>
            <MenuItem value="Técnico">Técnico</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Bancada</InputLabel>
              <Select
            label="Bancada"
            value={bench}
            onChange={(e) => setBench(e.target.value as string)}
              >
            <MenuItem value="WSB100">WSB100</MenuItem>
            <MenuItem value="WSB200">WSB200</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={handleNameAndRoleUpdate}
            sx={{ mb: 3, textTransform: "none" }}
          >
            Atualizar dados
          </Button>
        </section>

        {/* Seção de Senha */}
        <section className="mb-5" style={{ width: "66.67%", margin: "0 auto" }}>
          <Typography variant="h6" className="mb-2">
            Senha
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
            sx={{ mb: 2, textTransform: "none" }}
          >
            {isPasswordSectionOpen
              ? "Ocultar atualização de senha"
              : "Definir nova senha"}
          </Button>
          <Collapse in={isPasswordSectionOpen} orientation="horizontal">
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                width: "100%",
                overflowX: "auto",
                pb: 2,
              }}
            >
              <TextField
                label="Senha atual"
                type="password"
                variant="outlined"
                sx={{ flex: 1 }}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <TextField
                label="Nova senha"
                type="password"
                variant="outlined"
                sx={{ flex: 1 }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirmar nova senha"
                type="password"
                variant="outlined"
                sx={{ flex: 1 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={handlePasswordUpdate}
                sx={{ textTransform: "none", flexShrink: 0 }}
              >
                Atualizar senha
              </Button>
            </Box>
          </Collapse>
        </section>

        {message && (
          <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </main>
    </div>
  );
};

export default Settings;
