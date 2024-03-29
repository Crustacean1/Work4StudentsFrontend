import axios from 'axios';
import { API } from '../const/API.const';
import { EditProfilePayload } from '../const/types.const';
import { UserType, useStore } from '../stores/store';

export const editProfile = async (payload: EditProfilePayload) => {
  try {
    const store = useStore.getState();

    let formData = new FormData();

    Object.keys(payload).forEach((key) => {
      // @ts-ignore
      if(key !== "availability") formData.append(key, payload[key]);
    });

    payload.availability.forEach((el, index) => {
      Object.keys(el).forEach((key) => {
        formData.append("Availability[]", el[key]);
      });
    });

    const { data } = await axios
      .put(`${API}/Profiles/update/${
      store.userType === UserType.Student 
        ? `student/${store.userProfileId}` 
        : `employer/${store.userProfileId}`}/correctedFiles`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'accept': '*/*',
          'Authorization': 'Bearer ' + store.token
        },
      }
    );

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};