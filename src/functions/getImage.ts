import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

export const getImage = async (id?: string) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/Profiles/get/photo/${id || store.userProfileId}`, 
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