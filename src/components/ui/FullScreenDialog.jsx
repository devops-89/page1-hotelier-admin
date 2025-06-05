import React,{useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';


import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';



import Slide from '@mui/material/Slide';
import {COLORS} from "../../utils/colors";
import Grid from "@mui/material/Grid2";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { AddHotelValidationSchema } from '../../utils/validationSchema';
import { HotlierController } from '../../api/hotlierController';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({hotel}) {
  const [open, setOpen] = React.useState(false);
  console.log("hotel Id:",hotel);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const initialValues = {
    name: hotel?.name || "",
    description: hotel?.description || "" ,
    type:hotel?.type || "luxury",
    star_rating: hotel?.star_rating || 0,
    address_line:hotel?.address_line || "",
    city:hotel?.city || "",
    state:hotel?.state || "",
    country: hotel?.country || "",
    postal_code: hotel?.["postal_code"] || "",
    latitude:  hotel?.latitude || 0.0,
    longitude: hotel?.longitude || 0.0,
    contact_name: hotel?.["contact_name"] || "",
    contact_email: hotel?.['contact_email'] || "",
    contact_phone: hotel?.["contact_phone"] || "",
    alternate_phone: hotel?.["alternate_phone"]  || "",
    check_in_time: hotel?.["check-in-time"]  || "00:00:00",
    check_out_time: hotel?.["check-out-time"] || "00:00:00",
    cancellation_policy: hotel?.["cancellation_policy"] || "",
    child_policy: hotel?.["child_policy"] || "",
    pet_policy: hotel?.["pet_policy"] || "",
    main_image: hotel?.["main_image"] || "",
    gallery_images: hotel?.["gallery_images"] || [],
    base_price: hotel?.["base_price"]  || 0.0,
    tax_percentage:hotel?.["tax_percentage"]  || 0.0,
    currency: hotel?.currency || "INR",
amenities: {
      wifi: hotel?.amenities?.wifi || false,
      parking: hotel?.amenities?.parking  || false,
      ac: hotel?.amenities?.ac || false,
      restaurant: hotel?.amenities?.restaurant || false,
      pool: hotel?.amenities?.pool || false,
      gym: hotel?.amenities?.gym  || false,
      spa: hotel?.amenities?.spa || false,
      bar: hotel?.amenities?.bar || false,
      laundry: hotel?.amenities?.laundry || false,
    },
  };

 

  return (
    <React.Fragment>
     
      <Button
                            variant="contained"
                           onClick={handleClickOpen}
                            sx={{
                              minWidth: "32px",
                              padding: "4px",
                              backgroundColor: "var(--orange-color)",
                              "&:hover": {
                                backgroundColor: "var(--blue-color)",
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      
      
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative',backgroundColor:COLORS.PRIMARY }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              EDIT HOTEL
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
       {/* Edit Hotel UI Start */}
           <Box sx={{maxWidth:"1280px",margin:"auto",marginBlock:"20px"}}>
      <Grid
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 10 }}>
          <Box >
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
              Edit Hotel Details
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "15px",
                fontWeight: "400",
                marginBottom: "15px",
                textAlign: { xs: "center", sm: "center", md: "start" },
                "@media (min-width: 831px) and (max-width: 900px)": {
                  textAlign: "start",
                },
              }}
            >
              Provide the essential information to showcase your hotel and
              attract potential guests.
            </Typography>
          </Box>
        </Grid>
       
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={AddHotelValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          HotlierController.updateHotel(hotel?.hotel_id || "",values).then((response)=>{
              console.log(response);
          }).catch((error)=>{
              console.log(error);
          })
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => {
          // 🟡 Dropzone for main_image (single)
          const {
            getRootProps: getMainRootProps,
            getInputProps: getMainInputProps,
          } = useDropzone({
            onDrop: (acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const preview = Object.assign(file, {
                  preview: URL.createObjectURL(file),
                });
                console.log(preview);
                setFieldValue("main_image", preview);
              }
            },
            accept: {
              "image/jpeg": [],
              "image/png": [],
              "image/jpg": [],
              "image/webp": [],
            },
            multiple: false,
          });

          //  code for multiple images selection
          const onDrop = (acceptedFiles) => {
            const updatedFiles = acceptedFiles.map((file) =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            );
            setFieldValue("gallery_images", [
              ...values.gallery_images,
              ...updatedFiles,
            ]);
          };

          const removeImage = (index) => {
            const updated = [...values.gallery_images];
            updated.splice(index, 1);
            setFieldValue("gallery_images", updated);
          };
          const { getRootProps, getInputProps } = useDropzone({
            onDrop,
            accept: {
              "image/jpeg": [],
              "image/png": [],
              "image/gif": [],
              "image/svg+xml": [],
              "image/jpg": [],
            },
            multiple: true,
          });

          return (
            <Form>
              <Grid container spacing={2}>
                <Grid
                  size={{ xs: 12, sm: 12, md: 12, lg: 9 }}
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="hotel-name" sx={{ fontWeight: 500 }}>
                        Hotel Name
                      </FormLabel>
                      <TextField
                        id="hotel-name"
                        size="small"
                        variant="outlined"
                        placeholder="Hotel Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormControl
                        fullWidth
                        sx={{
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      >
                        <FormLabel
                          id="hotel-type-label"
                          sx={{
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Hotel Type
                        </FormLabel>
                        <Select
                          size="small"
                          labelId="hotel-type-label"
                          id="hotel-type"
                          placeholder="Hotel Type"
                          variant="outlined"
                          value={values.type}
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{
                            marginTop: 1,
                            color: "var(--black-color)",
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "var(--orange-color)",
                              },
                            },
                          }}
                        >
                          <MenuItem value="luxury">Luxury</MenuItem>
                          <MenuItem value="budget">Budget</MenuItem>
                          <MenuItem value="boutique">Boutique</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <FormLabel sx={{ fontWeight: 500 }}>
                        Hotel Description
                      </FormLabel>
                      <TextField
                        size="small"
                        id="hotel-description"
                        variant="outlined"
                        placeholder="Enter a description of the hotel"
                        value={values.description}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        multiline
                        rows={4}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="contact_name"
                        sx={{ fontWeight: 500 }}
                      >
                        Hotler Name
                      </FormLabel>
                      <TextField
                        size="small"
                        id="contact_name"
                        variant="outlined"
                        placeholder="Hotler Name"
                        value={values.contact_name}
                        name="contact_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="contact_name"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="contact_email"
                        sx={{ fontWeight: 500 }}
                      >
                        Hotler Email
                      </FormLabel>
                      <TextField
                        type="email"
                        size="small"
                        id="contact_email"
                        variant="outlined"
                        placeholder="Hotler Email"
                        value={values.contact_email}
                        name="contact_email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="contact_email"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="contact_phone"
                        sx={{ fontWeight: 500 }}
                      >
                        Hotler Phone
                      </FormLabel>
                      <TextField
                        size="small"
                        id="contact_phone"
                        variant="outlined"
                        placeholder="Mobile Number"
                        value={values.contact_phone}
                        name="contact_phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="contact_phone"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid size={{ sx: 12, sm: 4 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="alternate_phone"
                        sx={{ fontWeight: 500 }}
                      >
                        Alternate Phone
                      </FormLabel>
                      <TextField
                        size="small"
                        id="alternate_phone"
                        variant="outlined"
                        placeholder="Alternate Phone"
                        value={values.alternate_phone}
                        name="alternate_phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="alternate_phone"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Grid size={{ sx: 12, sm: 6 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="address" sx={{ fontWeight: 500 }}>
                        Address
                      </FormLabel>
                      <TextField
                        size="small"
                        id="address"
                        variant="outlined"
                        placeholder="Hotel Address"
                        value={values.address_line}
                        name="address_line"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="address_line"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="city" sx={{ fontWeight: 500 }}>
                        City
                      </FormLabel>
                      <TextField
                        size="small"
                        id="city"
                        variant="outlined"
                        placeholder="City"
                        value={values.city}
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="state" sx={{ fontWeight: 500 }}>
                        State
                      </FormLabel>
                      <TextField
                        size="small"
                        id="state"
                        variant="outlined"
                        placeholder="State"
                        value={values.state}
                        name="state"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="country" sx={{ fontWeight: 500 }}>
                        Country
                      </FormLabel>
                      <TextField
                        size="small"
                        id="country"
                        variant="outlined"
                        placeholder="Country"
                        value={values.country}
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="country"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="pincode" sx={{ fontWeight: 500 }}>
                        Pincode
                      </FormLabel>
                      <TextField
                        size="small"
                        id="pincode"
                        variant="outlined"
                        placeholder="Pincode"
                        name="postal_code"
                        value={values["postal_code"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="postal_code"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="latitude" sx={{ fontWeight: 500 }}>
                        Latitude
                      </FormLabel>
                      <TextField
                        type="number"
                        size="small"
                        id="latitude"
                        variant="outlined"
                        placeholder="Latitude"
                        name="latitude"
                        value={values.latitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="latitude"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid size={{ sx: 12, sm: 3 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="longitude" sx={{ fontWeight: 500 }}>
                        Longitude
                      </FormLabel>
                      <TextField
                        type="number"
                        size="small"
                        id="longitude"
                        variant="outlined"
                        placeholder="Longitude"
                        name="longitude"
                        value={values.longitude}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="longitude"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    {/* <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                                    <FormLabel htmlFor='hotel-attraction' sx={{ fontWeight: 500 }}>
                                        Hotel Attraction
                                    </FormLabel>
                                    <TextField
                                        id="hotel-attraction"
                                        variant="outlined"
                                        placeholder="Enter a description for hotel attraction"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        required
                                        sx={{
                                            marginTop: 1,
                                            color: 'var(--black-color)',
                                            '& .MuiOutlinedInput-root': {
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'var(--orange-color)',
                                                },
                                            },
                                        }}
                                    />
                                </Grid> */}
                  </Grid>

                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",

                      width: "100%",
                    }}
                  >
                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <FormControl>
                        <FormLabel
                          sx={{
                            fontWeight: 500,
                            "&.Mui-focused": {
                              color: "var(--black-color)",
                            },
                          }}
                        >
                          Select Amenities
                        </FormLabel>
                        <Grid
                          container
                          sx={{ display: "flex", flexWrap: "wrap" }}
                        >
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  checked={values.amenities.wifi}
                                  name="amenities.wifi"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="wifi"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  name="amenities.parking"
                                  checked={values.amenities.parking}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="Parking"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  checked={values.amenities.spa}
                                  name="amenities.spa"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="SPA"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  checked={values.amenities.bar}
                                  name="amenities.bar"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="BAR"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  name="amenities.ac"
                                  checked={values.amenities.ac}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="AC"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  checked={values.amenities.restaurant}
                                  name="amenities.restaurant"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="Restaurant"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  checked={values.amenities.pool}
                                  name="amenities.pool"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="Pool"
                            />
                          </Grid>
                          <Grid
                            size={{ xs: 12, sm: 4, md: 3 }}
                            sx={{ width: "100%" }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  size="small"
                                  sx={{
                                    "&.Mui-checked .MuiSvgIcon-root": {
                                      color: "var(--orange-color)",
                                    },
                                  }}
                                  checked={values.amenities.gym}
                                  name="amenities.gym"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              }
                              label="GYM"
                            />
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <Box sx={{ width: "100%", marginTop: 2 }}>
                        <FormLabel
                          htmlFor="special-facilities"
                          sx={{ fontWeight: 500 }}
                        >
                          Image Gallery
                        </FormLabel>

                        <Box
                          {...getRootProps()}
                          sx={{
                            border: "1px dashed gray",
                            padding: "20px",
                            textAlign: "center",
                            cursor: "pointer",
                            marginTop: 1,
                          }}
                        >
                          <input {...getInputProps()} />
                          <Typography>Drop Files To Upload</Typography>
                          <Typography variant="body2">or</Typography>
                          <Button variant="contained" color="error">
                            Upload an image
                          </Button>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            flexWrap: "wrap",
                            marginTop: 2,
                          }}
                        >
                          {values.gallery_images.map((image, index) => (
                            <Box
                              key={index}
                              sx={{
                                position: "relative",
                                width: 100,
                                height: 100,
                                borderRadius: 1,
                                overflow: "hidden",
                                border: "1px solid var(--black-color)",
                              }}
                            >
                              <img
                                src={image.preview}
                                alt={`preview-${index}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 2,
                                  right: 2,
                                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                                }}
                                onClick={() => removeImage(index)}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>

                    {/* Main Image start */}
                    <Grid item xs={12} sx={{ width: "100%" }}>
                      <Box sx={{ width: "100%", marginTop: 2 }}>
                        <FormLabel sx={{ fontWeight: 500 }}>
                          Main Image
                        </FormLabel>
                        <Box
                          {...getMainRootProps()}
                          sx={{
                            border: "1px dashed gray",
                            padding: 2,
                            textAlign: "center",
                            cursor: "pointer",
                            mt: 1,
                          }}
                        >
                          <input {...getMainInputProps()} />
                          <Typography>Drop a file to upload</Typography>
                          <Typography variant="body2">or</Typography>
                          <Button variant="contained" color="error">
                            Upload an image
                          </Button>
                        </Box>
                        {/* {touched.main_image && errors.main_image && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.main_image}
                  </Typography>
                )} */}

                        {values.main_image && (
                          <Box
                            sx={{
                              mt: 2,
                              width: 100,
                              height: 100,
                              borderRadius: 1,
                              overflow: "hidden",
                              position: "relative",
                              border: "1px solid var(--black-color)",
                            }}
                          >
                            <img
                              src={values.main_image.preview}
                              alt="main-preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => setFieldValue("main_image", null)}
                              sx={{
                                position: "absolute",
                                top: 2,
                                right: 2,
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                              }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    {/* second image end */}

                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="child-policy"
                        sx={{ fontWeight: 500 }}
                      >
                        Child Policy
                      </FormLabel>
                      <TextField
                        id="child-policy"
                        variant="outlined"
                        placeholder="Enter Child Policy Details"
                        multiline
                        name="child_policy"
                        value={values["child_policy"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={4}
                        fullWidth
                        required
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="child_policy"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <FormLabel htmlFor="pet-policy" sx={{ fontWeight: 500 }}>
                        Pet Policy
                      </FormLabel>
                      <TextField
                        id="pet-policy"
                        variant="outlined"
                        placeholder="Enter Pet Policy Details"
                        multiline
                        rows={4}
                        fullWidth
                        name="pet_policy"
                        value={values["pet_policy"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="pet_policy"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid size={{ sx: 12 }} sx={{ width: "100%" }}>
                      <FormLabel
                        htmlFor="cancellation-policy"
                        sx={{ fontWeight: 500 }}
                      >
                        Cancellation Policy
                      </FormLabel>
                      <TextField
                        id="cancellation-policy"
                        variant="outlined"
                        placeholder="Enter Cancellation Policy Details"
                        multiline
                        rows={4}
                        fullWidth
                        name="cancellation_policy"
                        value={values["cancellation_policy"]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="cancellation_policy"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 12, lg: 3 }}>
                  <Box
                    sx={{
                      backgroundColor: "var(--white-color)",
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Grid sx={{ display: "flex", flexDirection: "column" }}>
                      <FormLabel htmlFor="rating" sx={{ fontWeight: 500 }}>
                        Rating
                      </FormLabel>
                      <Rating
                        size="small"
                        id="rating"
                        name="star_rating"
                        value={Number(values["star_rating"])}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{ marginTop: 1 }}
                      />
                      <ErrorMessage
                        name="star_rating"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid sx={{ display: "flex", flexDirection: "column" }}>
                      <FormLabel htmlFor="state" sx={{ fontWeight: 500 }}>
                        Base Price
                      </FormLabel>
                      <TextField
                        size="small"
                        type="number"
                        id="state"
                        variant="outlined"
                        placeholder="Enter Base Price"
                        value={values.base_price}
                        name="base_price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="base_price"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>
                    <Grid sx={{ display: "flex", flexDirection: "column" }}>
                      <FormLabel htmlFor="state" sx={{ fontWeight: 500 }}>
                        Tax (In Percent)
                      </FormLabel>
                      <TextField
                        size="small"
                        type="number"
                        id="state"
                        variant="outlined"
                        placeholder="Enter Base Price"
                        value={values.tax_percentage}
                        name="tax_percentage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        sx={{
                          marginTop: 1,
                          color: "var(--black-color)",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "var(--orange-color)",
                            },
                          },
                        }}
                      />
                      <ErrorMessage
                        name="tax_percentage"
                        component="div"
                        style={{ color: "red", paddingBlock: "2px" }}
                      />
                    </Grid>

                    <Grid sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        size="small"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          py: 1,
                          fontSize: "16px",
                          mt: 2,
                          mb: 2,
                          backgroundColor: "var(--orange-color)",
                          "&:hover": { backgroundColor: "var(--blue-color)" },
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box> 
           


       {/* Edit Hotel UI End */}
      </Dialog>
    </React.Fragment>
  );
}
