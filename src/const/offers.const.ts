import dayjs, { Dayjs } from "dayjs";
import { WorkOfferData } from "./types.const";

export const offerFormData = {
  column: [
    {
      name: 'title',
      label: 'Tytuł'
    },
    {
      name: 'role',
      label: 'Stanowisko'
    },
    {
      name: 'payrangeMin',
      label: 'Minimalna stawka',
      halfSize: true,
    },
    {
      name: 'payrangeMax',
      label: 'Maksymalna stawka',
      halfSize: true,
    },
    {
      name: 'country',
      label: 'Państwo',
      halfSize: true,
    },
    {
      name: 'region',
      label: 'Region',
      halfSize: true,
    },
    {
      name: 'city',
      label: 'Miejscowość',
      halfSize: true,
    },
    {
      name: 'street',
      label: 'Ulica',
      halfSize: true,
    },
    {
      name: 'building',
      label: 'Budynek',
      halfSize: true,
      optional: true
    },
    {
      name: 'description',
      label: 'Opis',
      multiline: true
    },
  ],
  days: [
    {
      name: 'Poniedziałek',
      id: 1,
    },
    {
      name: 'Wtorek',
      id: 2,
    },
    {
      name: 'Środa',
      id: 3,
    },
    {
      name: 'Czwartek',
      id: 4,
    },
    {
      name: 'Piątek',
      id: 5,
    },
    {
      name: 'Sobota',
      id: 6,
    },
    {
      name: 'Niedziela',
      id: 0,
    },
  ],
};

export const emptyAvailability = () => {
  const result = [];

  for (let day = 0; day < 7; day++) {
    const emptyDay = {
      begin: dayjs().day(day).minute(0),
      end: dayjs().day(day).minute(0),
    };
    result.push(emptyDay);
  }

  return result;
};

export const emptyOffer: WorkOfferData = {
  applied: false,
  created: false,
  company: {
    id: '',
    name: '',
    nip: ''
  },
  id: '',
  address: {
    country: '',
    region: '',
    city: '',
    street: '',
    building: '',
  },
  title: '',
  description: '',
  payRange: {
    min: 0,
    max: 0,
  },
  workingHours: [],
  creationDate: '',
  role: '',
};