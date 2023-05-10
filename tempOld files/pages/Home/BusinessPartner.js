import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

//assets
import Westin from "../../assets/images/Westin.svg";
import Summit from "../../assets/images/Summit.svg";
import Holsim from "../../assets/images/Holsim.svg";
import ETV from "../../assets/images/ETV.svg";

const BusinessPartner = () => {
  return (
    <Box
      sx={{
        bgcolor: { xs: "#F5F5F5", md: "#DADAEA" },
        py: "3rem",
        width: "100vw",
      }}
    >
      <Typography
        sx={{
          fontSize: "3rem",
          textAlign: "center",
          fontWeight: 700,
          mb: "3rem",
        }}
      >
        Business Partner
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          rowGap: 2,
          columnGap: 1,
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        > */}
        <img src={Westin} alt="" />
        <img src={Summit} alt="" />
        {/* </Box> */}
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        > */}
        <img src={Holsim} alt="" />
        <img src={ETV} alt="" />
        {/* </Box> */}
      </Box>
    </Box>
  );
};

export default BusinessPartner;
