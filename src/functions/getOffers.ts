import axios from 'axios';
import { useQuery } from 'react-query';
import { API } from '../const/API.const';

interface GetOffersPayload {
  page: number;
  size?: number;
}

export const DEFAULT_PAGE_SIZE = 10;

export const getOffers = async ({ page, size }: GetOffersPayload) => {
  return useQuery(["offers", page], async () => {
    try {
      const { data } = await axios
      .get(`${API}/joboffer?page=${page}&pageSize=${size || DEFAULT_PAGE_SIZE}`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        }
      });

      return data;
    } catch (err: any) {
      console.log(err.response);
      return [];
    }
  }, { keepPreviousData: true });
};