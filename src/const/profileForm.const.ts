import { UserType } from "../stores/store";

export const imgDefault = 'https://spng.subpng.com/20180422/awe/kisspng-java-servlet-computer-icons-programming-language-java-5adce132b13b21.743013201524425010726.jpg';
export const radioDefault = 'student';

export const profileFormData = {
  column: [
    {
      name: 'Description',
      label: 'Opis',
      optional: true
    },
    {
      name: 'Education',
      label: 'Wykształcenie',
      type: UserType.Student,
      optional: true
    },
    {
      name: 'PhoneNumber',
      label: 'Numer telefonu'
    },
    {
      name: 'EmailAddress',
      label: 'Adres e-mail'
    },
    {
      name: 'Experience',
      label: 'Doświadczenie',
      type: UserType.Student,
      optional: true
    },
    {
      name: 'PositionName',
      label: 'Stanowisko',
      type: UserType.Company
    },
    {
      name: 'Country',
      label: 'Państwo',
    },
    {
      name: 'Region',
      label: 'Region',
    },
    {
      name: 'City',
      label: 'Miasto',
    },
    {
      name: 'Street',
      label: 'Ulica',
    },
    {
      name: 'Building',
      label: 'Budynek',
    },
  ]
};
