import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const testFunc = async () => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/offers/fuck-my-shit-up`, 
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