import React from "react";

//material ui
import { Box, Typography } from "@mui/material";

//project imports
import ContactForm from "./ContactForm";

//assets
import Logo from "../assets/images/Copy of Carepay white logo@4x 1.svg";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  LocationOnOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #514C9F 0%, #282B35 71.35%)",
        p: { xs: "2rem", md: "4rem" },
      }}
    >
      <Box
        sx={{
          p: { xs: 0, md: "3rem" },
          display: "flex",
          justifyContent: "space-between",
          gap: "2rem",
          flexDirection: { xs: "column", md: "row" },
          color: "#fff",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src={Logo}
              alt=""
              style={{ width: "10rem", marginBottom: 10 }}
            />
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Facebook sx={{ fontSize: "1.8rem" }} />
              <Instagram sx={{ fontSize: "1.8rem", mx: 1 }} />
              <Twitter sx={{ fontSize: "1.8rem", mr: 1 }} />
              <LinkedIn sx={{ fontSize: "1.8rem" }} />
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: "bold",
            }}
          >
            Get CarePay for
          </Typography>
          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "#EA6B0C",
              mb: "0.8rem",
            }}
          >
            Your Practice!
          </Typography>

          <Typography sx={{ display: { xs: "none", md: "block" } }}>
            Address:
          </Typography>
          <Typography>
            <LocationOnOutlined
              sx={{ display: { xs: "initial", md: "none" } }}
            />
            5th, Floor, DLF Two Horizon
          </Typography>
          <Typography>Center, DLF phase 5, Gurugram,</Typography>
          <Typography>Haryana, 122002</Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Quick Links</Typography>
          <Typography>Privacy Policy</Typography>
          <Typography>Contact Us</Typography>
          <Typography>
            <NavLink to={"/about"}>About Us</NavLink>
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            CareCoin Technologies Pvt Ltd
          </Typography>
          <Typography>CIN OF COMPANY</Typography>
          <Box>
            <Typography sx={{ fontWeight: "bold" }}>Contact:</Typography>
            <Typography>+91 806 948 9655</Typography>
            <Typography>connect@carepay.money</Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
              Follow Us
            </Typography>
            <Facebook sx={{ fontSize: "1.6rem" }} />
            <Instagram sx={{ fontSize: "1.6rem", mx: 2 }} />
            <Twitter sx={{ fontSize: "1.6rem", mr: 2 }} />
            <LinkedIn sx={{ fontSize: "1.6rem" }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography>Products</Typography>
            <Typography>Privacy Policy</Typography>
            <Typography>Contact Us</Typography>
            <Typography sx={{ fontSize: "1.3rem" }}>
              <NavLink to={"/about"}>About Us</NavLink>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Contact:</Typography>
              <Typography>+91 806 948 9655</Typography>
              <Typography>connect@carepay.money</Typography>
            </Box>
            <Typography sx={{ fontWeight: "bold" }}>
              CIN No. of Company:
            </Typography>
            <Typography>CIN No. of Company</Typography>
          </Box>
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", mb: 1 }}>
            Get In Touch
          </Typography>
          <ContactForm />
        </Box>
      </Box>
      <Typography sx={{ color: "#fff", textAlign: "center", mt: 1 }}>
        © 2023 by CareCoin Technologies Pvt Ltd. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
