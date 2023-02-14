import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";

const CompanyRoutes = () => {
  const store = useStore();
  const location = useLocation();

  return (
    store.userType !== 0 ? <Outlet /> : <Navigate to='/' state={{ path: location.pathname }}/>
  )
};

export default CompanyRoutes;