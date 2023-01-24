import { Backdrop, Box, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginData, useAuth } from '../../contexts/AuthContext';
import './LoginView.css';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const redirect = location.state?.path || '/';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const navData: LoginData = {
      emailAddress: data.get('email')?.toString() || '',
      password: data.get('password')?.toString() || '',
    };
    const loggedIn = await auth.login(navData);
    if (loggedIn) navigate(redirect, { replace: true });
  };

  return (
    <Backdrop open className="loginBackground">
      <Typography id="loginLogo">w4s</Typography>
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
    </Backdrop>
  )
}

export default Login