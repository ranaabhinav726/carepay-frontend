import React, { useState } from "react";

//material ui
import { Box, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const Question = ({ title, ans }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
        boxShadow: toggle ? 3 : 0,
      }}
    >
      <Box>
        <Typography
          onClick={() => setToggle(!toggle)}
          sx={{
            fontSize: "1.3rem",
            color: "#514C9F",
            fontWeight: "bold",
            mb: "1rem",
          }}
        >
          Q. {title}
        </Typography>
        {toggle && <Typography sx={{ color: "#514C9F" }}>A. {ans}</Typography>}
      </Box>
      {toggle ? (
        <Remove
          onClick={() => setToggle(!toggle)}
          sx={{ color: "#EA6B0C", width: "32px", height: "32px" }}
        />
      ) : (
        <Add
          onClick={() => setToggle(!toggle)}
          sx={{ color: "#EA6B0C", width: "32px", height: "32px" }}
        />
      )}
    </Box>
  );
};

export default Question;
