import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

interface InputValue {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [inputValue, setInputValue] = useState<InputValue>({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://dynamic-profile.onrender.com/api/auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        login();
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <div className="w-1/3 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-semibold">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleOnChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleOnChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
