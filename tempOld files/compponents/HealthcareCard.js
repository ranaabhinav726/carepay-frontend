import React from "react";

//material ui
import { Box, Card, CardContent, Typography } from "@mui/material";

const HealthcareCard = ({ title, img }) => {
  return (
    <Card
      sx={{
        boxShadow: 3,
        borderRadius: 4,
        width: { xs: 150, md: 261 },
        height: { xs: 200, md: 260 },
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
            fontSize: { xs: "1.2rem", md: "2rem" },
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HealthcareCard;
