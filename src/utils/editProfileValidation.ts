import { countries } from "../const/countries.const";
import strings from "../const/strings";
import { EditProfileData, EditProfilePayload } from "../const/types.const";

export const editProfileValidation = (values: EditProfilePayload) => {
  let errors: EditProfileData = {
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
    Availability: '',
    ResumeFile: ''
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

  if(!values.ResumeFile) errors.ResumeFile = strings.registerValidation.data;

  errors.Availability = '';

  return errors;
}