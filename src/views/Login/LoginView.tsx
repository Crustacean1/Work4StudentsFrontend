import { Box, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginView.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const navData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    localStorage.setItem('logged-in', 'true');
    navigate("/", { replace: false, state: navData });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('logged-in');
    if (isLoggedIn && JSON.parse(isLoggedIn) === true) {
      navigate("/", { replace: false, state: {} });
    }
  }, []);

  return (
      <Card className="loginCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Typography id="loginTitle">Zaloguj się</Typography>
        <Box component="form" className='loginContainer' onSubmit={handleSubmit}>
          <TextField
            autoComplete="email"
            name="email"
            required
            fullWidth
            id="email"
            label="E-mail"
            autoFocus
          />
          <TextField
            autoComplete="new-password"
            name="password"
            type="password"
            required
            fullWidth
            id="password"
            label="Password"
            autoFocus
          />
          <Button variant="contained" type="submit" sx={{ borderRadius: 10 }}>
            Zaloguj się
          </Button>
          <Link id="forgottenPassword" href="#">Nie pamiętasz hasła?</Link>
        </Box>
      </Card>
  )
}

export default Login