import { Backdrop, Card } from '@mui/material';
import './ProfileEdit.css';

const ProfileEdit = () => {
  return (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>

      </Card>
    </Backdrop>
  )
}

export default ProfileEdit
