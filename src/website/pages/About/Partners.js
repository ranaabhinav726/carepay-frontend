import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

//project imports
import Partner from "../../compponents/Partner";
import partners from "../../menuItems/partners";

const Partners = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        py: "4rem",
        gap: 4,
      }}
    >
      <Box>
        <Box
          sx={{
            background: "linear-gradient(90deg, #2A2752 11.98%, #514C9F 100%)",
            py: "5.5rem",
            px: "4.5rem",
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderRadius: "0 100px 100px 0",
            mr: 1,
          }}
        >
          <Box
            sx={{
              borderLeft: "4px solid #EA6B0C",
              height: "6rem",
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: "3rem",
                fontWeight: "700",
                color: "#F1F4FA",
              }}
            >
              Who can be our
            </Typography>
            <Typography
              sx={{ fontSize: "3rem", fontWeight: "700", color: "#F1F4FA" }}
            >
              Partner
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 4,
          px: "2rem",
          width: { xs: "100%", md: "50%" },
        }}
      >
        {partners.map((partner) => (
          <Partner key={partner.id} title={partner.title} img={partner.img} />
        ))}
      </Box>
    </Box>
  );
};

export default Partners;
