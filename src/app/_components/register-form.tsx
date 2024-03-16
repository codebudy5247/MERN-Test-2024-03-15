"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const RegisterForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = api.auth.register.useMutation({
    onSuccess: () => {
      router.push("/verify-email")
    },
    onError: () => {
      alert("Errorrr");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser.mutate({ name, email, password });
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
        {registerUser.isPending ? "Submitting..." : "CREATE ACCOUNT"}
      </button>
      {registerUser.error && (
        <p className="text-red-500">{registerUser.error.message}.</p>
      )}
    </form>
  );
};

export default RegisterForm;