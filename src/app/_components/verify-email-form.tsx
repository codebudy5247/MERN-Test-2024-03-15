"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "./otp-input";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  let email = localStorage.getItem("UserEmail") as string;

  const { mutate: verify } = api.auth.verifyEmail.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: () => {
      toast.success('Success!!!');
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const onOtpSubmit = (verificationCode: string) => {
    verify({ email, verificationCode });
  };

  return (
    <div>
      <h2 className="font-bold">Verify Email</h2>
      <h3>{email}</h3>
      <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
      <button
        type="button"
        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
      >
        {submitting ? "Veryfying..." : "VERIFY"}
      </button>
    </div>
  );
};

export default VerifyEmail;
