import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroductionPage from "./components/IntroPage";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import GoalsPage from "./components/GoalsPage";
import SkillsPage from "./components/SkillsPage";
import OpenRolesPage from "./components/OpenRolesPage";
import PersonalDetails from "./components/PersonalDetails";
import Settings from "./components/Settings";
import Notifications from "./components/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/auth/login" element={<LogInPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<div>Welcome to the Home Page!</div>} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="openroles" element={<OpenRolesPage />} />
          <Route path="personaldetails" element={<PersonalDetails />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
