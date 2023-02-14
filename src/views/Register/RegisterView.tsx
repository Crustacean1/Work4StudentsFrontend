import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Backdrop, Box, Button, Card, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import strings from '../../const/strings';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../const/types.const';
import { AccountTypes, data } from '../../const/register.const';
import { registerValidation } from '../../utils/registerValidation';
import './RegisterView.css';
import { countries } from '../../const/countries.const';

const Register = () => {
  const [accountType, setAccountType] = useState<AccountTypes>(AccountTypes.Student);
  const [errorList, setErrorList] = useState<any>({});

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: any[]) => {
    const isStudent = accountType === AccountTypes.Student;
    const type = isStudent ? 'student' : 'employer';
    const studentFilter = ['nip', 'companyName', 'positionName'];
    const filter = ['repeatPassword'].concat(isStudent ? studentFilter : []);

    const registerData = Array.from(data)
      .filter(el => !filter.includes(el[0]))
      .map(el => {
        return `"${el[0]}": "${el[1]}"`;
      });
    
    const registered = await auth.register(JSON.parse('{' + registerData + '}'), type);
    if (registered) navigate("/login", { replace: false });
  };

  const validate = (values: RegisterData) => {
    let errors = registerValidation(values);

    setErrorList(errors);
    return Object.values(errors).filter((error: any) => error).length ? errors : {};
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      surname: '',
      phoneNumber: '',
      emailAddress: '',
      country: '',
      city: '',
      companyName: '',
      nip: '',
      positionName: '',
      password: '',
      repeatPassword: '',
      region: '',
      street: '',
      building: '',
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(Object.entries(values));
    },
  });

  const dropdownElement = (el: any) => {
    return (
      <Autocomplete
        id="country"
        key={el.name}
        onChange={(_, value) => formik.setFieldValue('country', value?.label)}
        sx={{ width: '100%', margin: '10px' }}
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
            onChange={(event) => formik.setFieldValue('country', event.target.value)}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />
    );
  };

  const gridElement = (column: any[]) => {
    return (
      <Grid item xs={12 / Object.keys(data.columns).length - 1}>
        {column.map((el: any) => {
          if (el.name === 'country') return dropdownElement(el);
          return (!el.type || el.type && accountType === el.type) ? (
            <TextField
              type={el.name.toLowerCase().includes('password') ? 'password' : ''}
              className='regFormField'
              name={el.name}
              required={!el.optional}
              fullWidth
              label={el.label}
              onChange={formik.handleChange}
              error={!!errorList[el.name]}
            />
          ) : null
        })}
      </Grid>
    )
  };

  return (
    <Backdrop open className="registerBackground">
      <Card id="regFormCard" sx={{ boxShadow: 12, borderRadius: 10 }}>
        <Grid
          container
          direction="row"
        >
          <Grid item xs={3}>
            <Select
              id="selector"
              sx={{ width: '90%', borderRadius: '25px' }}
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountTypes)}
            >
              <MenuItem value={AccountTypes.Student}>{strings.registerView.student}</MenuItem>
              <MenuItem value={AccountTypes.Company}>{strings.registerView.company}</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center' id="regFormTitle">{strings.registerView.title}</Typography>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container component="form" id="regFormContainer" onSubmit={formik.handleSubmit}>
          <Grid id='regFormInputs'>
            {Object.values(data.columns).map((column) => gridElement(column))}
          </Grid>
          <Button variant="contained" type="submit" id="regFormButton">
            {strings.registerView.createAccount}
          </Button>
        </Grid>
      </Card>
      <Typography id="logo">{strings.registerView.logo}</Typography>
    </Backdrop>
  )
}

export default Register
