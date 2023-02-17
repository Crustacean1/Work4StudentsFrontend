import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface ReviewOfferPayload {
  id: string;
  title: string;
  message: string;
  rating: number;
}

export const reviewOffer = async (payload: ReviewOfferPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/offers/${payload.id}/reviews`,
    {
      title: payload.title,
      message: payload.message,
      rating: payload.rating
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
    alert(JSON.stringify(err));
    console.log(err.response);
    return [];
  }
};