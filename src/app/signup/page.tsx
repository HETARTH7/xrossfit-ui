"use client";

import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { AuthServices } from "@/lib/services/AuthService";
import { AuthStorageService } from "@/lib/services/AuthStorageService";
import {
  EMAIL_REGEX,
  MSG_SIGNUP_SUCCESS,
  ROUTE_CONFIRM_EMAIL,
  ROUTE_HOME,
} from "@/lib/constants";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
        if (!EMAIL_REGEX.test(value)) error = "Invalid email address";
        break;

      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;

      case "confirmPassword":
        if (value !== form.password) error = "Passwords do not match";
        break;

      default:
        if (!value.trim()) error = "This field is required";
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
      const signupResponse = await AuthServices.signup(form);
      toast.success(MSG_SIGNUP_SUCCESS);
      AuthStorageService.saveAuth(
        signupResponse.token,
        signupResponse.displayName
      );
      signupResponse.emailVerified
        ? router.push(ROUTE_HOME)
        : router.push(`${ROUTE_CONFIRM_EMAIL}/${form.email}`);
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
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} width="100%">
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="Display Name"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              onBlur={(e) => validateField("displayName", e.target.value)}
              error={Boolean(errors.displayName)}
              helperText={errors.displayName}
            />

            <TextField
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
          </Box>

          <Box mt={2} display="flex" gap={2}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              onBlur={(e) => validateField("firstName", e.target.value)}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              onBlur={(e) => validateField("lastName", e.target.value)}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </Box>

          <Box mt={2} display="flex" gap={2}>
            <TextField
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

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={(e) => validateField("confirmPassword", e.target.value)}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />
          </Box>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign Up
          </Button>

          <Typography variant="body2" textAlign="center" mt={2}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
