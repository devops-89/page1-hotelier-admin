import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

const CabsList = () => {
  const columns = [
    { key: "id", label: "Booking ID" },
    { key: "hotel_name", label: "Hotel Name" },
    { key: "room_type", label: "Room Type" },
    { key: "customer_name", label: "Customer Name" },
    { key: "check_in", label: "Check-In Date" },
    { key: "check_out", label: "Check-Out Date" },
    { key: "price_per_night", label: "Price Per Night" },
    { key: "total_price", label: "Total Price" },
    { key: "payment_status", label: "Payment Status" },
    { key: "booking_status", label: "Booking Status" },
  ];
  

  const table_heading = {
    heading: "Completed Bookings",
    para: "View your completed bookings with all the details of past stays and payments."
  }

  const handleView = (id) => {
    console.log("View cab Detail:", id);
  };

  return (
    <GenericTable
      data={data.completed_bookings}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
  );
};

export default CabsList;
