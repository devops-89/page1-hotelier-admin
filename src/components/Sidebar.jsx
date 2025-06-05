import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import CancelIcon from "@mui/icons-material/Cancel";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const [openBooking, setOpenBooking] = useState(false);
  const [openHotel, setOpenHotel] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const handleToggleBooking = () => setOpenBooking(!openBooking);
  const handleToggleHotel = () => setOpenHotel(!openHotel);

  const bookingSubItems = [
    {
      label: "Upcoming",
      icon: <UpcomingIcon />,
      path: "/dashboard/booking/upcoming",
    },
    {
      label: "Complete",
      icon: <BeenhereIcon />,
      path: "/dashboard/booking/complete",
    },
    {
      label: "Cancelled",
      icon: <CancelIcon />,
      path: "/dashboard/booking/cancelled",
    },
  ];

  const hotelSubItems = [
    {
      label: "All Hotel",
      icon: <HomeWorkIcon />,
      path: "/dashboard/hotel/allhotels",
    },
    {
      label: "Add Hotel",
      icon: <DomainAddIcon />,
      path: "/dashboard/hotel/add-hotel",
    },
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "permanent"}
      sx={{
        height: "100vh",
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "var(--sidebar-color)",
          position: "fixed",
          top: { xs: "72px", sm: "78px", md: "80px" },
        },
      }}
      anchor="left"
    >
      <List sx={{ padding: "0" }}>
        <ListItem
          button
          sx={{
            color: "var(--white-color)",
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
          onClick={() => handleNavigation("/dashboard")}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          button
          onClick={handleToggleBooking}
          sx={{
            color: "var(--white-color)",
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <EventNoteIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Booking" />
          {openBooking ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openBooking} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {bookingSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  pl: 5,
                  color: "var(--white-color)",
                  "&:hover": {
                    backgroundColor: "var(--orange-color)",
                    color: "var(--white-color)",
                    cursor: "pointer",
                    "& .MuiSvgIcon-root": { color: "var(--white-color)" },
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{ color: "var(--white-color)", minWidth: "35px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem
          button
          onClick={handleToggleHotel}
          sx={{
            color: "var(--white-color)",
            "&:hover": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
              cursor: "pointer",
              "& .MuiSvgIcon-root": { color: "var(--white-color)" },
            },
          }}
        >
          <ListItemIcon>
            <ApartmentIcon sx={{ color: "var(--white-color)" }} />
          </ListItemIcon>
          <ListItemText primary="Hotels" />
          {openHotel ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openHotel} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {hotelSubItems.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  pl: 5,
                  color: "var(--white-color)",
                  "&:hover": {
                    backgroundColor: "var(--orange-color)",
                    color: "var(--white-color)",
                    cursor: "pointer",
                    "& .MuiSvgIcon-root": { color: "var(--white-color)" },
                  },
                }}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon
                  sx={{ color: "var(--white-color)", minWidth: "35px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;
