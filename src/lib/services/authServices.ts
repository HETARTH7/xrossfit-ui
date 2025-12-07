import axios from "@/api/axios";
import { LoginRequest } from "@/api/types/auth/LoginRequest";
import { LoginResponse } from "@/api/types/auth/LoginResponse";
import { SignupRequest } from "@/api/types/auth/SignupRequest";
import { SignupResponse } from "@/api/types/auth/SignupResponse";

export const AuthServices = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await axios.post<SignupResponse>("/auth/signup", data);
    return response.data;
  },
};
