import strings from "../const/strings";
import { RegisterData } from "../const/types.const";

export const registerValidation = (values: RegisterData) => {
  let errors: RegisterData = {
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
  };

  [values.firstName, values.secondName, values.surname].forEach((el) => {
    if (el && !/^[a-zA-Z]+$/i.test(el)) {
      const key = Object.values(values).findIndex(value => value === el);
      errors[Object.keys(errors)[key] as keyof RegisterData] = strings.registerValidation.data;
    }
  });

  if (values.emailAddress && 
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
    errors.emailAddress = strings.registerValidation.email;
  }

  if (values.phoneNumber && 
    !/^[\d ]{9,}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = strings.registerValidation.phone;
  }

  if (values.password && values.password.length < 6) {
    errors.password = strings.registerValidation.passwordLength;
  }

  if (values.repeatPassword && values.password !== values.repeatPassword) {
    errors.repeatPassword = strings.registerValidation.password;
  }

  if (values.companyName &&
    !/^[a-zA-Z0-9-@.{}#&!()]+(\s[a-zA-Z0-9-@{}.#&!()]+)+(\s[a-zA-Z-@.#&!()]+)?$/i.test(values.companyName)) {
    errors.companyName = strings.registerValidation.company;
  }

  if (values.positionName && !/^[a-zA-Z ]+$/i.test(values.positionName)) {
    errors.positionName = strings.registerValidation.data;
  }

  const checksumsNIP = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  if (values.nip) {
    if (!/^[0-9]{10}$/i.test(values.nip)) {
      errors.nip = strings.registerValidation.nipLength;
    } else {
      let totalNIP = 0;
      checksumsNIP.forEach((checkSum, index) => {
        console.log(checkSum, parseInt(values.nip[index]));
        totalNIP += checkSum * parseInt(values.nip[index]);
      });
      errors.nip = (totalNIP % 11 === parseInt(values.nip[9])) ? '' : strings.registerValidation.nip;
    }
  }

  return errors;
}