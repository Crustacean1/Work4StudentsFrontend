export enum AccountTypes {
  Student,
  Company
}

export const data = {
  columns: {
    firstColumn: [
      {
        name: 'firstName',
        label: 'Imię'
      },
      {
        name: 'secondName',
        label: 'Drugie imię'
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
    ],
  },
};