import React from "react";

//material ui
import { Box, Typography } from "@mui/material"; //Button,

//assets
import Rings from "../../assets/images/Rings5.svg";
import Rings2 from "../../assets/images/Rings6.svg";

const AboutUs = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #000000 0%, #514C9F 100%)",
        color: "#fff",
        mt: "70px",
        p: "2rem",
        textAlign: "center",
        position: "relative",
        minHeight: "23rem",
      }}
    >
      <img
        src={Rings}
        alt=""
        style={{ position: "absolute", top: 0, left: 0, width: "18%" }}
      />
      <img
        src={Rings2}
        alt=""
        style={{ position: "absolute", bottom: 0, right: 0, width: "25%" }}
      />
      <Box sx={{ mb: "5.2rem" }}>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          About Us
        </Typography>
        <Box
          sx={{
            borderBottom: "6px solid #ea6b0c",
            borderRadius: 4,
            width: "130px",
            mx: "auto",
          }}
        />
      </Box>
      <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold" }}>
        Founded in 2023, CarePay was established to help patients access
        elective
      </Typography>
      <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold" }}>
        treatments without the burden of high out-of-pocket costs. Our mission
        is to make
      </Typography>
      <Typography sx={{ fontSize: "1.7rem", fontWeight: "bold" }}>
        healthcare spending simple and affordable for everyone.
      </Typography>
      {/* <Button
        variant="contained"
        sx={{
          bgcolor: "#EA6B0C",
          "&:hover": {
            bgcolor: "#EA6B0C",
          },
          mt: "2rem",
          mb: "1rem",
          py: "1rem",
          px: "2rem",
        }}
      >
        Contact
      </Button> */}
    </Box>
  );
};

export default AboutUs;
