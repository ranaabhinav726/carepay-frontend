import React from "react";

import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

const Feature = ({ title, img }) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        m: "auto",
        minWidth: "300px",
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        alignItems: "center",
        gap: 4,
      }}
    >
      <img
        src={img}
        alt=""
        style={{ heigth: match ? 40 : 100, width: match ? 40 : 100 }}
      />
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: { xs: "normal", md: "800" },
          maxWidth: "240px",
          color: "#514c9f",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Feature;
