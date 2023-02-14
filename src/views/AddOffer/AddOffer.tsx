import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Backdrop, Box, Button, Card, Grid, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import strings from '../../const/strings';
import { offerFormData } from '../../const/offers.const';
import './AddOffer.css';

const AddOffer = () => {
  const [bHour, setBHour] = useState<Dayjs | null>(null);
  const [eHour, setEHour] = useState<Dayjs | null>(null);

  const sendOffer = () => {};

  const gridElement = (el: any) => {
    return (
      <TextField
        required
        rows={5}
        key={el.name}
        name={el.name}
        label={el.label}
        className='regFormField'
        multiline={el.multiline}
        sx={{ width: el.halfSize ? '44%' : '90%' }}
        type={el.name.toLowerCase().includes('password') ? 'password' : ''}
      />
    )
  };

  const timeElement = (params: any) => <TextField sx={{ width: '48%', marginTop: '5px' }} {...params} />;

  return (
    <Backdrop open className="registerBackground">
      <Card id="addOfferCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid container id="addOfferContainer" component="form" onSubmit={sendOffer}>
          {Object.values(offerFormData.column).map((el) => gridElement(el))}
          <Box id="timeContainer">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Godzina rozpoczęcia pracy"
                value={bHour}
                onChange={(newValue) => setBHour(newValue)}
                renderInput={timeElement}
              />
              <TimePicker
                label="Godzina zakończenia pracy"
                value={eHour}
                onChange={(newValue) => setEHour(newValue)}
                renderInput={timeElement}
              />
            </LocalizationProvider>
          </Box>
          <Button variant="contained" type="submit" id="addOfferButton">
            {strings.addOffer.button}
          </Button>
        </Grid>
      </Card>
    </Backdrop>
  )
}

export default AddOffer
