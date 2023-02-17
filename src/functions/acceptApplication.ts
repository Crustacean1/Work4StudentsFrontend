import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const acceptApplication = async (id: string) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.post(`${API}/applications/${id}/accept`, {},
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      }
    });

    return data;
  } catch (err: any) {
    alert(JSON.stringify(err));
    console.log(err.response);
    return [];
  }
};