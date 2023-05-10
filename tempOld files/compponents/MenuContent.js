import React from "react";

//material ui
import { Box, Button, Typography } from "@mui/material";

//assets
import { CloseOutlined } from "@mui/icons-material";

//third party
import { NavLink } from "react-router-dom";

const MenuContent = ({ handleClose, handleClick }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <CloseOutlined
        onClick={handleClose}
        sx={{ fontSize: "2.5rem", float: "right", m: 1 }}
      />
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          bgcolor: "#EA6B0C",
          "&:hover": {
            bgcolor: "#EA6B0C",
          },
          mt: 10,
          ml: 6,
        }}
        size="large"
      >
        Login
      </Button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
          my: 3,
        }}
      >
        <Typography sx={{ fontSize: "2rem", color: "#514C9F" }}>
          <NavLink to={"/products"}>Products</NavLink>
        </Typography>
        <Typography sx={{ fontSize: "2rem", color: "#514C9F" }}>
          <NavLink to={"/about"}>About Us</NavLink>
        </Typography>
        <Typography sx={{ fontSize: "2rem", color: "#514C9F" }}>
          <NavLink to={"/about"}>Contact Us</NavLink>
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{
          mr: 1,
          color: "#EA6B0C",
          bgcolor: "#fff",
          border: "1px solid #EA6B0C",
          "&:hover": {
            bgcolor: "#fff",
          },
          ml: 1,
        }}
        size="large"
      >
        Get App
      </Button>
    </Box>
  );
};

export default MenuContent;
