import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useLocation, useNavigate } from 'react-router-dom';
import strings from '../../const/strings';
import { UserType, useStore } from '../../stores/store';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const auth = useAuth();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    auth.logout();
    navigate("/login", { replace: false, state: {} });
  };

  const headerButton = (label: string, onClick: () => void) => (
    <Button color="inherit" className='headerButton' onClick={onClick}>
      {label}
    </Button>
  );

  const isAdmin = store.userType === UserType.Admin;

  return (
    <AppBar position="absolute" id="header">
      <Toolbar>
        <Avatar
          id="headerLogo"
          onClick={() => { location.pathname !== '/' && navigate('/') }}
          alt={strings.header.avatarText}
          src="https://spng.subpng.com/20180422/awe/kisspng-java-servlet-computer-icons-programming-language-java-5adce132b13b21.743013201524425010726.jpg"
        />
        {!isAdmin && auth.token && (
          <>
            {location.pathname.includes('profile') ? (
              <>
                {
                  location.pathname !== '/edit-profile' 
                    ? headerButton(strings.header.editProfile, () => navigate('/edit-profile'))
                    : headerButton(strings.header.myProfile, () => navigate('/profile'))
                }
                {headerButton(strings.header.mainPage, () => navigate('/'))}
              </>
            ) : (
              <>
                {headerButton(strings.header.myProfile, () => navigate('/profile'))}
                {headerButton(strings.header.logout, handleLogout)}
              </>
            )}
            
          </>
        )} 
        {!isAdmin && !auth.token && (
          <>
            {headerButton(strings.header.createAccount, () => navigate("/register"))}
            {headerButton(strings.header.login, () => navigate("/login"))}
          </>
        )}
        {isAdmin && (
          <>
          {headerButton(strings.header.createAccount, () => navigate("/admin-panel"))}
          {headerButton(strings.header.logout, handleLogout)}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header