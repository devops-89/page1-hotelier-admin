import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const AddHotelValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  star_rating: Yup.number().min(0).max(5).required("Rating is required!"),
  address_line: Yup.string().required("Address line is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  postal_code: Yup.string().required("Postal code is required"),
  latitude: Yup.mixed().required("Latitude is Required!"),
  longitude: Yup.mixed().required("Longitude is Required!"),
  contact_name: Yup.string().required("Contact name is required"),
  contact_email: Yup.string()
    .email("Invalid email")
    .required("Contact email is required"),
  contact_phone: Yup.string().required("Mobile Number is required"),
  alternate_phone: Yup.string().required("Alternate phone is required"),
  check_in_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Invalid time format")
    .required("Check-in time is required"),
  check_out_time: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Invalid time format")
    .required("Check-out time is required"),
  cancellation_policy: Yup.string().required("Cancellation policy is required"),
  child_policy: Yup.string().required("Child policy is required"),
  pet_policy: Yup.string().required("Pet policy is required"),
  // main_image: Yup.string().url("Invalid URL").required("Main image is required"),

  base_price: Yup.number()
    .min(0, "Base Price Must Be Greater Than 0!")
    .required("Base price is required"),
  tax_percentage: Yup.number()
    .min(0, "Tax Percentage must not be less than 0!")
    .max(100, "Tax Percentage must not be greater than 100!")
    .required("Tax percentage is required"),
  amenities: Yup.object().shape({
    wifi: Yup.boolean(),
    parking: Yup.boolean(),
    ac: Yup.boolean(),
    restaurant: Yup.boolean(),
    pool: Yup.boolean(),
    gym: Yup.boolean(),
    spa: Yup.boolean(),
    bar: Yup.boolean(),
    laundry: Yup.boolean(),
  }),
});
