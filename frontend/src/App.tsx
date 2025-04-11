import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroductionPage from "./components/IntroPage";
import LogInPage from "./components/LogInPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/auth/login" element={<LogInPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
