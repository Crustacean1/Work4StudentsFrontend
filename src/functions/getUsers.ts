import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetUsersPayload {
  page: number;
  keywords?: string;
  size?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export const getUsers = async ({ page, size }: GetUsersPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/Accounts`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + store.token
      },
      params: {
        page,
        pageSize: size || DEFAULT_PAGE_SIZE
      }
    });

    return data;
  } catch (err: any) {
    
    console.log(err.response);
    return [];
  }
};