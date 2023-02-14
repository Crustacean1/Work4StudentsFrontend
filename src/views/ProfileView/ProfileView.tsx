import { useEffect, useState } from 'react';
import { Avatar, Backdrop, Box, Card, Rating, Typography } from '@mui/material';
import strings from '../../const/strings';
import { useStore } from '../../stores/store';
import { data } from '../../const/register.const';
import { ProfileData } from '../../const/types.const';
import { getProfile } from '../../functions/getProfile';
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
  const [profileData, setProfileData] = useState<ProfileData>();

  const store = useStore();

  const profileElement = (item: { name: string[]; label: string; delimiter?: any[]; }) => {
    let value = '';
    item.name.map((el, index) => {
      const key = Object.keys(profileData ?? {}).findIndex(value => value === el);
      value += `${Object.values(profileData ?? {})[key]}${
        (item.delimiter && item.delimiter[index]) ? item.delimiter[index] : ''
      }
      ${(index !== item.name.length - 1) ? ' ' : ''}`
    });

    return (
      <Typography key={item.label} variant="h6" gutterBottom>
        {item.label}: {value}
      </Typography>
    );
  };

  const test = async () => {
    const data = await getProfile();
    console.log(data);
    setProfileData(data);
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Box id="profileHeader">
          <Avatar id="profilePic" alt="Profile Picture" src={profileData?.photo ?? imgDefault} />
          <Box>
            <Rating 
              name="read-only"
              size="large"
              getLabelText={(value) => `${value}`}
              value={profileData?.rating ?? 0}
              precision={0.1}
              readOnly />
            {profileData?.rating !== null && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {`${strings.profileView.meanScore} ${profileData?.rating}`}
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
