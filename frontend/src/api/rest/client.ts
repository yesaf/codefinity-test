import axios from "axios";

// Create an axios client and export it as a module
const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});

export default httpClient;
