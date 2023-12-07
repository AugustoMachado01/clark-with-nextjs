"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface verifyEmailProps {}

export default function RegisterPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [code, setCode] = useState("");

  // Form Submit
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });
      //send email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      //change UI
      setPendingVerification(true);
    } catch (error: any) {
      console.log("erro", error);
    }
  }

  //Verify User Email Code
  async function onPressVerify() {}

  return (
    <div className="border p-5 rounded" style={{ width: "500px" }}>
      <h1 className="text-2xl mb-4">Register</h1>
      {!pendingVerification ? (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 ">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={firstName}
              id="first_name"
              onChange={({ target }) => setFirstName(target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600  block w-full p-2.5 placeholder='' "
              placeholder="Augusto"
              required={true}
            />

            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={lastName}
              id="last_name"
              onChange={({ target }) => setLastName(target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600  block w-full p-2.5 placeholder='' "
              placeholder="Machado"
              required={true}
            />

            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={({ target }) => setEmail(target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600  block w-full p-2.5 placeholder='' "
              placeholder="exemple@gmail.com"
              required={true}
            />

            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium  text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600  block w-full p-2.5  "
              required={true}
            />
          </div>
          <button className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Create an account
          </button>
        </form>
      ) : (
        <form className="space-y-4 md:space-y-6 ">
          <input
            type="text"
            value={code}
            onChange={({ target }) => setCode(target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  "
            placeholder="Enter Verification Code..."
            required={true}
          />

          <button className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5">
            Verify Email
          </button>
        </form>
      )}
    </div>
  );
}
