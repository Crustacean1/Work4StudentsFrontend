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
      name: 'description',
      label: 'Opis',
      multiline: true
    },
  ]
};

export const emptyOffer: WorkOfferData = {
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