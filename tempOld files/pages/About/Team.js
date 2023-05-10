import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

//project imports
import TeamCard from "../../compponents/TeamCard";
import team from "../../menuItems/team";

//assets
import Rings from "../../assets/images/Rings7.svg";

const Team = () => {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        py: "4rem",
        px: "1rem",
        bgcolor: "#F1F4FA",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "2.3rem",
            fontWeight: "bold",
          }}
        >
          Meet The Team
        </Typography>
        <Box
          sx={{
            width: "12rem",
            borderBottom: "6px solid #ea6b0c",
            borderRadius: 4,
            mx: "auto",
            mb: "1.5rem",
          }}
        />
      </Box>
      <Typography sx={{ fontSize: "1.5rem", color: "#514C9F" }}>
        Our dedicated team of professionals has diverse backgrounds in
        healthcare, finance, and
      </Typography>
      <Typography sx={{ fontSize: "1.5rem", color: "#514C9F" }}>
        technology. Together, we're committed to providing a seamless payment
        experience and
      </Typography>
      <Typography sx={{ fontSize: "1.5rem", color: "#514C9F" }}>
        improving the quality of life for patients around the world.
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: 8,
          my: "2rem",
        }}
      >
        {team.map((member) => (
          <TeamCard
            key={member.id}
            name={member.name}
            designation={member.designation}
            img={member.img}
          />
        ))}
      </Box>
      <img
        src={Rings}
        alt=""
        style={{ position: "absolute", left: 0, bottom: 0, width: "20%" }}
      />
    </Box>
  );
};

export default Team;
