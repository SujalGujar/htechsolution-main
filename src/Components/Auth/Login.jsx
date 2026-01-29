import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      return setError("All fields are required");
    }

    setLoading(true);

    // fake API delay
    setTimeout(() => {
      if (form.username !== "admin" || form.password !== "1234") {
        setError("Invalid username or password");
      } else {
        alert("Login Successful 🎉");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500">
          Login to your account
        </p>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Password */}
        <div className="space-y-1 relative">
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-9 text-gray-500 hover:text-indigo-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Forgot password?{" "}
          <span className="text-indigo-600 cursor-pointer hover:underline">
            Reset
          </span>
        </p>
      </form>
    </div>
  );
}
