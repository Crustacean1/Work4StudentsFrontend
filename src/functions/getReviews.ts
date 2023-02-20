import axios from 'axios';
import { API } from '../const/API.const';
import { UserType, useStore } from '../stores/store';

interface GetReviewsPayload {
  page: number;
  id?: string;
  type?: UserType;
  size?: number;
}

export const DEFAULT_REVIEWS_SIZE = 5;

export const getReviews = async ({ page, id, type, size }: GetReviewsPayload) => {
  try {
    const store = useStore.getState();
    const { data } = await axios.get(`${API}/${
      type == UserType.Student || store.userType === UserType.Student 
        ? `student/${id || store.userId}` 
        : `recruiter/${id || store.userId}`}/reviews`, 
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