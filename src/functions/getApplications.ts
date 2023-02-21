import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetApplicationsPayload {
  page: number;
  id?: string;
  size?: number;
}

export const DEFAULT_APPLICATIONS_SIZE = 5;

export const getApplications = async ({ page, id, size }: GetApplicationsPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/student/${id || store.userId}/applications`, 
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      },
      params: {
        page,
        pageSize: size || DEFAULT_APPLICATIONS_SIZE
      }
    });

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};