"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "@mui/material";

export default function Navbar() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/home");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: App Name */}
      <Link href="/home">
        <span className="text-2xl font-bold text-blue-600 cursor-pointer">
          Xrossfit
        </span>
      </Link>

      {/* Right: Profile + Logout */}
      <div className="flex items-center gap-4">
        {/* Profile Icon */}
        <Avatar className="cursor-pointer" onClick={handleNavigate} />

        {/* Logout Button */}
        <Button variant="outlined" color="error" onClick={handleNavigate}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
