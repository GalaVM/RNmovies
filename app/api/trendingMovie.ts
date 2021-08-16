import axios, {AxiosError, ResponseType} from 'axios';
import Config from 'react-native-config';
import {ResponseData, ResponseError} from './types';

const API_URI = Config.API_URL;
const API_KEY = Config.API_KEY;

export interface TrendingMovieDay {
  poster_path?: string | null;
  adult: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];

  id?: number;
  original_title?: string;

  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;

  total_pages?: number;
  total_results: number;
}

type TrendingMovieResponse = {
  results: TrendingMovieDay[];
};

export const trendingMovieDay = async (
  pageId: number,
): Promise<ResponseData<TrendingMovieResponse>> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_URI}/trending/movie/day`,
      params: {
        api_key: `${API_KEY}`,
        page: pageId,
      },
    });

    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ResponseError>;
    return {
      error: axiosError.response?.data || {
        message: error.toString(),
      },
    };
  }
};
