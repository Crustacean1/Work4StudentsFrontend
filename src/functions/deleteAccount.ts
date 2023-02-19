import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const deleteAccount = async () => {
  try {
    const store = useStore.getState();
    const { data } = await axios.delete(`${API}/Accounts/user/${store.userId}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + store.token
      },
    });

    return data;
  } catch (err: any) {
    alert(JSON.stringify(err.response.data));
    console.log(err.response);
    return [];
  }
};