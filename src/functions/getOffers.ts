import axios from 'axios';
import { API } from '../const/API.const';
import { useStore } from '../stores/store';

interface GetOffersPayload {
  page: number;
  keywords: string;
  categories: string;
  size?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export const getOffers = async ({ page, keywords, categories, size }: GetOffersPayload) => {
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
        keywords,
        categories,
        pageSize: size || DEFAULT_PAGE_SIZE
      }
    });

    return data;
  } catch (err: any) {
    alert(JSON.stringify(err));
    console.log(err.response);
    return [];
  }
};