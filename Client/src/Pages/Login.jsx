import { Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Service/authService";

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await loginUser({
      email,
      password,
    });

    localStorage.setItem("token", data.token);

    alert("Login Successful");

    navigate("/");

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

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
                className="w-full p-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
            Login
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?

          <Link
            to="/register"
            className="text-purple-600 font-semibold ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;