import { useEffect, useState } from 'react';
import { Autocomplete, Avatar, Backdrop, Box, Button, Card, CircularProgress, 
  Grid, TextField, Typography } from '@mui/material';
import strings from '../../const/strings';
import { imgDefault, profileFormData } from '../../const/profileForm.const';
import './ProfileEdit.css';
import { useFormik } from 'formik';
import { countries, CountryType } from '../../const/countries.const';
import { EditProfileData, ProfileData } from '../../const/types.const';
import { editProfileValidation } from '../../utils/editProfileValidation';
import { editProfile } from '../../functions/editProfile';
import { getBase64 } from '../../utils/base64';
import { UserType, useStore } from '../../stores/store';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../functions/getProfile';
import { DataURIToBlob } from '../../utils/DataURIToBlob';
import { getImage } from '../../functions/getImage';
import { deleteResume } from '../../functions/deleteResume';
import { emptyAvailability, offerFormData } from '../../const/offers.const';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TimePickerElement from '../../components/TimePickerElement';

const ProfileEdit = () => {
  const [errorList, setErrorList] = useState<any>({});
  const [avatarSrc, setAvatarSrc] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileData>();
  const [countryValue, setCountryValue] = useState<CountryType | null>(countries[0]);
  const [availability, setAvailability] = useState<{ begin: Dayjs; end: Dayjs; }[]>(emptyAvailability());
  const [countryInput, setCountryInput] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('');

  const store = useStore();
  const navigate = useNavigate();

  const previewImg = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      profileFormik.setFieldValue('Image', event.target.files[0]);
      setAvatarSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const uploadCV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ? event.target.files : []);
    if (files) profileFormik.setFieldValue('ResumeFile', files[0]);
  };

  const callForEdit = async (data: any[]) => {
    const availabilityData: { DayOfWeek: number; StartHour: number; Duration: number; }[] = [];
    availability.forEach((el) => {
      availabilityData.push({
        DayOfWeek: el.begin.day(),
        StartHour: el.begin.hour(),
        Duration: el.end.hour() - el.begin.hour()
      });
    });

    const profileArray = Array.from(data)
      .map(el => {
        return `"${el[0]}": "${el[1]}"`;
      });
    const JSONdata = JSON.parse('{' + profileArray + '}');
    JSONdata.availability = availabilityData;
    const dataArray = Array.from(data);

    // Additional data for BE reasons
    JSONdata.FirstName = profileData?.firstName || '';
    JSONdata.SecondName = profileData?.secondName || '';
    JSONdata.Surname = profileData?.surname || '';

    getBase64(dataArray.find(el => el[0] === "ResumeFile")[1], (res: any) => {
      JSONdata.ResumeFile = res ? DataURIToBlob(res) : '';
      getBase64(dataArray.find(el => el[0] === "Image")[1], async (res: any) => {
        JSONdata.Image = res ? DataURIToBlob(res) : '';
        await editProfile(JSONdata).then(response => {
          if (!Array.isArray(response)) navigate('/profile');
        });
      });
    });   
  };

  const getProfileData = async () => {
    const newData = await getProfile();

    profileFormik.initialValues = {
      Description: newData?.description || '',
      Education: newData?.education || '',
      PhoneNumber: newData?.phoneNumber || '',
      EmailAddress: newData?.emailAddress || '',
      Experience: newData?.experience || '',
      PositionName: newData?.positionName || '',
      Country: newData?.country || '',
      Region: newData?.region || '',
      City: newData?.city || '',
      Street: newData?.street || '',
      Building: newData?.building || '',
      Availability: newData?.availability || [],
      ResumeFile: newData?.resume || '',
      Image: newData?.photo || ''
    };

    const country = countries.filter((country) => country.label === newData?.country)[0];

    if (country) {
      setCountryValue(country);
      setCountryInput(country?.label);
    }
    setProfileData(newData);
  };

  const getProfilePic = async () => {
    const newPic = await getImage();
    if (newPic.photo) setProfilePic(newPic.photo);
    else setAvatarSrc(imgDefault);
  };

  useEffect(() => {
    getProfileData();
    getProfilePic();
  }, []);

  const validate = (values: EditProfileData) => {
    let errors = editProfileValidation(values, availability);

    setErrorList(errors);
    return Object.values(errors).filter((error: any) => error).length ? errors : {};
  }

  const profileFormik = useFormik({
    initialValues: {
      Description: profileData?.description || '',
      Education: profileData?.education || '',
      PhoneNumber: profileData?.phoneNumber || '',
      EmailAddress: profileData?.emailAddress || '',
      Experience: profileData?.experience || '',
      PositionName: profileData?.positionName || '',
      Country: profileData?.country || '',
      Region: profileData?.region || '',
      City: profileData?.city || '',
      Street: profileData?.street || '',
      Building: profileData?.building || '',
      Availability: profileData?.availability?.toString() || '',
      ResumeFile: profileData?.resume || '',
      Image: profileData?.photo || ''
    },
    validate,
    onSubmit: (values) => {
      callForEdit(Object.entries(values));
    },
    enableReinitialize: true,
  });

  const dropdownElement = (el: any) => {
    return (
      <Autocomplete
        id="country"
        key={el.name}
        sx={{ width: el.halfSize ? '44%' : '90%', margin: '10px' }}
        options={countries}
        value={countryValue}
        onChange={(_, value) => {
          profileFormik.setFieldValue('Country', value?.label);
          if (value) setCountryValue(value);
        }}
        inputValue={countryInput}
        onInputChange={(_, newInputValue) => {
          setCountryInput(newInputValue);
        }}
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
            onChange={(event) => profileFormik.setFieldValue('Country', event.target.value)}
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
    if (el.name.toLowerCase() === 'country') return dropdownElement(el);
    return el.type === undefined || el.type !== undefined && (store.userType === el.type || store.userType === UserType.Admin) 
    ? (
      <TextField
        rows={5}
        key={el.name}
        name={el.name}
        label={el.label}
        required={!el.optional}
        className='regFormField'
        multiline={el.multiline}
        error={!!errorList[el.name]}
        onChange={profileFormik.handleChange}
        sx={{ width: el.halfSize ? '44%' : '90%' }}
        type={el.name.toLowerCase().includes('password') ? 'password' : ''}
        // @ts-ignore
        value={profileFormik.values[el.name]}
      />
    ) : null
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

  return profileData ? (
    <Backdrop open className="registerBackground">
      <Card id="editProfileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid container id="addOfferContainer" component="form" onSubmit={profileFormik.handleSubmit}>
          <Box id="editPicContainer">
            <Avatar id="editPic" alt="Profile picture" src={avatarSrc ? avatarSrc : `data:image/jpeg;base64,${profilePic}`} />
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
          {store.userType === UserType.Student && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography id="timeTitle">Twoja dostępność:</Typography>
              {Object.values(offerFormData.days).map((el) => 
                <TimePickerElement
                  id={el.id}
                  key={el.id}
                  name={el.name}
                  begin={availability[el.id].begin}
                  end={availability[el.id].end}
                  labelSX={{ width: '48%', marginTop: '5px', marginRight: '15px' }}
                  containerId="profileDateContainer"
                  onBeginChange={onBeginChange}
                  onEndChange={onEndChange}
                />
              )}
            </LocalizationProvider>
          )}
          {store.userType === UserType.Student && (
            <Box id="editCV">
              <div>
                <Typography>{strings.profileForm.CV}</Typography>
                <input
                  accept=".pdf"
                  type="file"
                  name="ResumeFile"
                  onChange={uploadCV}
                />
              </div>
              {profileData?.resume && (
                <Button variant="contained" color="error" onClick={async () => { await deleteResume() }}>
                  Usuń obecne CV
                </Button>
              )}
            </Box>
          )}
          <Button variant="contained" type="submit" id="addOfferButton">
            Aktualizuj profil
          </Button>
        </Grid>
      </Card>
    </Backdrop>
  ) : (
    <Backdrop open className="registerBackground">
      <Card id="profileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <CircularProgress id="spinner" />
      </Card>
    </Backdrop>
  );
}

export default ProfileEdit
