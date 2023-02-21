import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const getOffer = async (id: string) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/offers/${id}`, 
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