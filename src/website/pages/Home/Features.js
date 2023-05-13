import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

//project imports
import Feature from "../../compponents/Feature";
import features from "../../menuItems/features";

const Experience = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: "3.3rem",
          fontWeight: "bold",
          mb: "45px",
          maxWidth: "70vw",
          textAlign: "center",
        }}
      >
        Why we are the first Choice
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "90vw",
          flexWrap: "wrap",
          rowGap: 6,
          ml: { xs: "40px", md: "80px" },
        }}
      >
        {features.map((feature) => (
          <Feature
            key={feature.title}
            title={feature.title}
            img={feature.img}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
