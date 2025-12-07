// ======================
// LocalStorage Keys
// ======================
export const AUTH_TOKEN_KEY = "authToken";
export const AUTH_USER_KEY = "authUser";

// ======================
// API Endpoints
// ======================
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const LOGIN_URL = "/auth/login";
export const SIGNUP_URL = "/auth/signup";

// ======================
// Routes
// ======================
export const ROUTE_HOME = "/home";
export const ROUTE_LOGIN = "/login";
export const ROUTE_SIGNUP = "/signup";
export const ROUTE_ADMIN = "/admin";
export const ROUTE_CONFIRM_EMAIL = "/confirm-email";

// ======================
// Validation Regex
// ======================
export const EMAIL_REGEX = /\S+@\S+\.\S+/;

// ======================
// App Messages
// ======================
export const MSG_LOGIN_SUCCESS = "Login Success! Welcome.";
export const MSG_SIGNUP_SUCCESS = "Signup Success! Welcome.";
export const MSG_UNKNOWN_ERROR = "Something went wrong. Please try again.";
