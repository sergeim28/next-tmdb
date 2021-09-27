export interface Genre {
  name: string;
}

export interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  genres: Genre[];
  backdrop_path: string;
  title: string;
  runtime: number;
  vote_average: number;
  tagline: string;
  overview: string;
}

export interface Cast {
  id: string;
  name: string;
  profile_path: string;
  character: string;
}
