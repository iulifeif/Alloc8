import axios from "axios";

// hex colors:
const darkGreen = "#01705f";
const lightGreen = "#00dfc0";
const blackGreen = "#1a2e35";

const getCsrfToken = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/csrf/", {
    withCredentials: true, // Important to include cookies
  });

  const { csrfToken } = response.data as { csrfToken: string };
  console.log("CSRF Token:", csrfToken); // Store or use for requests
  return csrfToken;
};

export default getCsrfToken;
export { darkGreen, lightGreen, blackGreen };
