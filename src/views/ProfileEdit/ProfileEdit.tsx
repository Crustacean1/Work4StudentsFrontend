import { useRef, useState } from 'react';
import { Autocomplete, Avatar, Backdrop, Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import strings from '../../const/strings';
import { imgDefault, profileFormData } from '../../const/profileForm.const';
import './ProfileEdit.css';
import { useFormik } from 'formik';
import { countries } from '../../const/countries.const';
import { EditProfileData, EditProfilePayload } from '../../const/types.const';
import { editProfileValidation } from '../../utils/editProfileValidation';
import { editProfile } from '../../functions/editProfile';
import { getBase64 } from '../../utils/base64';

const ProfileEdit = () => {
  const [avatarSrc, setAvatarSrc] = useState<string>(imgDefault);
  const [errorList, setErrorList] = useState<any>({});

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
    const profileData = Array.from(data)
      .map(el => {
        return `"${el[0]}": "${el[1]}"`;
      });
    const JSONdata = JSON.parse('{' + profileData + '}');
    const dataArray = Array.from(data);

    getBase64(dataArray.find(el => el[0] === "ResumeFile")[1], (res: any) => {
      JSONdata.ResumeFile = res;
      getBase64(dataArray.find(el => el[0] === "Image")[1], async (res: any) => {
        JSONdata.Image = res;
        await editProfile(JSONdata);
      });
    });
  };

  const validate = (values: EditProfilePayload) => {
    let errors = editProfileValidation(values);

    setErrorList(errors);
    return Object.values(errors).filter((error: any) => error).length ? errors : {};
  }

  const profileFormik = useFormik({
    initialValues: {
      Description: '',
      Education: '',
      PhoneNumber: '',
      EmailAddress: '',
      Experience: '',
      Country: '',
      Region: '',
      City: '',
      Street: '',
      Building: '',
      Availability: null,
      ResumeFile: '',
      Image: ''
    },
    validate,
    onSubmit: (values) => {
      callForEdit(Object.entries(values));
    },
  });

  const dropdownElement = (el: any) => {
    return (
      <Autocomplete
        id="country"
        key={el.name}
        onChange={(_, value) => profileFormik.setFieldValue('Country', value?.label)}
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
    return (
      <TextField
        required={!el.optional}
        rows={5}
        name={el.name}
        label={el.label}
        className='regFormField'
        multiline={el.multiline}
        error={!!errorList[el.name]}
        onChange={profileFormik.handleChange}
        sx={{ width: el.halfSize ? '44%' : '90%' }}
        type={el.name.toLowerCase().includes('password') ? 'password' : ''}
      />
    )
  };

  return (
    <Backdrop open className="registerBackground">
      <Card id="editProfileCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid container id="addOfferContainer" component="form" onSubmit={profileFormik.handleSubmit}>
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
              name="ResumeFile"
              onChange={uploadCV}
            />
          </Box>
          <Button variant="contained" type="submit" id="addOfferButton">
            Aktualizuj profil
          </Button>
        </Grid>
      </Card>
    </Backdrop>
  )
}

export default ProfileEdit
