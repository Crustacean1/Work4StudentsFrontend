import axios from 'axios';
import { API } from '../const/API.const';

interface GetOffersPayload {
  page: number;
  keywords: string;
  categories: string;
  size?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export const getOffers = async ({ page, keywords, categories, size }: GetOffersPayload) => {
  try {
    const { data } = await axios
    .get(`${API}/offers`, 
    {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
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
    console.log(err.response);
    return [];
  }
};