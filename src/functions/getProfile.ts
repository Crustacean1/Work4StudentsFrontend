import axios from 'axios';
import { API } from '../const/API.const';
import { UserType, useStore } from '../stores/store';

export const getProfile = async () => {
  try {
    const store = useStore.getState();
    const { data } = await axios
        .get(`${API}/Profiles/get/${
          store.userType === UserType.Student 
            ? `studentByStudentId?studentId=${store.userId}` 
            : `employerByEmployerId?employerId=${store.userId}`}`, 
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