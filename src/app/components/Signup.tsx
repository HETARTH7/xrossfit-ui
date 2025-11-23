"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Link from "next/link";
import axios from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return;
      }
      const responseBody = {displayName, firstName, lastName, email, password};
      
      const response = await axios.post("/auth/signup", responseBody);
      const json = await response.data;
      toast.success("Signup Sucess! Welcome.");
      console.log(json);
      
    } catch (error) {
      if(error instanceof AxiosError){
        toast.error(error.response?.data.error);
        console.error(error.message+": "+error.response?.data.error)
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer/>
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
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value || "")}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          <Box mt={2} display="flex" gap={2}>
            <TextField
              fullWidth
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value || "")}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value || "")}
            />
          </Box>
          <Box mt={2} display="flex" gap={2}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Box>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign Up
          </Button>
          <Typography
            variant="body2"
            textAlign="center"
            mt={2}
          >
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
