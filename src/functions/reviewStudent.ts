import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface ReviewStudentPayload {
  id: string;
  title: string;
  message: string;
  rating: number;
}

export const reviewStudent = async (payload: ReviewStudentPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/applications/${payload.id}/reviews`,
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
    
    console.log(err.response);
    return [];
  }
};