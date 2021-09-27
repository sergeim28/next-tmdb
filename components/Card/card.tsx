import React, { useMemo } from "react";
import Link from "next/link";
import { Movie } from "shared/models";
import slug from "slug";
import { FaStar, FaRegStar } from "react-icons/fa";
import VoteChart from "../VoteChart/voteChart";

interface Props {
  movie: Movie;
  cardType: string;
  favourites: number[];
  toggleFavourite: (id: number) => void;
}

const Card: React.FC<Props> = ({
  cardType,
  movie,
  favourites,
  toggleFavourite,
}) => {
  if (!movie) return null;

  const { id, title, release_date, poster_path, overview, vote_average } =
    movie;
  const isFavourite = useMemo(() => favourites.includes(id), [favourites, id]);

  return (
    <div className={`card ${isFavourite ? "card-favourite" : ""}`}>
      <div className="card-img">
        <Link
          href={`/${cardType}/[slug]`}
          as={`/${cardType}/${slug(title)}-${id}`}
        >
          <a>
            <img
              src={`https://image.tmdb.org/t/p/w342${poster_path}`}
              title={title}
              alt={title}
            />
          </a>
        </Link>
        <button onClick={() => toggleFavourite(id)}>
          {isFavourite ? <FaStar size="1.6rem" /> : <FaRegStar size="1.6rem" />}
        </button>
        <VoteChart
          vote_average={vote_average * 10}
          className="vote-chart-index"
        />
      </div>
      <div className="card-body">
        <Link
          href={`/${cardType}/[slug]`}
          as={`/${cardType}/${slug(title)}-${id}`}
        >
          <a>
            <h2>{title}</h2>
          </a>
        </Link>
        <p className="release-data">{release_date}</p>
        <div className="overview">
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
