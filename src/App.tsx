import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './views/Login/LoginView';
import Home from './views/HomeView/HomeView';
import Header from "./components/Header/Header";
import AuthRoutes from "./components/AuthRoutes";
import AddOffer from "./views/AddOffer/AddOffer";
import WorkOffer from "./views/WorkOffer/WorkOffer";
import Register from './views/Register/RegisterView';
import Profile from "./views/ProfileView/ProfileView";
import ProfileEdit from "./views/ProfileEdit/ProfileEdit";
import ProfileForm from "./views/ProfileForm/ProfileForm";
import { AuthProvider } from './contexts/AuthContext';
import './App.css'
import CompanyRoutes from "./components/CompanyRoutes";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route element={<CompanyRoutes />}>
              <Route path="/add-offer" element={<AddOffer />} />
            </Route>
            <Route path="/entry-form" element={<ProfileForm />} />
            <Route path="/edit-profile" element={<ProfileEdit />} />
            <Route path="/work-offer/:offerId" element={<WorkOffer />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
