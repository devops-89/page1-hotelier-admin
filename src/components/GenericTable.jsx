import React, { useState } from "react";
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
  InputLabel,
  Pagination,
  Box,
  Avatar,
  colors,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useDebounce } from "../hooks/debounce";
const DataTable = ({ data, columns, onActionClick, table_heading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      String(item[column.key])
        .toLowerCase()
        .includes(debounceSearchTerm.toLowerCase())
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
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
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
              "@media (min-width: 831px) and (max-width: 900px)": {
                textAlign: "start",
              },
            }}
          >
            {table_heading.para}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            {/* <InputLabel id="entries-per-page-label">Entries</InputLabel> */}
            <Select
              labelId="entries-per-page-label"
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
              {columns.map((column) => (
                <TableCell
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "var(--white-color)",
                  }}
                  key={column.key}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "var(--white-color)",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(displayedData)}  */}

            {displayedData.length != 0 ? (
              displayedData.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.key}>
                        {column.key === 'payment_status' ? (
                          <span
                            className={
                              item[column.key] === 'Paid'
                                ? 'paid'
                                : item[column.key] === 'Unpaid'
                                  ? 'unpaid'
                                  : item[column.key] === 'Refunded'
                                    ? 'refunded'
                                    : ''
                            }
                          >
                            {item[column.key]}
                          </span>
                        ) : column.key === 'images' ? (
                          <Avatar src={item[column.key]}/>
                        ) : (
                          item[column.key]
                        )}
                      </TableCell>

                    );
                  })}
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onActionClick(item.id)}
                      sx={{
                        backgroundColor: "var(--orange-color)",
                        marginRight: "5px",
                        "&:hover":{
                          backgroundColor:'var(--blue-color)'
                        }
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell sx={{ fontSize: "16px" }}>No Data Found</TableCell>
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

export default DataTable;
