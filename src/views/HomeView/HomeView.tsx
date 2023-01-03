import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FilledInput from '@mui/material/FilledInput';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HomeView.css';
import WorkOffer, { WorkOfferData } from '../../components/WorkOffer/WorkOffer';
import Header from '../../components/Header/Header';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('logged-in');
    navigate("/login", { replace: false, state: {} });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('logged-in');
    // if (!isLoggedIn) {
    //   navigate("/login", { replace: false, state: {} });
    // }
  }, []);

  const testOffer: WorkOfferData = {
    title: 'Test',
    description: 'Opis...',
    region: 'Warszawa, Śródmieście',
    company: {
      name: 'Firma',
      logo: 'https://spng.subpng.com/20180422/awe/kisspng-java-servlet-computer-icons-programming-language-java-5adce132b13b21.743013201524425010726.jpg',
    },
    date: 1672785010,
    isFavourite: true
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%'
    }}>
      <Header />
      <Box id="rootBox">
        <Card id="card" sx={{ boxShadow: 10 }}>
          <CardContent id="cardContent">
            <FilledInput
              name="searchPhrase"
              type="search"
              fullWidth
              id="searchPhrase"
              placeholder="Stanowisko, firma, słowo kluczowe"
              disableUnderline
              className='leftInputSide'
            />
            <FilledInput
              name="category"
              type="search"
              fullWidth
              id="category"
              placeholder="Kategoria"
              disableUnderline
            />
            <FilledInput
              name="type"
              type="search"
              fullWidth
              id="type"
              placeholder="Typ"
              disableUnderline
              className='rightInputSide'
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit" id='searchButton'>
              Szukaj
            </Button>
          </CardActions>
        </Card>
        <WorkOffer offer={testOffer} />
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
      </Box>
    </Box>
  )
}

export default Home
