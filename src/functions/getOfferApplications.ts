import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetOfferApplicationsPayload {
  id: string;
  page: number;
  size?: number;
}

export const DEFAULT_APPLICATIONS_SIZE = 5;

export const getOfferApplications = async ({ id, page, size }: GetOfferApplicationsPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/offers/${id}/applications`, 
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
    alert(JSON.stringify(err));
    console.log(err.response);
    return [];
  }
};