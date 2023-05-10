import React from "react";

//material ui
import { Box, Typography, Button } from "@mui/material";

//assets
import Rectandle from "../../assets/images/Rectangle.svg";
import Rings from "../../assets/images/Rings.svg";
import Rings2 from "../../assets/images/Rings2.svg";
import Hospitality from "../../assets/images/Hospitality.svg";
import { ArrowForwardIos } from "@mui/icons-material";

const Affordable = () => {
  return (
    <Box
      sx={{
        display: { xs: "block", md: "flex" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "relative",
          pl: { xs: 4, md: 15 },
          mt: 18,
          mb: 5,
          flex: 1,
        }}
      >
        {/* <img
          src={Rings2}
          alt=""
          style={{ position: "absolute", top: -234, left: 15, zIndex: -1 }}
        /> */}
        <Typography
          sx={{
            fontSize: "3.5rem",
            color: "#514c9f",
            fontWeight: 900,
            lineHeight: "120%",
          }}
        >
          Making Healthcare Spending <span style={{ color: "black" ,fontSize: "3.5rem", lineHeight: "120%", }}>Simple and Affordable</span> 
        </Typography>
        <Typography
        
          sx={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: "120%" }}
        >
          <span style={{ color: "#514c9f" }}></span> 
        </Typography>
        <Typography
          sx={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: "120%" }}
        >
          
        </Typography>
        <Typography sx={{ fontSize: "1.8rem", mt: 2, color: "#514c9f" }}>
          Access your treatments without
        </Typography>
        <Typography sx={{ fontSize: "1.8rem", color: "#514c9f" }}>
          financial stress.
        </Typography>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIos />}
          sx={{
            bgcolor: "#EA6B0C",
            mt: 4,
            px: 3,
            py: 2,
            borderRadius: { xs: 2.5, md: 1.5 },
            "&:hover": {
              bgcolor: "#EA6B0C",
            },
            width: { xs: "94%", md: "inherit" },
          }}
        >
          Discover How it Works
        </Button>
      </Box>
      <Box sx={{ flex: 1, textAlign: "end", position: "relative" }}>
        <img src={Rectandle} alt="" style={{ width: "90%" }} />
        <img
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          src={Rings}
          alt=""
        />
        <img
          style={{
            position: "absolute",
            bottom: "-18px",
            right: 0,
            width: "100%",
          }}
          src={Hospitality}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default Affordable;
