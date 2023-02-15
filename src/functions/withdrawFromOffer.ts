import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const withdrawFromOffer = async (id: string) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/applications/${id}/withdraw`, {},
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