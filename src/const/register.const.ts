import { UserType } from "../stores/store";

export enum AccountTypes {
  Student,
  Company
}

type Test = {
  columns: {
    firstColumn: {
      name: string;
      label: string;
      optional?: boolean;
    }[];
    secondColumn: {
      name: string;
      label: string;
      optional?: boolean;
      type?: AccountTypes;
    }[];
  };
  profile: {
    info: {
      name: string[];
      label: string;
      delimiter?: string[];
      type?: UserType;
    }[];
  };
};

export const data: Test = {
  columns: {
    firstColumn: [
      {
        name: 'firstName',
        label: 'Imię'
      },
      {
        name: 'secondName',
        label: 'Drugie imię',
        optional: true,
      },
      {
        name: 'surname',
        label: 'Nazwisko'
      },
      {
        name: 'phoneNumber',
        label: 'Numer telefonu'
      },
      {
        name: 'emailAddress',
        label: 'Adres e-mail'
      },
      {
        name: 'country',
        label: 'Państwo'
      },
      {
        name: 'city',
        label: 'Miasto'
      }
    ],
    secondColumn: [
      {
        name: 'companyName',
        label: 'Nazwa firmy',
        type: AccountTypes.Company
      },
      {
        name: 'nip',
        label: 'NIP',
        type: AccountTypes.Company
      },
      {
        name: 'positionName',
        label: 'Stanowisko',
        type: AccountTypes.Company
      },
      {
        name: 'password',
        label: 'Hasło'
      },
      {
        name: 'repeatPassword',
        label: 'Powtórz hasło'
      },
      {
        name: 'region',
        label: 'Region'
      },
      {
        name: 'street',
        label: 'Ulica'
      },
      {
        name: 'building',
        label: 'Budynek',
        optional: true,
      }
    ]
  },
  profile: {
    info: [
      {
        name: ['firstName', 'secondName'],
        label: 'Imię'
      },
      {
        name: ['surname'],
        label: 'Nazwisko'
      },
      {
        name: ['phoneNumber'],
        label: 'Telefon'
      },
      {
        name: ['emailAddress'],
        label: 'E-mail'
      },
      {
        name: ['country'],
        label: 'Państwo'
      },
      {
        name: ['region'],
        label: 'Region'
      },
      {
        name: ['city', 'street', 'building'],
        label: 'Adres',
        delimiter: [',', '', '']
      },
      {
        name: ['education'],
        label: 'Wykształcenie',
        type: UserType.Student
      },
      {
        name: ['experience'],
        label: 'Doświadczenie',
        type: UserType.Student
      },
      {
        name: ['description'],
        label: 'Opis',
      },
      {
        name: ['resume'],
        label: 'Twoje CV',
        type: UserType.Student
      }
    ],
  },
};