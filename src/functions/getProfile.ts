import axios from 'axios';
import { API } from '../const/API.const';
import { UserType, useStore } from '../stores/store';

export const getProfile = async (id?: string, type?: UserType) => {
  try {
    const store = useStore.getState();
    const { data } = await axios
        .get(`${API}/Profiles/get/${
          type == UserType.Student || store.userType === UserType.Student 
            ? `studentByStudentId/${id || store.userId}` 
            : `employerByEmployerId/${id || store.userId}`}`, 
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      },
    });

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};