import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserType, useStore } from "../stores/store";

const CompanyRoutes = () => {
  const store = useStore();
  const location = useLocation();

  const typeCheck = store.userType !== UserType.Student && store.userType !== UserType.None;

  return (
    typeCheck ? <Outlet /> : <Navigate to='/' state={{ path: location.pathname }}/>
  )
};

export default CompanyRoutes;