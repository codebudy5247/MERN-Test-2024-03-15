"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { mutate: register } = api.auth.register.useMutation({
    onMutate() {
      setSubmitting(true);
    },
    onSettled() {
      setSubmitting(false);
    },
    onSuccess: () => {
      toast.success('Registered successfully');
      router.push("/verify-email");
      localStorage.setItem("UserEmail", email);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        onChange={(e) => setName(e.target.value)}
        id="name"
        placeholder="name"
        type="text"
        className={`
                      peer
                      w-full
                      rounded-md
                      border-2 
                      bg-white 
                       p-2
                      font-light
                      outline-none
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    `}
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        placeholder="email"
        type="email"
        className={`
                      peer
                      w-full
                      rounded-md
                      border-2 
                      bg-white 
                       p-2
                      font-light
                      outline-none
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    `}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        placeholder="password"
        type="password"
        className={`
                      peer
                      w-full
                      rounded-md
                      border-2 
                      bg-white 
                       p-2
                      font-light
                      outline-none
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    `}
      />

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out hover:bg-gray-800 focus:shadow"
      >
        {submitting ? "Submitting..." : "CREATE ACCOUNT"}
      </button>
      {/* {error && (
        <p className="text-red-500">{error.message}.</p>
      )} */}
    </form>
  );
};

export default RegisterForm;
