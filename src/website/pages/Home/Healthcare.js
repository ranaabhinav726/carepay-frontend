import React from "react";

//material ui
import { Box, Typography, Grid } from "@mui/material";

//project imports
import HealthcareCard from "../../compponents/HealthcareCard";
import sectors from "../../menuItems/sectors";

//assets
import Rings from "../../assets/images/Rings3.svg";
import Rings2 from "../../assets/images/Rings4.svg";

const Healthcare = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        my: "150px",
        px: 3,
      }}
    >
      {/* <img
        src={Rings}
        style={{ position: "absolute", top: -115, left: 0, zIndex: -1 }}
        alt=""
      /> */}
      {/* <img
        src={Rings2}
        style={{ position: "absolute", bottom: -65, right: 0, zIndex: -1 }}
        alt=""
      /> */}
      <Typography sx={{ fontSize: "3.3rem", fontWeight: "bold", mb: "45px" }}>
      Catering  all your Healthcare Needs
      </Typography>
      {/* <Box
        sx={{
          display: "flex",
          rowGap: { xs: 2, md: 5 },
          columnGap: { xs: 0, md: 5 },
          flexWrap: "wrap",
          maxWidth: "90vw",
        }}
      >
        {sectors.map((sector) => (
          <HealthcareCard
            title={sector.title}
            img={sector.img}
            key={sector.title}
          />
        ))}
      </Box> */}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, lg: 8 }}
      >
        {sectors.map((sector, index) => (
          <Grid item xs={2} sm={1} lg={2} key={index}  >
            <HealthcareCard
              title={sector.title}
              img={sector.img}
              key={sector.title}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Healthcare;
