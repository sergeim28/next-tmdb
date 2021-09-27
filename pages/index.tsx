import React, { useCallback, useEffect } from "react";
import axios from "shared/axios";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Card from "components/Card/card";
import { Movie } from "shared/models";
import { useRouter } from "next/router";

const LOCALSTORAGE_KEY = "tmdb-favourite-ids";

interface Props {}

const Home: React.FC<Props> = () => {
  const router = useRouter();
  const [scrollerKey, setKey] = useState(1);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [favourites, setFavourites] = useState<number[]>([]);

  useEffect(() => {
    const favouriteItems: number[] = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
    );
    setFavourites(favouriteItems);
  }, []);

  const toggleFavourite = useCallback((id: number) => {
    const favouriteItems: number[] = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
    );
    const index = favouriteItems.findIndex((cur) => cur === id);
    if (index < 0) {
      favouriteItems.push(id);
    } else {
      favouriteItems.splice(index, index + 1);
    }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(favouriteItems));
    setFavourites(favouriteItems);
  }, []);

  useEffect(() => {
    setMovieList([]);
    setKey((prev) => prev + 1);
  }, [router.query?.sortOrder]);

  const fetchMore = (page: number) => {
    const sort_by =
      router.query?.sortOrder === "asc"
        ? "vote_average.asc"
        : "vote_average.desc";
    if (page >= 500) {
      setHasMore(false);
    }
    if (!isLoading) {
      setIsLoading(true);
      axios
        .get("discover/movie", {
          params: {
            language: "en-US",
            page,
            sort_by,
          },
        })
        .then((res) => {
          setMovieList((prev) => prev.concat(res.data.results));
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="container">
      <InfiniteScroll
        key={scrollerKey}
        pageStart={1}
        loadMore={fetchMore}
        hasMore={hasMore}
        threshold={1000}
        loader={
          <div key={0} className="loader">
            <h4>Loading...</h4>
          </div>
        }
      >
        <div className="row center-xs">
          {movieList.map((movie) => (
            <div className="col-xs" key={movie.id}>
              <Card
                movie={movie}
                cardType="movie"
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
