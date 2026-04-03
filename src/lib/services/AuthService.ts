import axios from "@/api/axios";
import { LoginRequest } from "@/lib/interfaces/auth/LoginRequest";
import { LoginResponse } from "@/lib/interfaces/auth/LoginResponse";
import { SignupRequest } from "@/lib/interfaces/auth/SignupRequest";
import { SignupResponse } from "@/lib/interfaces/auth/SignupResponse";
import { LOGIN_URL, SIGNUP_URL } from "../constants";

export const AuthServices = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(LOGIN_URL, data);
    return response.data;
  },
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await axios.post<SignupResponse>(SIGNUP_URL, data);
    return response.data;
  },
};
