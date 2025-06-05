import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import ApartmentIcon from '@mui/icons-material/Apartment';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CancelIcon from '@mui/icons-material/Cancel';
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import DashboardTable from "../components/DashboardTable";
import { dashboardTableData, tables } from "../assets/data.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardDataList = [
    {
      icon: <ApartmentIcon sx={{ fontSize: "50px" }} />,
      label: "All Bookings",
      quantity: 15305,
      bgColor: "#304ffe",
      href: "/dashboard",
    },
    {
      icon: <UpcomingIcon sx={{ fontSize: "50px" }} />,
      label: "Upcoming",
      quantity: 12453,
      bgColor: "#e91e63",
      href: "/dashboard/booking/upcoming",
    },
    {
      icon: <BeenhereIcon sx={{ fontSize: "50px" }} />,
      label: "Complete",
      quantity: 10405,
      bgColor: "#4caf50",
      href: "/dashboard/booking/complete",
    },
    {
      icon: <CancelIcon sx={{ fontSize: "50px" }} />,
      label: "Cancelled",
      quantity: 9665,
      bgColor: "#ff8f00",
      href: "/dashboard/booking/complete",
    }
  ];

  return (
    <>
      <Box component="section" sx={{ py: 2 }}>
        <Grid container spacing={2}>
          {dashboardDataList.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{
                borderRadius: "4px",
                backgroundColor: "var(--white-color)",
                boxShadow: "0px 0px 8px #cac9c9",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => navigate(item.href)}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", height: "90px" }}
              >
                <Box
                  sx={{
                    width: "40%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: item.bgColor,
                    color: "white",
                    borderRadius: "4px",
                    m: "0px",
                    mr: 2,
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                >
                  {item.icon}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "var(--black-color)", fontSize: "18px", "&:hover":{color:'var(--orange-color)'} }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: item.bgColor, fontWeight: 600 }}
                  >
                    {" "}
                    <CountUp
                      start={0}
                      end={item.quantity}
                      duration={2}
                      separator=","
                      onUpdate={(num) => Math.floor(num / 10) * 1000}
                    />{" "}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Tables  */}

      <Box component="section" sx={{ py: 2 }}>
        <Grid container spacing={2}>
          {tables.map((table, index) => {
            //  {console.log( dashboardTableData[table.table_body])}
            return (
              <DashboardTable
                key={index}
                title={table.heading}
                description={table.subheading}
                customSize={table.customSize}
                columns={table.columns}
                table_body={dashboardTableData[table.table_body]}
              />
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
