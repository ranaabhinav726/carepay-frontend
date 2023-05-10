import React from "react";

//material ui
import { Box, TextField, Button } from "@mui/material";
import {
  PersonOutlineOutlined,
  MarkEmailReadOutlined,
} from "@mui/icons-material";

const ContactForm = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        px: 2,
        pb: 1,
        borderRadius: 1,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <PersonOutlineOutlined sx={{ color: "black", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Your Full Name"
          variant="standard"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <MarkEmailReadOutlined sx={{ color: "black", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Work Email" variant="standard" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <MarkEmailReadOutlined sx={{ color: "black", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Work Email" variant="standard" />
      </Box>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#EA6B0C",
          mt: 1,
          "&:hover": {
            bgcolor: "#EA6B0C",
          },
        }}
      >
        Request a Call
      </Button>
    </Box>
  );
};

export default ContactForm;
