import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetRecruiterOffersPayload {
  page: number;
  size?: number;
}

export const DEFAULT_OFFERS_SIZE = 5;

export const getRecruiterOffers = async ({ page, size }: GetRecruiterOffersPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/recruiter/${store.userId}/offers`, 
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
    alert(JSON.stringify(err));
    console.log(err.response);
    return [];
  }
};