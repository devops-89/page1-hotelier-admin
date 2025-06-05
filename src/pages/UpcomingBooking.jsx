import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

const HotelsList = () => {
  const columns = [
    { key: "id", label: "ID" },
    { key: "hotel_name", label: "Hotel Name" },
    { key: "room_type", label: "Room Type" },
    { key: "check_in", label: "Check In" },
    { key: "check_out", label: "Check Out" },
    { key: "customer_name", label: "Customer Name" },
    { key: "price_per_night", label: "Price Per Night" },
    { key: "total_price", label: "Total Price" },
    { key: "payment_status", label: "Payment Status" }
  ];
  
  
  

  const handleView = (id) => {
    console.log("View hotel Detail:", id);
  };

  const table_heading = {
    heading: "Upcoming Bookings",
    para: "Stay organized by viewing your upcoming bookings and their details."
  };

  return (
    <GenericTable
      data={data.upcoming_bookings}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
  );
};

export default HotelsList;
