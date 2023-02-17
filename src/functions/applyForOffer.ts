import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const applyForOffer = async ({ id , message }: {
  id: string;
  message: string;
}) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/applications/apply/${id}`,
    {
      message,
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