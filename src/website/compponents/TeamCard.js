import React from "react";

//material ui
import { Box, Chip, Typography } from "@mui/material";

//assets
import GitHub from "../assets/images/github.svg";
import LinkedIn from "../assets/images/LinkedIn.svg";
import Twitter from "../assets/images/Twitter.svg";

const TeamCard = ({ name, img, designation }) => {
  return (
    <Box
      sx={{
        "&:hover": {
          boxShadow: "4px 4px 60px 0px #00000040",
        },
        transition: "0.8s ease",
        px: "2rem",
        py: "1rem",
        borderRadius: 3,
      }}
    >
      <img src={img} alt="" />
      <Typography
        sx={{
          fontSize: "1.25rem",
          color: "#514C9F",
          fontWeight: "bold",
          my: 1,
        }}
      >
        {name}
      </Typography>
      <Chip
        label={designation}
        sx={{
          background: "linear-gradient(125deg, #514C9F 20.31%, #000000 85%)",
          color: "#fff",
          minWidth: 90,
          fontWeight: "bold",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          justifyContent: "center",
          mt: 1,
        }}
      >
        <img src={Twitter} alt="" />
        <img src={LinkedIn} alt="" />
        <img src={GitHub} alt="" />
      </Box>
    </Box>
  );
};

export default TeamCard;
