import { MovieResponseType } from '../actions/movies';
import APIKEY from '../services/config';
import { genres } from './constants';

export function isApikeyAvailable() {
  if (APIKEY) {
    return true;
  } else {
    return false;
  }
}

const getImagePath = (path: string) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export function formatMovieResponse(movies: any) {
  try {
    const formattedMovies = movies.map(
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
    return formattedMovies;
  } catch (e) {
    console.log('e:', e);
  }
}
