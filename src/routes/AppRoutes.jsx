import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import TeknisiPage from "../pages/teknisi/TeknisiPage";

// Import halaman baru
import CustomerPage from "../pages/customer/CustomerPage";
import OrderPage from "../pages/order/OrderPage";
import ProfilePage from "../pages/profile/ProfilePage"; // <-- Tambahan Import Profile

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected — semua halaman admin */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teknisi" element={<TeknisiPage />} />
          
          {/* Tambahan route baru */}
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} /> {/* <-- Tambahan Route Profile */}
        </Route>
      </Route>

      {/* Fallback (Jika ngetik URL ngawur, otomatis dilempar ke Dashboard) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}