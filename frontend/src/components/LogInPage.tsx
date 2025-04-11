import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (email && password) {
      console.log("Form submitted:", {
        email,
        password,
      });

      try {
        console.log("123");
        interface RegisterResponse {
          message: string;
        }

        const response = await axios.post<RegisterResponse>(
          "http://localhost:8000/auth/login",
          { email, password }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error: ",
            (error as any).response?.data || (error as any).message
          );
        } else {
          console.error("Error: ", error);
          alert(
            "Registration failed: " + (error as any).response?.data ||
              (error as any).message
          );
        }
      }
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
        {/* Left side form */}
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
          <Typography sx={{ fontSize: 30, marginBottom: 2 }}>Log In</Typography>
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
            Sign In
          </Button>
          <Link to="/auth/register">
            <Button variant="text">Create account</Button>
          </Link>
        </Box>
        {/* Right side image */}
        <Box
          className="login-image"
          sx={{
            flex: 2,
            backgroundImage: `url('/login.jpg')`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
      </Card>
    </Box>
  );
};
export default LogInPage;
