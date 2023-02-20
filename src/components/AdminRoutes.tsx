import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserType, useStore } from "../stores/store";

const AdminRoutes = () => {
  const store = useStore();
  const location = useLocation();

  const typeCheck = store.userType === UserType.Admin;

  return (
    typeCheck ? <Outlet /> : <Navigate to='/' state={{ path: location.pathname }}/>
  )
};

export default AdminRoutes;