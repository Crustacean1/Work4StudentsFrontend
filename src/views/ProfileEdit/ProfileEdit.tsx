import { useState } from 'react';
import { Avatar, Backdrop, Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import strings from '../../const/strings';
import { imgDefault, profileFormData } from '../../const/profileForm.const';
import './ProfileEdit.css';

const ProfileEdit = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>(imgDefault);

  const previewImg = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadCV = (event: any) => {
    console.log(event);
  };

  const gridElement = (el: any) => {
    return (
      <TextField
        required={!el.optional}
        rows={5}
        name={el.name}
        label={el.label}
        className='regFormField'
        multiline={el.multiline}
        sx={{ width: el.halfSize ? '44%' : '90%' }}
        type={el.name.toLowerCase().includes('password') ? 'password' : ''}
      />
    )
  };

  return (
    <Backdrop open className="registerBackground">
      <Card id="editProfileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid container id="addOfferContainer" component="form" onSubmit={() => {}}>
          <Box id="editPicContainer">
            <Avatar id="editPic" alt="Profile picture" src={imgDefault} srcSet={avatarSrc} />
            <Button
              variant="contained"
              component="label"
            >
              {strings.profileForm.sendImg}
              <input
                accept="image/*"
                type="file"
                hidden
                onChange={previewImg}
              />
            </Button>
          </Box>
          {Object.values(profileFormData.column).map((el) => gridElement(el))}
          <Box id="editCV">
            <Typography>{strings.profileForm.CV}</Typography>
            <input
              accept=".pdf,.doc,.docx"
              type="file"
              onChange={uploadCV}
            />
          </Box>
        </Grid>
        <Button variant="contained" type="submit" id="addOfferButton">
          Aktualizuj profil
        </Button>
      </Card>
    </Backdrop>
  )
}

export default ProfileEdit
