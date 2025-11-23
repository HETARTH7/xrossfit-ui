"use client";

import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const responseBody = {email, password};
        
        const response = await axios.post("/auth/login", responseBody);
        const json = await response.data;
        toast.success("Login Sucess! Welcome.");
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
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
