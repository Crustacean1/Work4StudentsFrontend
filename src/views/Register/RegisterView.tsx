import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import './RegisterView.css';

const Register = () => {
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

  return (
      <Card className="registerCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Typography id="registerTitle">Zarejestruj się</Typography>
        <Box component="form" className='registerContainer' onSubmit={handleSubmit}>
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
            Stwórz konto
          </Button>
        </Box>
      </Card>
  )
}

export default Register
