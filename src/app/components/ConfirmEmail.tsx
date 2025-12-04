'use client'

import { useParams } from "next/navigation"

// TODO: Enable email verification through otp
export default function ConfirmEmail() {
    const email = useParams();
    console.log(email);
    
    return <div>Please verify your email</div>
}