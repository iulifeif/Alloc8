import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroductionPage from "./components/IntroPage";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/auth/login" element={<LogInPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage person={undefined} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
