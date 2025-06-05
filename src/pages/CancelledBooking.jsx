import React from "react";
import GenericTable from "../components/GenericTable.jsx";
import { data } from "../assets/data.js";

const FlightsList = () => {
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
    { key: "booking_status", label: "Booking Status" }
  ];
  
  const handleView = (id) => {
    console.log("View flight Detail:", id);
  };

  const table_heading = {
    heading: "Cancelled Bookings",
    para: "Check the details of your cancelled bookings and the refund status."
  };

  return (
    <GenericTable
      data={data.cancelled_bookings}
      columns={columns}
      onActionClick={handleView}
      table_heading={table_heading}
    />
  );
};

export default FlightsList;
