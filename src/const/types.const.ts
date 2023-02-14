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