import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CustomLoading from "../components/shared/CustomLoading";


const PrivatRoutes = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const location = useLocation();



    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        setRole(role)
        setToken(token);
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) {
        console.log("private route page",location?.state)
        return <CustomLoading />;
    }

    if (token && (role === 'ADMIN')) {
        return children
    }
    else if (token && (role === 'USER')) {
        return children
    }
    return <Navigate to="/login" state={{ from: location?.pathname, data:location?.state}}  />
};

export default PrivatRoutes;