import strings from "../const/strings";
import { countries } from "../const/countries.const";
import { EditProfileData } from "../const/types.const";
import { Dayjs } from "dayjs";

export const editProfileValidation = 
  (values: EditProfileData, workingHours: { begin: Dayjs; end: Dayjs; }[]) => {
  let errors: EditProfileData = {
    Description: '',
    Education: '',
    PhoneNumber: '',
    PositionName: '',
    EmailAddress: '',
    Experience: '',
    Country: '',
    Region: '',
    City: '',
    Street: '',
    Building: '',
    Availability: '',
    ResumeFile: '',
    Image: '',
  };

  [values.Education, values.Region, values.City].forEach((el) => {
    if (el && !/^[\s\p{L}]+$/iu.test(el)) {
      const key = Object.values(values).findIndex(value => value === el);
      errors[Object.keys(errors)[key] as keyof EditProfileData] = strings.registerValidation.data;
    }
  });

  [values.Description].forEach((el) => {
    if (el && !/^[\s\p{L}\d]+$/iu.test(el)) {
      const key = Object.values(values).findIndex(value => value === el);
      errors[Object.keys(errors)[key] as keyof EditProfileData] = strings.registerValidation.data;
    }
  });

  if (values.Country && 
    !countries.filter((country) => country.label === values.Country).length) {
    errors.Country = strings.registerValidation.data;
  }

  if (values.PhoneNumber && 
    !/^[\d ]{9,}$/i.test(values.PhoneNumber)) {
    errors.PhoneNumber = strings.registerValidation.phone;
  }

  if (values.EmailAddress && 
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.EmailAddress)) {
    errors.EmailAddress = strings.registerValidation.email;
  }

  workingHours.forEach((el) => {
    if (el.begin.format('HH:mm:ss') === 'Invalid Date' 
      || el.end.format('HH:mm:ss') === 'Invalid Date') errors.Availability = strings.registerValidation.data;
  });

  return errors;
}