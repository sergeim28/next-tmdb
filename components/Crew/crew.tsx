import React from "react";

interface Props {
  name: string;
  profile_path: string;
  character: string;
}

const Crew: React.FC<Props> = ({ name, profile_path, character }) => (
  <div className="cast-card">
    <div className="card-img">
      <img
        src={`https://image.tmdb.org/t/p/w185${profile_path}`}
        title={name}
        alt={name}
      />
    </div>
    <div className="card-body">
      <p className="name">{name}</p>
      <p className="character">{character}</p>
    </div>
  </div>
);

export default Crew;
