import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Página não encontrada
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Voltar ao Início
      </Button>
    </Box>
  );
};

export default NotFound;
