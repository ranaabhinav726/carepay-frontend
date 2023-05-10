import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

const Work = ({ img, title, desc }) => {
  return (
    <Box sx={{ mx: "auto", textAlign: "center", maxWidth: 210 }}>
      <img src={img} alt="" />
      <Typography
        sx={{
          fontSize: "1.3rem",
          fontWeight: "bold",
          color: "#36336A",
          my: "1rem",
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: "#514C9F" }}>{desc}</Typography>
    </Box>
  );
};

export default Work;
