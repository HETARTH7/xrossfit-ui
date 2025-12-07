import axios from "@/api/axios";
import { LoginRequest } from "@/lib/types/auth/LoginRequest";
import { LoginResponse } from "@/lib/types/auth/LoginResponse";
import { SignupRequest } from "@/lib/types/auth/SignupRequest";
import { SignupResponse } from "@/lib/types/auth/SignupResponse";
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
