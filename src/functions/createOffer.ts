import axios from 'axios';
import { API } from '../const/API.const';
import { AddOfferData } from '../const/types.const';
import { useStore } from '../stores/store';

interface AddOfferPayload extends AddOfferData {
  workingHours: { DayOfWeek: string; StartHour: number; Duration: number; }[];
}

export const createOffer = async (payload: AddOfferPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/offers`,
    {
      title: payload.title,
      description: payload.description,
      role: payload.role,
      address: {
        country: payload.country,
        region: payload.region,
        city: payload.city,
        street: payload.street,
        building: payload.building
      },
      payRange: {
        min: payload.payrangeMin,
        max: payload.payrangeMax
      },
      workingHours: payload.workingHours,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + store.token
      },
    });

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};