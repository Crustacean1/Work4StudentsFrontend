import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserType, useStore } from "../stores/store";
import { useAuth } from "../contexts/AuthContext";

const AuthRoutes = () => {
  const auth = useAuth();
  const store = useStore();
  const location = useLocation();

  return (
    auth.token ? <Outlet /> : (
      <Navigate to={store.userType === UserType.Admin ? '/admin-panel' : '/login'} state={{ path: location.pathname }}/>
    )
  )
};

export default AuthRoutes;