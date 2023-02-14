export interface RegisterData {
  firstName: string;
  secondName: string;
  surname: string;
  phoneNumber: string;
  emailAddress: string;
  country: string;
  city: string;
  companyName: string;
  nip: string;
  positionName: string;
  password: string;
  repeatPassword: string;
  region: string;
  street: string;
  building: string;
}

export interface WorkOfferCardData {
  id: string;
  address: {
    country: string;
    region: string;
    city: string;
    street: string;
    building: string;
  };
  title: string;
  description: string;
  payRange: {
    min: number;
    max: number;
  };
  workingHours: {
    start: string;
    end: string;
  }[];
  creationDate: string;
}

export interface WorkOfferData extends WorkOfferCardData {
  role: string;
}

export interface AddOfferData {
  country: string;
  region: string;
  city: string;
  street: string;
  title: string;
  description: string;
  payrangeMin: string;
  payrangeMax: string;
  role: string;
  beginHour: string;
  endHour: string;
}