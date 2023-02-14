import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, Card, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import strings from '../../const/strings';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../const/types.const';
import { AccountTypes, data } from '../../const/register.const';
import { registerValidation } from '../../utils/registerValidation';
import './RegisterView.css';

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
      companyName: '',
      nip: '',
      positionName: '',
      password: '',
      repeatPassword: ''
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(Object.entries(values));
    },
  })

  const gridElement = (column: any[]) => {
    return (
      <Grid item xs={12 / Object.keys(data.columns).length - 1}>
        {column.map((el: any) => 
          (!el.type || el.type && accountType === el.type) ? (
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
        )}
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
