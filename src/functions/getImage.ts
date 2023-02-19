import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const getImage = async () => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/Profiles/get/photo/${store.userProfileId}`, 
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

    return data;
  } catch (err: any) {
    alert(JSON.stringify(err.response.data));
    console.log(err.response);
    return [];
  }
};