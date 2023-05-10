import React, { useState } from "react";

//material ui
import {
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  IconButton,
  useTheme,
  useMediaQuery,
  Typography,
  Drawer,
} from "@mui/material";
import { NavLink } from "react-router-dom";

//project imports
import MenuContent from "./MenuContent";

//assets
import logo from "../assets/images/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";

const Wrapper = () => {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));

  const [navbar, setNavbar] = useState(false);
  const [menu, setMenu] = React.useState(null);
  const menuOpen = Boolean(menu);

  const changeBackground = () => {
    if (window.scrollY > 70) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };
  const handleClose = () => {
    setMenu(null);
  };

  return match ? (
    <HeaderMobile
      navbar={navbar}
      menu={menu}
      menuOpen={menuOpen}
      handleClick={handleClick}
      handleMenuClose={handleClose}
    />
  ) : (
    <Header
      navbar={navbar}
      menu={menu}
      menuOpen={menuOpen}
      handleClick={handleClick}
      handleClose={handleClose}
    />
  );
};

const Header = ({ navbar, menu, menuOpen, handleClick, handleClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
        px: 4,
        transition: "0.3s ease",
        bgcolor: navbar ? "#fff" : "transparent",
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          maxWidth: "550px",
        }}
      >
        <NavLink to={"/"}>
          <img src={logo} alt="" />
        </NavLink>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: "1rem", color: "#514C9F" }}>
            Products
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#514C9F" }}>
            <NavLink to={"/about"}>About Us</NavLink>
          </Typography>
          <FormControl
            sx={{
              m: 1,
              minWidth: 130,
              "& .MuiInputLabel-root": { color: "#ea6b0c" },
              "& .MuiSvgIcon-root": { color: "#ea6b0c" },
            }}
            size="small"
          >
            <InputLabel id="contact">Contact Us</InputLabel>
            <Select
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              labelId="contact"
              label="Contact Us"
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Button
          variant="contained"
          sx={{
            mr: 1,
            color: "#EA6B0C",
            bgcolor: "#fff",
            border: "1px solid #EA6B0C",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          Get App
        </Button>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            bgcolor: "#EA6B0C",
            "&:hover": {
              bgcolor: "#EA6B0C",
            },
          }}
        >
          Login
        </Button>
        <LoginCard menu={menu} menuOpen={menuOpen} handleClose={handleClose} />
      </Box>
    </Box>
  );
};

const HeaderMobile = ({
  navbar,
  menu,
  menuOpen,
  handleClick,
  handleMenuClose,
}) => {
  const [toggle, setToggle] = React.useState(false);

  const handleOpen = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
        px: 4,
        transition: "0.3s ease",
        bgcolor: navbar ? "#fff" : "transparent",
        zIndex: 3,
      }}
    >
      <NavLink to={"/"}>
        <img src={logo} alt="" />
      </NavLink>
      <Box>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpen}
          color="inherit"
        >
          <MenuIcon sx={{ width: 24, height: 24, color: "#514C9F" }} />
        </IconButton>

        <Drawer
          sx={{
            "& 	.MuiDrawer-paper": {
              width: "100%",
            },
          }}
          anchor={"right"}
          open={toggle}
          onClose={handleClose}
        >
          <MenuContent handleClick={handleClick} handleClose={handleClose} />
          <LoginCard
            menu={menu}
            menuOpen={menuOpen}
            handleClose={handleMenuClose}
          />
        </Drawer>
      </Box>
    </Box>
  );
};

const LoginCard = ({ menu, menuOpen, handleClose }) => {
  return (
    <Menu
      id="basic-menu"
      sx={{
        "& 	.MuiPopover-paper": {
          borderRadius: "20px",
        },
      }}
      anchorEl={menu}
      open={menuOpen}
      onClose={handleClose}
      anchorOrigin={{ horizontal: -20, vertical: "bottom" }}
    >
      <MenuItem onClick={handleClose}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#514C9F", "&:hover": { bgcolor: "#514C9F" } }}
        >
          As a Doctor
        </Button>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Button variant="outlined">As a Patient</Button>
      </MenuItem>
    </Menu>
  );
};

export default Wrapper;
