import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToast } from "../redux/reducers/toast";
import { setUserDetails } from "../redux/reducers/user";
import { TOAST_STATUS } from "../utils/enum";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material/";
import Grid from "@mui/material/Grid2";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import Logo from "../assets/logo.png";
import LoginSidebar from "../assets/login_sidebar.png";
import { Formik, Field, Form } from "formik";

import { AuthenticationController } from "../api/authController";
import ToastBar from "../components/ToastBar";
import { validationSchema } from "../utils/validationSchema";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (values) => {
    setLoading(true);

    AuthenticationController.login({
     identity: values.email,
      password: values.password,
    })
      .then((res) => {
        const access_token = res.data.data.access_token;

        localStorage.setItem("access_token", access_token);
        values.email = "";
        values.password = "";
        dispatch(setUserDetails({ ...res.data.data, isAuthenticated: true }));
        dispatch(
          setToast({
            open: true,
            message: res.data.message,
            severity: TOAST_STATUS.SUCCESS,
          })
        );

        setLoading(false);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;

        values.email = "";
        values.password = "";
        dispatch(
          setToast({
            open: true,
            message: errMessage,
            severity: TOAST_STATUS.ERROR,
          })
        );

        setLoading(false);
      });
  };

  return (
    <>
    <Grid container spacing={2} sx={{ width: "100%", height: "100vh", padding: "10px"}}>
      <Grid size={{ xs: 12, sm: 6 }} sx={{ alignItems: "center", justifyContent:'center', display:"flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            component="img"
            src={LoginSidebar}
            alt="Hotel"
            sx={{ width: "100%" }}
          />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }} sx={{ alignItems: "center", justifyContent:'center', display:"flex" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            maxWidth:'500px'
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Page 1 Travels"
            sx={{ marginBottom: "18px", height: "auto" }}
          />
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: 500,
              color: "var(--dark-color)",
              marginBottom: 2,
            }}
          >
            Hoteler Panel Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form noValidate>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ marginBottom: 2 }}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1,
                    fontSize: "16px",
                    mt: 3,
                    mb: 2,
                    backgroundColor: "var(--orange-color)",
                    "&:hover": { backgroundColor: "var(--blue-color)" },
                  }}
                >
                  {loading ? (
                    <CircularProgress color="var(--light-color)" />
                  ) : (
                    "Login Now"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
    <ToastBar/>
    </>
  );
};

export default Login;
