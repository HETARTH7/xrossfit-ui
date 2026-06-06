"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import Navbar from "@/components/Navbar";
import { PersonalDetails } from "@/lib/interfaces/user/PersonalDetails";
import { AuthStorageService } from "@/lib/services/AuthStorageService";
import { Avatar, CircularProgress, Divider } from "@mui/material";

export default function Profile() {
  const [personalDetails, setPersonalDetails] =
    useState<PersonalDetails | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = AuthStorageService.getToken();
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchPersonalDetails();
    }
  }, [token]);

  const fetchPersonalDetails = async () => {
    try {
      const response = await axios.get<PersonalDetails>(
        "/user/personal-details",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPersonalDetails(response.data);
    } catch (error) {
      console.error("Error fetching personal details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex justify-center p-6">
        <div className="w-full max-w-3xl">
          <div className="bg-white shadow-md rounded-xl p-8">
            {loading ? (
              <div className="flex justify-center py-10">
                <CircularProgress />
              </div>
            ) : (
              <>
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-8">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      fontSize: 42,
                    }}
                  >
                    {personalDetails?.displayName?.charAt(0).toUpperCase()}
                  </Avatar>

                  <h1 className="mt-4 text-2xl font-semibold text-gray-900">
                    {personalDetails?.firstName} {personalDetails?.lastName}
                  </h1>

                  <p className="text-gray-500">
                    @{personalDetails?.displayName}
                  </p>
                </div>

                <Divider />

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <ProfileField
                    label="First Name"
                    value={personalDetails?.firstName}
                  />

                  <ProfileField
                    label="Last Name"
                    value={personalDetails?.lastName}
                  />

                  <ProfileField
                    label="Display Name"
                    value={personalDetails?.displayName}
                  />

                  <ProfileField label="Email" value={personalDetails?.email} />

                  <div>
                    <p className="text-sm text-gray-500">Email Verification</p>

                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                        personalDetails?.emailVerified
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {personalDetails?.emailVerified
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  </div>

                  <ProfileField
                    label="Phone Number"
                    value={personalDetails?.phoneNumber}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  value?: string | number | null;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 text-base font-medium text-gray-900">{value || "-"}</p>
    </div>
  );
}
