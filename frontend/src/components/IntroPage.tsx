import * as React from "react";
import { Box } from "@mui/material";
import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const card = (
  <React.Fragment>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: 30 }}>Hello! Alloc8 future user!</Typography>

      <Typography sx={{ fontSize: 20 }}>
        This App is used to set skill and find goals to grow!
      </Typography>
    </CardContent>

    <CardActions>
      <Link to="/auth/login">
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            const navigate = useNavigate();
            navigate("/login");
          }}
        >
          Sign In / Create account
        </Button>
      </Link>
    </CardActions>
  </React.Fragment>
);

const IntroductionPage = () => {
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
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.9,
          borderRadius: 3,
        }}
      >
        {card}
      </Card>
    </Box>
  );
};

export default IntroductionPage;
