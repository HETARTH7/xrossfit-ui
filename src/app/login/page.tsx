"use client";

import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthServices } from "@/lib/services/authServices";
import { LoginResponse } from "@/api/types/auth/LoginResponse";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email address";
        break;

      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAll = () => {
    const newErrors: any = {};

    Object.keys(form).forEach((key) => {
      // @ts-ignore
      newErrors[key] = validateField(key, form[key]);
    });

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validateAll();
    if (Object.values(fieldErrors).some((e) => e !== "")) return;

    try {
      const loginResponse: LoginResponse = await AuthServices.login(form);
      toast.success("Login Success! Welcome.");
      console.log(loginResponse);
      loginResponse.emailVerified
        ? router.push("/home")
        : router.push(`/confirm-email/${form.email}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
        console.error(error.message + ": " + error.response?.data.error);
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={(e) => validateField("email", e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onBlur={(e) => validateField("password", e.target.value)}
            error={Boolean(errors.password)}
            helperText={errors.password}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>

          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <Link href="/signup" style={{ color: "#1976d2" }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
