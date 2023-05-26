import React, { useState } from "react";

//material ui
import { TextField, Typography, Grid, Button } from "@mui/material";
import { env } from "../../../patient/environment/environment";

import axios from "axios";

const inputStyle = {
  "& .MuiInputBase-root": {
    borderRadius: "20px",
    "&.Mui-focused fieldset": {
      borderColor: "#514C9F",
    },
    color: "#514C9F",
    bgcolor: "#fff",
  },
};

const ContactForm = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    city: "",
    specialization: "",
    clinicName: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let submitObj = {
    "firstName": values.firstName,
    "lastName": values.lastName,
    "emailId": values.email,
    "phoneNumber": values.number,
    "city": values.city,
    "specialization": values.specialization,
    "clinicName": values.clinicName
  }

  const handleSubmit = (e) => {
    // e.preventDefault();

    axios.post(env.api_Url + "saveOrUpdateContactUsDetail", submitObj)
    .then(response => {
      console.log(response);
      if(response.data.status === 200){
        setSubmitted(true);

        setValues({
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          city: "",
          specialization: "",
          clinicName: "",
        });
      }
    })
    console.log(values);
  };

  return (
    <Grid
      container
      sx={{
        width: { xs: "80%", sm: "50%" },
        mx: "auto",
        boxShadow: "4px 4px 35px 0px #00000040",
        bgcolor: "#F1F4FA",
        borderRadius: "35px",
        my: "8rem",
        py: 4,
        px: 2,
        "& .MuiGrid-item": {
          p: 1,
        },
      }}
    >
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "#514C9F",
            fontSize: "1.75rem",
            fontWeight: 700,
            textAlign: "center",
            my: "20px",
          }}
        >
          Contact Us
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          variant="outlined"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          variant="outlined"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email Id*"
          variant="outlined"
          name="email"
          value={values.email}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone Number*"
          variant="outlined"
          name="number"
          value={values.number}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="City"
          variant="outlined"
          name="city"
          value={values.city}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Specialization"
          variant="outlined"
          name="specialization"
          value={values.specialization}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Clinic Name"
          variant="outlined"
          name="clinicName"
          value={values.clinicName}
          onChange={handleChange}
          sx={{ ...inputStyle }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Button
          onClick={(e)=>handleSubmit(e)}
          variant="contained"
          sx={{
            bgcolor: "#EA6B0C",
            "&:hover": {
              bgcolor: "#EA6B0C",
            },
            mt: 3,
          }}
        >
          {submitted?"Submitted" : "Request a Call"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ContactForm;
