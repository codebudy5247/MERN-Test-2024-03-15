"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "./otp-input";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import useAuthStore from "~/hooks/useAuth";


const VerifyEmail = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const user = useAuthStore((state) => state.user)

  let email = user?.email as string

  const { mutate: verify } = api.auth.verifyEmail.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: () => {
      toast.success("Success!!!");
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
      <h2 className="mb-5 text-center text-2xl font-semibold">
        Verify your email
      </h2>
      <h2 className="mb-1 text-center text-md">
        Enetr the 6 digit code you have recieved on
      </h2>
      <h2 className="mb-5 text-center text-md font-semibold">{email}</h2>
      <h3>Code</h3>
      <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
      <button
        type="button"
        className="mt-5 group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-2 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
      >
        {submitting ? "Veryfying..." : "VERIFY"}
      </button>
    </div>
  );
};

export default VerifyEmail;
