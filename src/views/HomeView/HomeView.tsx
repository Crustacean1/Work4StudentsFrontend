import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HomeView.css';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('logged-in');
    navigate("/login", { replace: false, state: {} });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('logged-in');
    if (!isLoggedIn) {
      navigate("/login", { replace: false, state: {} });
    }
  }, []);

  return (
    <div className="root">
      <h2>Home - mock register/login:</h2>
      {location.state ? (
        <>
          <h3>Email: {location.state.email}</h3>
          <h3>Password: {location.state.password}</h3>
        </>
      ) : (
        <>
          <h3>Email: already logged in</h3>
          <h3>Password: already logged in</h3>
        </>
      )}
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default Home
