import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetRecruiterOffersPayload {
  page: number;
  id?: string;
  size?: number;
}

export const DEFAULT_OFFERS_SIZE = 5;

export const getRecruiterOffers = async ({ page, id, size }: GetRecruiterOffersPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/recruiter/${id || store.userId}/offers`, 
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      },
      params: {
        page,
        pageSize: size || DEFAULT_OFFERS_SIZE
      }
    });

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};