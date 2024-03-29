import { Dayjs } from "dayjs";
import { countries } from "../const/countries.const";
import strings from "../const/strings";
import { AddOfferData } from "../const/types.const";

export const addOfferValidation = 
  (values: AddOfferData, workingHours: { begin: Dayjs; end: Dayjs; }[]) => {
  let errors: AddOfferData = {
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
    time: '',
  };

  [values.title, values.role, values.country, values.region,
    values.city].forEach((el) => {
    if (el && !/^[\s\p{L}]+$/iu.test(el)) {
      const key = Object.values(values).findIndex(value => value === el);
      errors[Object.keys(errors)[key] as keyof AddOfferData] = strings.registerValidation.data;
    }
  });

  [values.payrangeMin, values.payrangeMax].forEach((el) => {
    if (el && !/^[0-9.]+$/i.test(el)) {
      const key = Object.values(values).findIndex(value => value === el);
      errors[Object.keys(errors)[key] as keyof AddOfferData] = strings.registerValidation.data;
    }
  });

  if (values.country && 
    !countries.filter((country) => country.label === values.country).length) {
    errors.country = strings.registerValidation.data;
  }

  if (values.payrangeMin && values.payrangeMax && Number(values.payrangeMin) > Number(values.payrangeMax)) 
    errors.payrangeMin = errors.payrangeMax = strings.registerValidation.data;

  workingHours.forEach((el) => {
    if (el.begin.format('HH:mm:ss') === 'Invalid Date' 
      || el.end.format('HH:mm:ss') === 'Invalid Date') errors.time = strings.registerValidation.data;
  });

  return errors;
}