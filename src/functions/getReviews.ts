import axios from 'axios';
import { API } from '../const/API.const';
import { UserType, useStore } from '../stores/store';

interface GetReviewsPayload {
  page: number;
  size?: number;
}

export const DEFAULT_REVIEWS_SIZE = 5;

export const getReviews = async ({ page, size }: GetReviewsPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/${
      store.userType === UserType.Student 
        ? `student/${store.userId}` 
        : `recruiter/${store.userId}`}/reviews`, 
    {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + store.token
      },
      params: {
        page,
        pageSize: size || DEFAULT_REVIEWS_SIZE
      }
    });

    return data;
  } catch (err: any) {
    alert(JSON.stringify(err.response.data));
    console.log(err.response);
    return [];
  }
};