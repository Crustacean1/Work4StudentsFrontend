import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const deleteApplication = async (id: string) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.delete(`${API}/applications/${id}`,
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      }
    });

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};