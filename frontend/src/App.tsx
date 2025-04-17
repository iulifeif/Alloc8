import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroductionPage from "./components/IntroPage";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import GoalsPage from "./components/GoalsPage";
import SkillsPage from "./components/SkillsPage";
import OpenRolesPage from "./components/OpenRolesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/auth/login" element={<LogInPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/openroles" element={<OpenRolesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
