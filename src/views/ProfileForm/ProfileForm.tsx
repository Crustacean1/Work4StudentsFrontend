import './ProfileForm.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Avatar, Backdrop, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const imgDefault = '/static/images/avatar/1.jpg';
const radioDefault = 'student';

const ProfileForm = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>(imgDefault);
  const [accountType, setAccountType] = useState<string>(radioDefault);

  const navigate = useNavigate();

  const radioRef = useRef<typeof RadioGroup>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    // TODO: Do smth with the data

    // navigate("/", { replace: false });
  };

  const previewImg = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadCV = (event: any) => {
    console.log(event);
  };

  return (
    <Backdrop open className="registerBackground">
      <Card className="registerCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Typography id="registerTitle">Zanim przejdziesz dalej...</Typography>
        <Box sx={{ overflow: 'auto' }} component="form" id='profileFormContainer' onSubmit={handleSubmit}>
          <FormControl sx={{ width: '100%' }}>
            <FormLabel id="radioLabel">Rodzaj użytkownika:</FormLabel>
            <RadioGroup
              aria-labelledby="radioLabel"
              defaultValue={radioDefault}
              name="userType"
              onChange={(_, value) => setAccountType(value)}
              row
              ref={radioRef}
            >
              <FormControlLabel value="student" control={<Radio />} label="Student" />
              <FormControlLabel value="entrepreneur" control={<Radio />} label="Pracodawca" />
              <FormControlLabel value="company" control={<Radio />} label="Firma" />
            </RadioGroup>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Avatar id="pic" alt="Remy Sharp" src="/static/images/avatar/1.jpg" srcSet={avatarSrc} />
              <Button
                variant="contained"
                component="label"
              >
                Wyślij zdjęcie
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={previewImg}
                />
              </Button>
            </Box>
          </FormControl>
          <TextField
            autoComplete="none"
            name="description"
            fullWidth
            id="desc"
            label="Opis"
            autoFocus
            multiline
            rows={4}
          />
          {accountType === 'student' && (
            <Box>
              <Typography>Twoje CV:</Typography>
              <input
                accept=".pdf,.doc,.docx"
                type="file"
                onChange={uploadCV}
              />
            </Box>
          )}
          <Button variant="contained" type="submit" sx={{ alignSelf: 'center', borderRadius: 10, fontFamily: 'revert' }}>
            Kontynuuj
          </Button>
        </Box>
      </Card>
      <Typography id="logo">w4s.com</Typography>
    </Backdrop>
  )
}

export default ProfileForm
