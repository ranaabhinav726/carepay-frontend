import React from "react";

//material ui
import { Box, Card, CardContent, Typography } from "@mui/material";

const HealthcareCard = ({ title, img }) => {
  return (
    <Card
      sx={{
        boxShadow: 6,
        borderRadius: 4,
        width: { xs: 150, md: 215,  lg: 290, xl:320 },
        height: { xs: 200, md: 260, lg:290 },
        mx: "auto",
      }}
    >
      <CardContent>
        <Box
          sx={{
            bgcolor: "#DADAEA",
            width: { xs: 100, md: 150 },
            height: { xs: 100, md: 150 },
            borderRadius: "50%",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={img} alt="" />
        </Box>
        <Typography
          sx={{
            color: "#36336a",
            mt: 2,
            fontSize: { xs: "1rem", md: "1.5rem", xl: "1.75rem" },
            textAlign: "center",
            fontWeight: "600"
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthcareCard;
