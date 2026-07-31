import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import EmergencyButton from "../components/EmergencyCalling";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiUser,
  FiUsers,
  FiBriefcase,
} from "react-icons/fi";
import { BRAND } from "../config/brand";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";

const slides = [
  {
    url: slide1,
    title: "World-Class Patient Care",
    subtitle:
      "Delivering excellence in healthcare with compassion and precision.",
  },
  {
    url: slide2,
    title: "Advanced Medical Technology",
    subtitle: "Empowering doctors with cutting-edge tools for better outcomes.",
  },
  {
    url: slide3,
    title: "Trusted by Thousands",
    subtitle: `${BRAND.hospitalName} runs on a dashboard built for modern healthcare teams.`,
  },
  {
    url: slide4,
    title: "Smarter Hospital Management",
    subtitle:
      "Streamline operations, reduce costs, and improve patient outcomes.",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ loginId: "", password: "" });
  const [role, setRole] = useState("doctor");
  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 500);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    if (index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({
        loginId: form.loginId,
        password: form.password,
      });

      if (remember) {
        localStorage.setItem("rememberedLogin", form.loginId);
      }

      const roleName = sessionStorage.getItem("currentUser");

      const user = roleName ? JSON.parse(roleName) : null;

      switch (user?.role) {
        case "SuperAdmin":
          navigate("/doctordashboard"); // Change to your actual admin dashboard route
          break;
        case "Doctor":
          navigate("/doctordashboard");
          break;

        case "Patient":
          navigate("/patient/dashboard");
          break;

        case "Staff":
          navigate("/staff/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Login ID or Password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar role="Hospital Portal" />
      <div className="min-h-screen flex">
        {/* ── LEFT PANEL — Image Slider ── */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Slide image */}
          <img
            key={current}
            src={slides[current].url}
            alt="slide"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${animating ? "opacity-0" : "opacity-100"}`}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-900/50 to-transparent" />

          {/* Top logo */}
          <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
            <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden p-1.5">
              <img
                src={BRAND.logoUrl}
                alt={`${BRAND.hospitalName} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold text-xl tracking-wide">
              {BRAND.appName}
            </span>
          </div>

          {/* Slide text */}
          <div
            className={`absolute bottom-20 left-8 right-8 z-10 transition-all duration-700 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <h2 className="text-white text-3xl font-bold leading-tight mb-3">
              {slides[current].title}
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              {slides[current].subtitle}
            </p>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-8 flex gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer
                ${i === current ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-1/3 -right-16 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -left-16 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl" />
        </div>

        {/* ── RIGHT PANEL — Login Form ── */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="flex items-center gap-3 mb-8 lg:hidden">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1.5 border border-slate-100 shadow-sm">
                <img
                  src={BRAND.logoUrl}
                  alt={`${BRAND.hospitalName} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-teal-600 font-bold text-xl">
                {BRAND.appName}
              </span>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* Doctor */}
                <button
                  type="button"
                  onClick={() => {
                    setRole("doctor");

                    setForm({
                      loginId: "",
                      password: "",
                    });

                    setError("");

                    setRemember(false);
                  }}
                  className={`rounded-2xl p-4 transition-all duration-300 border
    ${
      role === "doctor"
        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white scale-105 shadow-xl"
        : "bg-white border-slate-200 hover:border-cyan-300"
    }`}
                >
                  <FiUser className="mx-auto text-2xl mb-2" />
                  <p className="font-semibold">Doctor</p>
                  <span className="text-xs opacity-80">Medical Portal</span>
                </button>

                {/* Patient */}
                <button
                  type="button"
                  onClick={() => {
                    setRole("patient");

                    setForm({
                      loginId: "",
                      password: "",
                    });

                    setError("");

                    setRemember(false);
                  }}
                  className={`rounded-2xl p-4 transition-all duration-300 border
    ${
      role === "patient"
        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105 shadow-xl"
        : "bg-white border-slate-200 hover:border-green-300"
    }`}
                >
                  <FiUsers className="mx-auto text-2xl mb-2" />
                  <p className="font-semibold">Patient</p>
                  <span className="text-xs opacity-80">Patient Portal</span>
                </button>

                {/* Staff */}
                <button
                  type="button"
                  onClick={() => {
                    setRole("staff");

                    setForm({
                      loginId: "",
                      password: "",
                    });

                    setError("");

                    setRemember(false);
                  }}
                  className={`rounded-2xl p-4 transition-all duration-300 border
    ${
      role === "staff"
        ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white scale-105 shadow-xl"
        : "bg-white border-slate-200 hover:border-purple-300"
    }`}
                >
                  <FiBriefcase className="mx-auto text-2xl mb-2" />
                  <p className="font-semibold">Staff</p>
                  <span className="text-xs opacity-80">Staff Portal</span>
                </button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            </div>

            {/* Error banner */}
            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              {/* Login ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {role === "patient"
                    ? "Email Address or Mobile Number"
                    : "Email Address"}
                </label>

                <div className="relative">
                  {role === "patient" ? (
                    <FiUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  ) : (
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  )}

                  <input
                    type={role === "patient" ? "text" : "email"}
                    required
                    placeholder={
                      role === "patient"
                        ? "Enter Email or Mobile Number"
                        : "Enter Login ID"
                    }
                    value={form.loginId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        loginId: e.target.value,
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                  />
                </div>

                {role === "patient" && (
                  <p className="mt-1 text-xs text-gray-500">
                    Login using your registered mobile number or email address.
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full pl-10 pr-11 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="text-sm text-gray-600">
                  Remember me for 30 days
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-teal-200 hover:shadow-teal-300 cursor-pointer"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</>
                )}
              </button>
            </form>

            {/* Register only for Patient */}
            {role === "patient" && (
              <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
                <p className="text-sm text-gray-700">
                  First time visiting our hospital?
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/patientregistration/")}
                  className="mt-3 w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 py-2.5 font-semibold text-white hover:shadow-lg transition"
                >
                  Create Patient Account
                </button>
              </div>
            )}
            <EmergencyButton />

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-10">
              © {new Date().getFullYear()} {BRAND.appName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
