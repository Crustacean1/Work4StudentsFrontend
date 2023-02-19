import axios from 'axios';
import { API } from '../const/API.const';
import { AddOfferData } from '../const/types.const';
import { useStore } from '../stores/store';

interface AddOfferPayload extends AddOfferData {
  beginHour: string;
  endHour: string;
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
      workingHours: [
        {
          start: payload.beginHour,
          end: payload.endHour,
        }
      ],
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
    alert(JSON.stringify(err.response.data));
    console.log(err.response);
    return [];
  }
};