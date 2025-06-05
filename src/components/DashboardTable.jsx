import React from 'react'
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Grid from "@mui/material/Grid2";

const DashboardTable = ({ title, description, customSize, columns, table_body }) => {

  // console.log(table_body);
  return (
    <Grid container
    size={{
      xs:customSize.xs,
      sm:customSize.sm
    }}
    sx={{
      padding: '10px',
      backgroundColor: 'var(--white-color)',
      boxShadow: '0px 0px 8px #cac9c9',
      flexDirection:'column'
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '18px' }}>
      {title}
    </Typography>
    <p style={{ marginBottom: '10px' }}>
      {description}
    </p>
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead sx={{backgroundColor:'var(--sidebar-color)'}}>
        <TableRow>
            {columns.map((column, index)=>{
              return (
                <TableCell sx={{color:'var(--white-color)', fontWeight:'600'}} key={index}>{column}</TableCell>
              )
            })}
            </TableRow>
        </TableHead>
        <TableBody>
          {table_body.map((rowData, index) =>{ 
            return (
            <>
                {/* {console.log(rowData)} */}
              <TableRow sx={{ "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    } }} key={index}>
                {columns.map((col, colIndex) => { 
                  return (
                    <>
                    {/* {console.log(col)} */}
                  <TableCell sx={{fontSize:'13px'}} key={colIndex}>{rowData[col]}</TableCell>
                  </>
                )
                
                })}
              </TableRow>
              </>
            )})}

        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
  )
}

export default DashboardTable;