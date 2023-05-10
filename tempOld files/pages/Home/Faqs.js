import React from "react";

//material ui
import { Box, Button, Typography } from "@mui/material";

//project imports
import Question from "../../compponents/Question";
import questions from "../../menuItems/questions";

const Faqs = () => {
  return (
    <Box sx={{ my: "2rem" }}>
      <Typography
        sx={{
          fontSize: "3.3rem",
          fontWeight: "bold",
          textAlign: "center",
          mb: "4rem",
        }}
      >
        Got questions? Get them answered here
      </Typography>
      <Box
        sx={{
          width: { xs: "80%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          gap: 6,
          mx: "auto",
        }}
      >
        {questions?.map((question) => (
          <Question
            key={question.id}
            title={question.title}
            ans={question.ans}
          />
        ))}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.8rem",
            color: "#514C9F",
            fontWeight: "bold",
          }}
        >
          Still have a question?
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", mt: "2rem" }}>
        <Button
          variant="contained"
          sx={{
            color: "#EA6B0C",
            bgcolor: "#fff",
            borderRadius: 0,
            px: 3,
            py: 2,
            border: "1px solid #EA6B0C",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default Faqs;
