import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Autocomplete, Backdrop, Box, Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import strings from '../../const/strings';
import { emptyAvailability, offerFormData } from '../../const/offers.const';
import './AddOffer.css';
import { useFormik } from 'formik';
import { AddOfferData } from '../../const/types.const';
import { addOfferValidation } from '../../utils/addOfferValidation';
import { countries } from '../../const/countries.const';
import { createOffer } from '../../functions/createOffer';
import { useNavigate } from 'react-router-dom';
import TimePickerElement from '../../components/TimePickerElement';

const AddOffer = () => {
  const [availability, setAvailability] = useState<{ begin: Dayjs; end: Dayjs; }[]>(emptyAvailability());
  const [errorList, setErrorList] = useState<any>({});
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const navigate = useNavigate();

  const sendOffer = async (data: any[]) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const availabilityData: { DayOfWeek: number; StartHour: number; Duration: number; }[] = [];
    availability.forEach((el) => {
      availabilityData.push({
        DayOfWeek: el.begin.day(),
        StartHour: el.begin.hour(),
        Duration: el.end.hour() - el.begin.hour()
      });
    });

    const offerData = Array.from(data)
      .map(el => {
        return `"${el[0]}": "${el[1]}"`;
      });
    
    const JSONdata = JSON.parse('{' + offerData + '}');
    JSONdata.workingHours = availabilityData;
    
    await createOffer(JSONdata).then(response => {
      setIsProcessing(false);
      if (!Array.isArray(response)) navigate('/');
    });
    setIsProcessing(false);
  };

  const validate = (values: AddOfferData) => {
    let errors = addOfferValidation(values, availability);

    setErrorList(errors);
    return Object.values(errors).filter((error: any) => error).length ? errors : {};
  }

  const offerFormik = useFormik({
    initialValues: {
      role: '',
      city: '',
      title: '',
      street: '',
      building: '',
      region: '',
      country: '',
      description: '',
      payrangeMin: '',
      payrangeMax: '',
    },
    validate,
    onSubmit: (values) => {
      sendOffer(Object.entries(values));
    },
  });

  const dropdownElement = (el: any) => {
    return (
      <Autocomplete
        id="country"
        key={el.name}
        onChange={(_, value) => offerFormik.setFieldValue('country', value?.label)}
        sx={{ width: el.halfSize ? '44%' : '90%', margin: 'auto', marginLeft: '10px', marginRight: '10px' }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            name={el.name}
            label={el.label}
            error={!!errorList[el.name]}
            onChange={(event) => offerFormik.setFieldValue('country', event.target.value)}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />
    );
  };

  const gridElement = (el: any) => {
    if (el.name === 'country') return dropdownElement(el);
    return (
      <TextField
        rows={5}
        key={el.name}
        name={el.name}
        label={el.label}
        required={!el.optional}
        className='regFormField'
        multiline={el.multiline}
        error={!!errorList[el.name]}
        onChange={offerFormik.handleChange}
        sx={{ width: el.halfSize ? '44%' : '90%', margin: 'auto' }}
        type={el.name.toLowerCase().includes('password') ? 'password' : ''}
      />
    )
  };

  const onBeginChange = (newValue: Dayjs | null, id: number) => {
    const newAvailability = [...availability];
    if (newValue) newAvailability[id].begin = newValue;
    setAvailability(newAvailability);
  };

  const onEndChange = (newValue: Dayjs | null, id: number) => {
    const newAvailability = [...availability];
    if (newValue) newAvailability[id].end = newValue;
    setAvailability(newAvailability);
  };

  return (
    <Backdrop open className="registerBackground">
      <Card id="addOfferCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid container id="addOfferContainer" component="form" onSubmit={offerFormik.handleSubmit}>
          {Object.values(offerFormData.column).map((el) => gridElement(el))}
          <Typography width={'95%'} marginY={1}>Godziny preferowanej dostępności:</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {Object.values(offerFormData.days).map((el) => 
              <TimePickerElement
                id={el.id}
                key={el.id}
                name={el.name}
                begin={availability[el.id].begin}
                end={availability[el.id].end}
                onBeginChange={onBeginChange}
                onEndChange={onEndChange}
              />
            )}
          </LocalizationProvider>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" type="submit" id="addOfferButton">
              {isProcessing && <CircularProgress id="offerSpinner" size={25} color='inherit' />}
              {!isProcessing && strings.addOffer.button}
            </Button>
          </Box>
        </Grid>
      </Card>
    </Backdrop>
  )
}

export default AddOffer
