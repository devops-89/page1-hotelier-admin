import React, { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  Pagination,
  Box,
  Avatar,
  Typography,
  Chip,
  Select,
} from "@mui/material";
import { useDebounce } from "../hooks/debounce";
import FullScreenDialog from "./ui/FullScreenDialog";

const HotelList = ({ data, onActionClick, table_heading }) => {

  console.log("All Hotels Data: ",data);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [open,setOpen]=useState(false);

  const filterKeys = ["name", "email"];

  const filteredData = data.filter((item) =>
    filterKeys.some((key) =>
      String(item[key]).toLowerCase().includes(debounceSearchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "space-between" },
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
            }}
          >
            {table_heading.heading}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              marginBottom: "5px",
              textAlign: { xs: "center", sm: "center", md: "start" },
            }}
          >
            {table_heading.para}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={entriesPerPage}
              sx={{
                backgroundColor: "var(--white-color)",
                marginRight: "10px",
              }}
              onChange={(e) => setEntriesPerPage(parseInt(e.target.value, 10))}
            >
              {[5, 10, 20, 50].map((count) => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ backgroundColor: "var(--white-color)" }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--sidebar-color)" }}>
            <TableRow>
              <TableCell sx={headStyle}>Image</TableCell>
              <TableCell sx={headStyle}>Name</TableCell>
              <TableCell sx={headStyle}>Facilities</TableCell>
              <TableCell sx={headStyle}>Rating</TableCell>
              <TableCell sx={headStyle}>Price</TableCell>
              <TableCell sx={headStyle}>Tax(%)</TableCell>
              <TableCell sx={headStyle}>Phone</TableCell>
              <TableCell sx={headStyle}>City</TableCell>
              <TableCell sx={headStyle}>Country</TableCell>
              <TableCell sx={headStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.length !== 0 ? (
              displayedData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <TableCell>
                    <Avatar src={item.main_image} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell sx={{ maxWidth: "200px" }}>
                    <AmenitiesChips amenities={item.amenities} />
                  </TableCell>
                  <TableCell>{item["star_rating"]}</TableCell>
                  <TableCell>{item["base_price"]}</TableCell>
                  <TableCell>{item["tax_percentage"]}</TableCell>
                  <TableCell>{item["contact_phone"]}</TableCell>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.country}</TableCell>
                 
                  <TableCell align="center"
                    sx={{padding:0}}
                  >
            <Box sx={{display: "flex",justifyContent:"center",alignItems:"center", height:'100%', gap:'2px',padding:1}}>
                      <Button
                      variant="contained"
                      onClick={() => onViewClick(item.id)}
                      sx={{
                        minWidth: "32px",
                        padding: "4px",
                      
                        backgroundColor: "var(--orange-color)",
                        "&:hover": {
                          backgroundColor: "var(--blue-color)",
                        },
                      }}
                    >
                      <VisibilityIcon fontSize="small" />
                    </Button>
                    
                     <FullScreenDialog hotel={item} />
                    

                    <Button
                      variant="contained"
                      onClick={() => onDeleteClick(item.id)}
                      sx={{
                        minWidth: "32px",
                        padding: "4px",
                        backgroundColor: "var(--orange-color)",
                        "&:hover": {
                          backgroundColor: "var(--blue-color)",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
            </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} sx={{ fontSize: "16px" }}>
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          sx={{
            "& .MuiButtonBase-root": {
              backgroundColor: "var(--orange-color)",
              color: "var(--white-color)",
            },
            "& .Mui-selected": {
              color: "var(--black-color)",
              backgroundColor: "var(--table-head-color)",
            },
            "& :hover": { color: "var(--black-color)" },
          }}
        />
      </Box>
     
    </Box>
  );
};

const headStyle = {
  fontSize: "15px",
  fontWeight: "500",
  color: "var(--white-color)",
};

// ✅ AmenitiesChips Component
const AmenitiesChips = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);

  const filteredAmenities = Object.entries(amenities)
    .filter(([_, value]) => value === true)
    .map(([key]) => key);

  const visibleAmenities = showAll
    ? filteredAmenities
    : filteredAmenities.slice(0, 3);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
      {visibleAmenities.map((amenity, index) => (
        <Chip
          key={index}
          label={amenity}
          size="small"
          color="primary"
          variant="outlined"
        />
      ))}
      {filteredAmenities.length > 3 && (
        <Chip
          label={showAll ? "Show Less" : "...more"}
          size="small"
          variant="filled"
          onClick={() => setShowAll(!showAll)}
          sx={{ cursor: "pointer", fontWeight: "bold" }}
        />
      )}
    </Box>
  );
};

export default HotelList;
