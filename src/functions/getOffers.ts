import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetOffersPayload {
  page: number;
  Keywords: string;
  Categories: string;
  size?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export const getOffers = async ({ page, Keywords, Categories, size }: GetOffersPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios
    .get(`${API}/offers`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': 'Bearer ' + store.token
      },
      params: {
        page,
        Keywords,
        Categories,
        pageSize: size || DEFAULT_PAGE_SIZE
      }
    });

    return data;
  } catch (err: any) {
    console.log(err.response);
    return [];
  }
};