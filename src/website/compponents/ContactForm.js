import React, { useState } from "react";

//material ui
import { Box, TextField, Button } from "@mui/material";
import {
  PersonOutlineOutlined,
  MarkEmailReadOutlined,
  // PhoneIcon,

} from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import axios from "axios";
import { env } from "../../patient/environment/environment";


const ContactForm = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [query, setQuery] = useState('');

  const [submitted, setSubmitted] = useState(false);

  let submitObj = {
    "name": fullName,
    "emailId": email,
    "mobileNumber": number,
    "query": query
  };

  function handleForm(){
    axios.post(env.api_Url + "saveOrUpdateQuery", submitObj)
    .then(response => {
      console.log(response);
      if(response.data.status === 200){
        setSubmitted(true);
        setFullName("");
        setEmail("");
        setNumber("");
        setQuery("");
      }
    })
  }

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
          value={fullName ?? ""}
          onChange={(e)=>setFullName(e.target.value)}
          label="Your Full Name"
          variant="standard"
          InputLabelProps={{
            style: { color: '#313896' },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <MarkEmailReadOutlined sx={{ color: "#313896", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" value={email ?? ""} onChange={(e)=>setEmail(e.target.value)} label="Work Email" variant="standard" InputLabelProps={{
            style: { color: '#313896' },
          }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <PhoneIcon sx={{ color: "#313896", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" value={number ?? ""} onChange={(e)=>setNumber(e.target.value)} label="Phone Number" variant="standard" InputLabelProps={{
            style: { color: '#313896' },
          }} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <EditNoteOutlinedIcon sx={{ color: "#313896", mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" value={query ?? ""} onChange={(e)=>setQuery(e.target.value)} label="Your query" variant="standard" InputLabelProps={{
            style: { color: '#313896' },
          }} />
      </Box>
      <Button
        variant="contained"
        onClick={()=>handleForm()}
        sx={{
          bgcolor: "#EA6B0C",
          mt: 1,
          "&:hover": {
            bgcolor: "#EA6B0C",
          },
        }}
      >
        {submitted?"Submitted" : "Request a Call"}
      </Button>
    </Box>
  );
};

export default ContactForm;
