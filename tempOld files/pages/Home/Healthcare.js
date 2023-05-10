import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

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
        Get The Healthcare You Need Now
      </Typography>
      <Box
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
      </Box>
    </Box>
  );
};

export default Healthcare;
