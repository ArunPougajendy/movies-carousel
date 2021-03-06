import fetchApi from '../services/api';
import API_KEY from '../services/config';
import { formatMovieResponse } from '../utils/helper';

const END_POINTS: any = {
  getMoviesByPop: `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
  getMoviesByRate: `discover/movie?api_key=${API_KEY}&sort_by=vote_count.desc`,
};

export interface MovieResponseType {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: any[];
}
export interface MovieType {
  key: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: number;
  description: string;
  releaseDate: string;
  genres: any;
}

export async function getMovies(alternate?: boolean) {
  try {
    const response = await fetchApi(
      alternate ? END_POINTS.getMoviesByRate : END_POINTS.getMoviesByPop,
    );
    const json = await response.json();
    const results = json.results;
    const movies = formatMovieResponse(results);
    return movies;
  } catch (e) {
    alert('Request failed');
    console.log('e:', e);

    return [];
  }
}
