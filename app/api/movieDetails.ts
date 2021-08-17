import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {ResponseData, ResponseError} from './types';

const API_URI = Config.API_URL;
const API_KEY = Config.API_KEY;

export const getDescription = async (
  movieId: string,
): Promise<ResponseData<any>> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_URI}/movie/${movieId}`,
      params: {
        api_key: `${API_KEY}`,
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
export const getCast = async (movieId: string): Promise<ResponseData<any>> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${API_URI}/movie/${movieId}/credits`,
      params: {
        api_key: `${API_KEY}`,
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

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export type Details = {
  filmCast: Cast[];
  filmDesc: string;
  filmPoster: string;
  filmTitle: string;
};

export const getMovieDetails = async (id: string) => {
  let details: Details = {
    filmCast: [],
    filmDesc: '',
    filmPoster: '',
    filmTitle: '',
  };

  const {data: desc} = await getDescription(id);
  if (desc) {
    details = {
      ...details,
      filmDesc: desc?.overview ? desc.overview : '',
      filmPoster: desc?.poster_path ? desc.poster_path : '',
      filmTitle: desc?.title ? desc?.title : '',
    };
  }
  const {data: cast} = await getCast(id);
  if (cast) {
    details = {
      ...details,
      filmCast: cast.cast,
    };
  }

  return details;
};
