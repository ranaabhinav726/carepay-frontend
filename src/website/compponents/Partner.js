import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

const Partner = ({ title, img }) => {
  return (
    <Box sx={{ minWidth: 200, mx: "auto" }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          bgcolor: "#F1F4FA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: "1.5rem",
          mx: "auto",
        }}
      >
        <img src={img} alt="" />
      </Box>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "#514C9F",
          maxWidth: 180,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Partner;
