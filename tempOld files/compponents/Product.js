import React from "react";

//material ui
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const Product = ({ title, img, contents, top, left, paddingTop }) => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        background: "linear-gradient(180deg, #000000 0%, #514C9F 100%)",
        color: "#fff",
        pt: paddingTop,
        maxWidth: "556px",
        px: { xs: "1rem", sm: "3rem" },
        pb: 4,
        borderRadius: "0 0 32px 32px",
        mt: "28rem",
        mx: { xs: "1rem", sm: "auto", lg: "inherit" },
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          position: "absolute",
          // top: -405,
          top: match ? -375 : top,
          // left: -16,
          left: match ? -12 : left,
          width: "106%",
          // width: match ? 395 : 622,
          height: 593,
        }}
      />
      <Typography sx={{ fontSize: "3.3rem", textAlign: "center", mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {contents?.map((content) => (
          <Box
            key={content.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            <img src={content.img} alt="" />
            <Box>
              <Typography sx={{ fontSize: "1.5rem" }}>
                {content.title}
              </Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>
                {content.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Product;
