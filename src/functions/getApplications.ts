import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetApplicationsPayload {
  page: number;
  size?: number;
}

export const DEFAULT_APPLICATIONS_SIZE = 5;

export const getApplications = async ({ page, size }: GetApplicationsPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/student/applications`, 
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

    console.log(data);
    return data;
  } catch (err: any) {
    alert(err.response);
    return [];
  }
};