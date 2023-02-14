export interface RegisterData {
  firstName: string;
  secondName: string;
  surname: string;
  phoneNumber: string;
  emailAddress: string;
  companyName: string;
  nip: string;
  positionName: string;
  password: string;
  repeatPassword: string;
}

export interface WorkOfferData {
  id: string;
  title: string;
  description: string;
  region: string;
  company: {
    name: string;
    logo: string;
  };
  date: number;
  isFavourite: boolean;
}