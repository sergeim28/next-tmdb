import axios from "shared/services/base";
import Crew from "components/Crew/crew";
import InfoHeader from "components/InfoHeader/infoHeader";
import Head from "next/head";
import { Cast, Movie } from "shared/types/models";

interface Props {
  movie: Movie;
  casts: Cast[];
}

const MovieDetail: React.FC<Props> = ({ movie, casts }) => (
  <div id="detail">
    <Head>
      <title>{movie.title}</title>
    </Head>
    <InfoHeader movie={movie} />
    <div id="crew">
      <div className="container">
        <div className="row middle-xs">
          {casts.map((cast) => (
            <div key={cast.id} className="col-xs">
              <Crew
                name={cast.name}
                profile_path={cast.profile_path}
                character={cast.character}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export async function getServerSideProps(context: any) {
  const movieId = context.params.slug.split("-").slice(-1)[0];
  const movieData = await axios.get(`movie/${movieId}`, {
    params: { api_key: process.env.API_KEY },
  });
  const creditData = await axios.get(`movie/${movieId}/credits`, {
    params: { api_key: process.env.API_KEY },
  });

  return {
    props: {
      movie: movieData.data,
      casts: creditData.data.cast.filter((c: Cast) => c.profile_path != null),
    },
  };
}

export default MovieDetail;
