import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { lightGreen, darkGreen, blackGreen } from "./utils";
import MenuBar from "./MenuBar";

// Mock data
const mockGoals = [
  {
    title: "Finish React Project",
    status: "In Progress",
    description:
      "Complete all features and polish the UI for the React project.",
    progress: 80,
  },
  {
    title: "Learn Django REST",
    status: "Completed",
    description:
      "Finish the Django REST Framework course and build a sample API.",
    progress: 100,
  },
  {
    title: "Read 2 tech books",
    status: "In Progress",
    description: "Read two books on modern web development.",
    progress: 50,
  },
];

const mockSkills = [
  { name: "JavaScript", level: "Advanced" },
  { name: "Python", level: "Intermediate" },
  { name: "React", level: "Advanced" },
  { name: "Django", level: "Beginner" },
];

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url('/test1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "auto",
      }}
    >
      {/* Left Menu */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 5,
          margin: 2,
          width: 260,
          minHeight: "90vh",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 4,
          boxShadow: 3,
        }}
      >
        <MenuBar />
      </Box>
      {/* Main Dashboard Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflowY: "auto",
          py: 6,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            minWidth: 400,
            maxWidth: 900,
            padding: 5,
            borderRadius: 5,
            background: "rgba(255,255,255,0.95)",
            boxShadow: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: 700, color: darkGreen }}
          >
            Welcome to Alloc8
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: blackGreen }}>
            Your personal dashboard
          </Typography>
        </Paper>
        <Grid container spacing={4} sx={{ maxWidth: 1200, mb: 4 }}>
          {/* Goals Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: lightGreen,
                color: blackGreen,
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Goals
                </Typography>
                <List dense>
                  {mockGoals.map((goal, idx) => (
                    <ListItem key={idx} alignItems="flex-start">
                      <ListItemIcon>
                        {goal.status === "Completed" ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <RadioButtonUncheckedIcon color="warning" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <>
                            <Typography sx={{ fontWeight: 500 }}>
                              {goal.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {goal.description}
                            </Typography>
                          </>
                        }
                        secondary={goal.status}
                        secondaryTypographyProps={{
                          color:
                            goal.status === "Completed" ? "green" : "orange",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          {/* Skills Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: darkGreen,
                color: "white",
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Skills
                </Typography>
                <List dense>
                  {mockSkills.map((skill, idx) => (
                    <ListItem key={idx}>
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon sx={{ color: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 500 }}>
                            {skill.name}
                          </Typography>
                        }
                        secondary={skill.level}
                        secondaryTypographyProps={{ color: "#fff" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          {/* Progress Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: blackGreen,
                color: "white",
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Progress
                </Typography>
                <List dense>
                  {mockGoals.map((goal, idx) => (
                    <ListItem key={idx} alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 500 }}>
                            {goal.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <LinearProgress
                              variant="determinate"
                              value={goal.progress}
                              sx={{
                                height: 10,
                                borderRadius: 5,
                                background: "#fff3",
                                minWidth: 120,
                                mb: 0.5,
                              }}
                            />
                            <Typography
                              sx={{ fontSize: 12, color: "#fff", mt: 0.5 }}
                            >
                              {goal.progress}% complete
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
