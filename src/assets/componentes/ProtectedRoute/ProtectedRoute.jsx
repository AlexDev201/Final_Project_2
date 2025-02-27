import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    // Obtener el rol y el token desde localStorage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Si no hay token, redirigir al login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Si el usuario no tiene permiso para la ruta, redirigir al Dashboard
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/Dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
