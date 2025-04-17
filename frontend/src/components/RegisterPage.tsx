import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email || !email.includes("@")) {
      setEmailError(true);
    }
    if (!password || password.length < 8) {
      setPasswordError(true);
    }

    if (first_name && last_name && email && password) {
      setCsrfToken(Cookies.get("csrftoken") || csrfToken);
      console.log("CSRF-Token:", csrfToken);

      const response = await axios
        .post(
          "http://localhost:8000/auth/register/",
          { first_name, last_name, email, password },
          {
            headers: {
              "X-CSRFToken": csrfToken,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Login successful: ", response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.log(
            "Login failed: ",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  return (
    <Box
      className="background-image"
      sx={{
        backgroundImage: `url('/test1.jpg')`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "50%",
          height: "50%",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 5,
          padding: 3,
          opacity: 0.96,
        }}
      >
        {/* Left side image */}
        <Box
          className="login-image"
          sx={{
            flex: 2,
            backgroundImage: `url('/register.jpg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
        {/* Right side form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Typography sx={{ fontSize: 30, marginBottom: 2 }}>
            Register
          </Typography>
          <TextField
            required
            id="firstname-input"
            label="Firstname"
            type="text"
            variant="standard"
            value={first_name}
            onChange={(e) => setFirstname(e.target.value)}
            sx={{ marginBottom: 2, width: "100%" }}
          />
          <TextField
            required
            id="lastname-input"
            label="Lastname"
            type="text"
            variant="standard"
            value={last_name}
            onChange={(e) => setLastname(e.target.value)}
            sx={{ marginBottom: 2, width: "100%" }}
          />
          <TextField
            required
            id="email-input"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Email is not correct" : ""}
            sx={{ marginBottom: 2, width: "100%" }}
          />
          <TextField
            required
            id="password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={
              passwordError ? "Password needs at least 8 characters" : ""
            }
            sx={{ marginBottom: 2, width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ margin: 5 }}>
            Register
          </Button>
          <Link to="/auth/login">
            <Button variant="text">Already have an account</Button>
          </Link>
        </Box>
      </Card>
    </Box>
  );
};

export default RegisterPage;
