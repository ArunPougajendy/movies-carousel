import fetchApi from '../services/api';
import API_KEY from '../services/config';

const END_POINTS: any = {
  getMovies: `discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
};

const genres: any = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
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

const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export async function getMovies() {
  try {
    const response = await fetchApi(END_POINTS.getMovies);
    const json = await response.json();
    const results = json.results;
    const movies = results.map(
      ({
        id,
        original_title,
        poster_path,
        backdrop_path,
        vote_average,
        overview,
        release_date,
        genre_ids,
      }: MovieResponseType) => ({
        key: String(id),
        title: original_title,
        poster: getImagePath(poster_path),
        backdrop: getBackdropPath(backdrop_path),
        rating: vote_average,
        description: overview,
        releaseDate: release_date,
        genres: genre_ids.map((genre: number) => genres[genre]),
      }),
    );
    return movies;
  } catch (e) {
    alert('Request failed');
    console.log('e:', e);

    return [];
  }
}
