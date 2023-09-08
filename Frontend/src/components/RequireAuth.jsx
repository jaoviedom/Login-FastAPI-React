import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';

const RequireAuth = ({ allowedRoles }) => {
    const [, , auth] = useContext(UserContext)

    const location = useLocation();
    
    return (
        // auth?.role?.find(role => allowedRoles?.includes(role)) -> Para varios roles
        auth?.role == allowedRoles[0]
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;