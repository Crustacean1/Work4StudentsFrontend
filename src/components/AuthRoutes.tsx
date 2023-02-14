import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoutes = () => {
  const auth = useAuth();
  const location = useLocation();

  console.log(location.pathname);

  return (
    auth.token ? <Outlet /> : <Navigate to='/login' state={{ path: location.pathname }}/>
  )
};

export default AuthRoutes;