import './RegisterView.css';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Grid, MenuItem, Select} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { AccountTypes, data } from '../../const/register.const';

export type Register = {
  firstName: string;
  secondName: string;
  surname: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  repeatPassword: string;
}

const Register = () => {
  const [accountType, setAccountType] = useState<AccountTypes>(AccountTypes.Student);
  const [errorList, setErrorList] = useState<any>({});

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: any[]) => {
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);

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

  const validate = (values: Register) => {
    let errors: Register = {
      firstName: '',
      secondName: '',
      surname: '',
      phoneNumber: '',
      emailAddress: '',
      password: '',
      repeatPassword: ''
    };

    [values.firstName, values.secondName, values.surname].forEach((el) => {
      if (el && !/^[a-zA-Z]+$/i.test(el)) {
        const key = Object.values(values).findIndex(value => value === el);
        errors[Object.keys(errors)[key] as keyof Register] = 'Niewłaściwe dane';
      }
    });

    if (values.emailAddress && 
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
      errors.emailAddress = 'Niepoprawny adres e-mail';
    }

    if (values.phoneNumber && 
      !/^[\d ]{9,}$/i.test(values.phoneNumber)) {
      errors.phoneNumber = 'Niepoprawny numer telefonu';
    }

    if (values.password && values.password.length < 6) {
      errors.password = 'Za krótkie hasło';
    }

    if (values.repeatPassword && values.password !== values.repeatPassword) {
      errors.repeatPassword = 'Hasła niezgodne';
    }
  
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
              required
              fullWidth
              label={el.label}
              onChange={formik.handleChange}
              error={errorList[el.name]}
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
              sx={{ width: '90%', margin: '5px', borderRadius: '25px' }}
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as AccountTypes)}
            >
              <MenuItem value={AccountTypes.Student}>Student</MenuItem>
              <MenuItem value={AccountTypes.Company}>Pracodawca</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography align='center' id="regFormTitle">Zarejestruj się</Typography>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Grid container component="form" id="regFormContainer" onSubmit={formik.handleSubmit}>
          <Grid id='regFormInputs'>
            {Object.values(data.columns).map((column) => gridElement(column))}
          </Grid>
          <Button variant="contained" type="submit" sx={{ width: '20%', minWidth: '100px', marginTop: '20px', borderRadius: 10, fontFamily: 'revert', alignSelf: 'center' }}>
            Stwórz konto
          </Button>
        </Grid>
      </Card>
      <Typography id="logo">w4s.com</Typography>
    </Backdrop>
  )
}

export default Register
