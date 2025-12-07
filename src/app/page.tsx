"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Landing() {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Xrossfit
        </Typography>
        <Typography variant="h6" color="text.secondary">
          A fitness app
        </Typography>
        <Box>
          <Button>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button>
            <Link href={"/signup"}>Signup</Link>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
