import axios from 'axios';
import { API } from '../const/API.const';

export const applyForOffer = async (id: string) => {
  try {
    const { data } = await axios.post(`${API}/applications/apply`, { offerId: id },
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
      },
    });

    return data;
  } catch (err: any) {
    console.log(err.response);
    return [];
  }
};