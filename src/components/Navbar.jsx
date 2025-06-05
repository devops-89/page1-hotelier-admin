import React,{useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import logoSrc from "../assets/logo.png";
import { useMediaQuery, useTheme } from "@mui/material";





const Navbar = ({
  logo = logoSrc,
  mailCount = 0,
  notificationCount = 0,
  avatarSrc = "/static/images/avatar/1.jpg",
  bgcolor = "var(--white-color)", 
  onToggleSidebar=()=>{}
}) => {
  
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("lg"));
  const [menuOpen,setMenuOpen]=useState(false);

  const handleMenuToggle=()=>{
    setMenuOpen(!open);
    onToggleSidebar();
  }

  return (
    <AppBar
      sx={{
        bgcolor,
        position: "fixed",
        boxShadow: "none",
        top: 0,
        py:1
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
       
          {isMobile && (
            <IconButton onClick={handleMenuToggle} sx={{ color: "black" }}>
              <MenuIcon />
            </IconButton>
          )}
           <img src={logo} alt="Logo" style={{ height: isMobile ? 40 : 50, marginLeft: isMobile ? 10 : 0 }} />
        </Box>

        {/* Items */}
        <Box display="flex" alignItems="center">
         

          {/* Mail Icon */}
          <IconButton sx={{ color: "var(--orange-color)" }}>
            <Badge badgeContent={mailCount} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          {/* Notifications Icon */}
          <IconButton sx={{ color: "var(--orange-color)"}}>
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Avatar */}
          <IconButton sx={{ color: "black" }}>
            <Avatar alt="User" src={avatarSrc} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
