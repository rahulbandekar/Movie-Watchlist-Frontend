import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login({ email, password });

    if (result.success) {
      authLogin(result.data.data);
      navigate("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dark via-secondary to-dark">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary rounded-full flex items-center justify-center mb-6">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">
            Sign in to continue your movie journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field pl-12"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3 text-lg flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <LogIn className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary hover:text-red-600 font-semibold transition-colors"
            >
              Create one now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
