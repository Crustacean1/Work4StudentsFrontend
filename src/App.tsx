import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import './App.css'
import Login from './views/Login/LoginView';
import Home from './views/HomeView/HomeView';
import AuthRoutes from "./components/AuthRoute";
import Register from './views/Register/RegisterView';
import ProfileForm from "./views/ProfileForm/ProfileForm";
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthRoutes />}>
            <Route path="/auth-test" element={<Home />} />
            <Route path="/profile-form" element={<ProfileForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
