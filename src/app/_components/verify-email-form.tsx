"use client";
import React from "react";
import { useRouter } from "next/navigation";
import OtpInput from "./otp-input";
import { api } from "~/trpc/react";

const VerifyEmail = () => {
  const router = useRouter();

  let email = localStorage.getItem("UserEmail") as string;

  const verifyEmail = api.auth.verifyEmail.useMutation({
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data,
    error,
    mutate: verify,
    isPending,
    isSuccess,
    isError,
  } = verifyEmail;

  const onOtpSubmit = (verificationCode: string) => {
    verify({ email, verificationCode });
  };

  return (
    <div>
      <h2 className="font-bold">Verify Email</h2>
      <h3>{email}</h3>
      <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
    </div>
  );
};

export default VerifyEmail;
