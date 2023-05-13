import React from "react";

//material ui
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

//project imports
import Work from "../../compponents/Work";
import ourWork from "../../menuItems/ourWork";

//assets
import Dots from "../../assets/images/Dots.svg";

const OurWork = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box id="ourWork" sx={{ my: "2rem" }}>
      <Typography
        sx={{
          fontSize: "3.3rem",
          fontWeight: "bold",
          textAlign: "center",
          mb: "4rem",
        }}
      >
        How To Get Things Done with Us
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 4,
          mx: { xs: "1rem", md: "3rem" },
        }}
      >
        {ourWork?.map((work, index) => (
          <div
            key={work.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <Work img={work.img} title={work.title} desc={work.desc} />
            {!match && index !== ourWork.length - 1 ? (
              <img src={Dots} alt="" style={{ height: 415, width: 74 }} />
            ) : null}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default OurWork;
