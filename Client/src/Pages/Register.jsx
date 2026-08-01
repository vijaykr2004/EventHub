import { Link } from "react-router";
import { User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../Service/authService";
const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await registerUser({
      name,
      email,
      password,
    });

    alert("Registration Successful");

    navigate("/login");

  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
  }
};


  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join EventHub today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}

          <div>
            <label className="font-medium">
              Full Name
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-2">
              <User className="text-gray-400" size={18} />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-2">
              <Mail className="text-gray-400" size={18} />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-2">
              <Lock className="text-gray-400" size={18} />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-medium">
              Confirm Password
            </label>

            <div className="flex items-center border rounded-lg px-3 mt-2">
              <Lock className="text-gray-400" size={18} />

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
            Register
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?

          <Link
            to="/login"
            className="text-purple-600 font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;