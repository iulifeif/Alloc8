import axios from "axios";

const getCsrfToken = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/csrf/", {
    withCredentials: true, // Important to include cookies
  });

  const { csrfToken } = response.data as { csrfToken: string };
  console.log("CSRF Token:", csrfToken); // Store or use for requests
  return csrfToken;
};

export default getCsrfToken;
