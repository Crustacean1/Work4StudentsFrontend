
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType, useStore } from '../../stores/store';
import { deleteAccount } from '../../functions/deleteAccount';
import './UserCard.css';

const UserCard = ({ user }: { user: any }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const store = useStore();
  const navigate = useNavigate();

  const deleteUser = 
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (isProcessing) return;
    setIsProcessing(true);

    const shouldDelete = confirm("Czy na pewno chcesz usunąć konto?");
    if (shouldDelete) await deleteAccount(id).then(response => {
      if (!Array.isArray(response)) setIsDeleted(true);
    });;

    setIsProcessing(false);
  };

  const isAdmin = user.userType === UserType.Admin;

  const navToProfile = () => {
    if (!isAdmin) navigate(`/profile/${user.userType}/${user.userId}`);
  };

  return isDeleted ? null : (
    <Card id={isAdmin ? "adminUserCard" : "userCard"} sx={{ boxShadow: 10 }} onClick={navToProfile}>
      <CardContent id="userCardContent">
        <Typography id="userTitle" gutterBottom>
          {user.firstName} {user.secondName} {user.surname}
        </Typography>
        <Typography id="userDesc">
          Typ użytkownika: {user.userType}
        </Typography>
      </CardContent>
      {!isAdmin && (
        <IconButton id="deleteButton" onClick={(e) => deleteUser(e, user.userId)}>
          <HighlightOffIcon />
        </IconButton>
      )}
    </Card>
  )
}

export default UserCard