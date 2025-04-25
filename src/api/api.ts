import axios from "axios";
import { SETTINGS } from "@/config/settings";

const api = axios.create({
  baseURL: SETTINGS.API_BASE_URL,
});

/**
 * Axios instance configured with the base API URL.
 * You can add request and response interceptors here if your application requires authentication.
 * For example, use a request interceptor to attach the access token to each request header,
 * and a response interceptor to handle automatic token refreshing on 401 responses.
 *
 **/

export default api;
