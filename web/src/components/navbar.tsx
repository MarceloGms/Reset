import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  // 🔹 Simulação de tipo de utilizador (estático por enquanto)
  const [userType] = useState<"Operador" | "Logística">("Operador"); 

  // Estado para o menu do perfil
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // 🔹 Links do menu com base no tipo de utilizador
  const menuItems = userType === "Logistica"
    ? [
        { text: "Dashboard", path: "/dashboard" },
 q
      ]
    : [
        { text: "Dashboard", path: "/dashboardLogistica" },
        { text: "Gestão de Localizações", path: "/locations" },
       
      ];

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Nome da empresa (clica e vai para o dashboard) */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate(userType === "Operador" ? "/dashboard" : "/dashboard-logistica")}
        >
          XPTO
        </Typography>

        {/* Links do menu dinâmicos */}
        {menuItems.map((item) => (
          <Button
            key={item.text}
            color="inherit"
            onClick={() => navigate(item.path)}
            sx={{ textTransform: "none" }}
          >
            {item.text}
          </Button>
        ))}

        {/* Ícone do perfil */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>

        {/* Menu dropdown do perfil */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { navigate("/definicoes"); handleMenuClose(); }}>⚙️ Definições</MenuItem>
          <MenuItem onClick={() => { navigate("/logout"); handleMenuClose(); }}>🚪 Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
