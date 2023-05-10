import React from "react";

//material ui
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

//assets
import Card from "../../assets/images/CARD.svg";
import Card2 from "../../assets/images/Card2.svg";
import Card3 from "../../assets/images/Card3.svg";
import Dots from "../../assets/images/Dots1.svg";
import Dots1 from "../../assets/images/Dots2.svg";
import Trusted1 from "../../assets/images/trusted1.svg";
import Trusted2 from "../../assets/images/trusted2.svg";
import Trusted3 from "../../assets/images/trusted3.svg";
import Trusted4 from "../../assets/images/trusted4.svg";
import Trusted5 from "../../assets/images/trusted5.svg";
import Trusted6 from "../../assets/images/trusted6.svg";
import larrow from "../../assets/images/larraow.png";
import rarrow from "../../assets/images/rarrow.png";

const Trusted = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ bgcolor: "#FAE1CD", py: "4rem", position: "relative" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 700,
        }}
      >
        Trusted By Doctors &
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "2rem", md: "3rem" },
          fontWeight: 700,
        }}
      >
        Patients
      </Typography>
      <Box sx={{ textAlign: "center", my: "4rem", position: "relative" }}>
        <img
          src={Card}
          alt=""
          style={{
            width: match ? "70%" : "35%",
            position: "relative",
            zIndex: 2,
          }}
        />

        <img
          src={Dots}
          alt=""
          style={{
            position: "absolute",
            top: "-3rem",
            right: match ? "2rem" : "18.75rem",
            width: match ? "50%" : "20%",
            zIndex: 1,
          }}
        />
        <img
          src={Dots1}
          alt=""
          style={{
            width: match ? "50%" : "20%",
            position: "absolute",
            bottom: "-2rem",
            left: match ? "2rem" : "18.75rem",
          }}
        />
        <img
          src={Card2}
          alt=""
          style={{
            display: match ? "initial" : "none",
            height: "100%",
            position: "absolute",
            left: 0,
          }}
        />
        <img
          src={Card3}
          alt=""
          style={{
            display: match ? "initial" : "none",
            height: "100%",
            position: "absolute",
            right: 0,
          }}
        />
      </Box>
      <img
        src={Trusted1}
        alt=""
        style={{
          position: "absolute",
          top: "7.5rem",
          left: match ? "6rem" : "15rem",
          width: "10%",
        }}
      />
      <img
        src={Trusted2}
        alt=""
        style={{
          display: match ? "none" : "initial",
          position: "absolute",
          top: "7.5rem",
          right: match ? "6rem" : "25rem",
          width: "5%",
        }}
      />
      <img
        src={Trusted3}
        alt=""
        style={{
          position: "absolute",
          top: match ? "8rem" : "12rem",
          right: match ? "6rem" : "10rem",
          width: match ? "10%" : "5%",
        }}
      />
      <img
        src={Trusted4}
        alt=""
        style={{
          display: match ? "none" : "initial",
          position: "absolute",
          top: "24rem",
          right: "8rem",
          width: "8%",
        }}
      />
      <img
        src={Trusted2}
        alt=""
        style={{
          position: "absolute",
          bottom: match ? "4rem" : "6rem",
          right: match ? "6rem" : "22rem",
          width: match ? "8%" : "5%",
        }}
      />
      <img
        src={Trusted5}
        alt=""
        style={{
          display: match ? "none" : "initial",
          position: "absolute",
          bottom: match ? "4rem" : "6rem",
          left: match ? "6rem" : "14rem",
          width: "6%",
        }}
      />
      <img
        src={Trusted6}
        alt=""
        style={{
          position: "absolute",
          bottom: match ? "4rem" : "20rem",
          left: match ? "6rem" : "8rem",
          width: "6%",
        }}
      />
      <img
        src={larrow}
        alt=""
        style={{
          // position: "absolute",
          // bottom: match ? "3rem" : "4rem",
          // left: match ? "50rem" : "20rem",
          // width: "10%",
          position: "absolute",
          bottom: "2rem",
          left: "47%",
          width: "10%",
        }}
      />
      <img
        src={rarrow}
        alt=""
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "57%",
          width: "10%",
        }}
      />
    </Box>
  );
};

export default Trusted;
