import React from "react";

//material ui
import { Box, TextField, Button } from "@mui/material";
import {
  PersonOutlineOutlined,
  MarkEmailReadOutlined,
  // PhoneIcon,

} from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';


const ContactForm = () => {
  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        px: 2,
        pb: 1,
        borderRadius: 1,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <PersonOutlineOutlined sx={{ color: "#313896", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          label="Your Full Name"
          variant="standard"
          InputLabelProps={{
            style: { color: '#313896' },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <MarkEmailReadOutlined sx={{ color: "#313896", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Work Email" variant="standard" InputLabelProps={{
            style: { color: '#313896' },
          }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <PhoneIcon sx={{ color: "#313896", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Phone Number" variant="standard" InputLabelProps={{
            style: { color: '#313896' },
          }} />
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
