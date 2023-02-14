import { useState } from 'react';
import { Avatar, Backdrop, Box, Card, Rating, Typography } from '@mui/material';
import strings from '../../const/strings';
import { data } from '../../const/register.const';
import { imgDefault } from '../../const/profileForm.const';
import './ProfileView.css';

const tempData = {
  firstName: 'Jan',
  secondName: 'Albert',
  surname: 'Kowalski',
  phoneNumber: '123 456 789',
  emailAddress: 'abc@polsl.pl'
};

const Profile = () => {
  const [rating, setRating] = useState<number>(4.3);

  const profileElement = (item: { name: string[]; label: string; }) => {
    let value = '';
    item.name.map((el, index) => {
      const key = Object.keys(tempData).findIndex(value => value === el);
      value += `${Object.values(tempData)[key]}${(index !== item.name.length - 1) ? ' ' : ''}`
    });

    return (
      <Typography key={item.label} variant="h6" gutterBottom>
        {item.label}: {value}
      </Typography>
    );
  };

  return (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Box id="profileHeader">
          <Avatar id="profilePic" alt="Profile Picture" src={imgDefault} />
          <Box>
            <Rating 
              name="read-only"
              size="large"
              getLabelText={(value) => `${value}`}
              value={rating}
              precision={0.1}
              readOnly />
            {rating !== null && (
              <Box sx={{ ml: 2, marginLeft: '12px' }}>
                {`${strings.profileView.meanScore} ${rating}`}
              </Box>
            )}
          </Box>
        </Box>
        {data.profile.info.map((item) => profileElement(item))}
      </Card>
    </Backdrop>
  )
}

export default Profile
