import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff, Zap, Shield, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import authService from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirect kalau sudah login
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Format email tidak valid.";
    if (!form.password) errs.password = "Password wajib diisi.";
    else if (form.password.length < 6) errs.password = "Password minimal 6 karakter.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await authService.login(form.email, form.password);
      setAuth(data.token, data.user);
      toast.success(`Selamat datang, ${data.user?.name || "Admin"}!`);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || "Email atau password salah.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk tombol Lupa Password
  const handleForgotPassword = () => {
    toast("Fitur reset password sedang dalam tahap pengembangan.", {
      icon: "🛠️",
      style: {
        background: '#1e293b',
        color: '#fff',
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] font-sans overflow-hidden relative p-4">
      
      {/* Efek Ambient Glow Latar Belakang */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Pembungkus Kotak Tengah */}
      <div className="w-full max-w-[420px] relative z-10">
        
        {/* Card Form Premium */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-8 sm:p-10 rounded-[2rem] shadow-2xl">
          
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 mb-5">
              <Zap size={28} className="text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
              Welcome to Servis<span className="text-cyan-400">Pro</span>
            </h1>
            <p className="text-slate-400 text-sm">
              Silakan login ke admin dashboard.
            </p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            
            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="admin@servispro.com"
                autoComplete="email"
                className={`w-full px-4 py-3.5 rounded-xl bg-slate-950/50 text-white placeholder-slate-500 text-sm outline-none transition-all duration-200 border
                  focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                  ${errors.email ? "border-red-500/60 focus:ring-red-500/30" : "border-slate-700/50 hover:border-slate-600"}`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300">Password</label>
                
                {/* TOMBOL LUPA PASSWORD SUDAH DIBERI FUNGSI KLIK */}
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Lupa?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full px-4 py-3.5 pr-11 rounded-xl bg-slate-950/50 text-white placeholder-slate-500 text-sm outline-none transition-all duration-200 border
                    focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
                    ${errors.password ? "border-red-500/60 focus:ring-red-500/30" : "border-slate-700/50 hover:border-slate-600"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm
                active:scale-[0.98] transition-all duration-200 shadow-lg shadow-cyan-500/25 
                disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
            <Shield size={14} className="text-emerald-500" />
            <span>Dilindungi enkripsi JWT & SSL</span>
          </div>

        </div>
      </div>
    </div>
  );
}