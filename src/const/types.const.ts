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

export interface ProfileData {
  availability: any[];
  building: string;
  city: string;
  companyName?: string;
  country: string;
  description: string;
  emailAddress: string;
  education: string;
  experience: string;
  employerId?: string;
  exceptionMessage: null;
  firstName: string;
  phoneNumber: string;
  photo: string | null;
  positionName?: string;
  profileId: string;
  rating: number;
  region: string;
  resume?: string | null;
  secondName: string;
  street: string;
  studentId?: string;
  surname: string;
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
  role: string;
  description: string;
  payRange: {
    min: number;
    max: number;
  };
  workingHours: {
    dayOfWeek: number;
    duration: number;
    startHour: number;
  }[];
  creationDate: string;
}

export interface WorkOfferData extends WorkOfferCardData {
  created: boolean;
  applied: boolean;
  applicationId?: string;
  company: {
    id: string;
    name: string;
    nip: string;
  };
}

export interface AddOfferData {
  country: string;
  region: string;
  city: string;
  street: string;
  building: string;
  title: string;
  description: string;
  payrangeMin: string;
  payrangeMax: string;
  role: string;
  time?: string;
}

export interface EditProfileData {
  Description: string;
  Education: string;
  PhoneNumber: string;
  EmailAddress: string;
  PositionName: string;
  Experience: string;
  Country: string;
  Region: string;
  City: string;
  Street: string;
  Building: string;
  Availability: string;
  ResumeFile: string;
  Image: string;
}

export interface EditProfilePayload extends EditProfileData {
  availability: { [key: string]: Blob | string }[];
}

export const DaysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek',
  'Piątek', 'Sobota'];