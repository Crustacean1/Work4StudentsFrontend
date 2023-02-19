import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const closeOffer = async (id: string) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/offers/${id}/close`, {},
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      }
    });

    return data;
  } catch (err: any) {
    alert(JSON.stringify(err.response.data));
    console.log(err.response);
    return [];
  }
};