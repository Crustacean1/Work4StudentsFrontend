import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="absolute" id="header">
      <Toolbar>
        <Avatar
          id="headerLogo"
          alt="The website's logo."
          src="https://spng.subpng.com/20180422/awe/kisspng-java-servlet-computer-icons-programming-language-java-5adce132b13b21.743013201524425010726.jpg"
        />
        <Button color="inherit" className='headerButton' onClick={() => navigate("/register")}>
          Załóż konto
        </Button>
        <Button color="inherit" className='headerButton' onClick={() => navigate("/login")}>
          Zaloguj się
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header