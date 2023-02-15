import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const getImage = async () => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/Profiles/get/photo/${store.userId}`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + store.token
      },
      params: {
        profileId: store.userProfileId
      }
    });

    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err.response);
    return [];
  }
};