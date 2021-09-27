import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const getPathColor = (score: number) => {
  let red = 0,
    green = 0;
  if (score >= 75) {
    red = 255 - Math.round(((score - 50) / 50) * 255);
    green = 255;
  } else {
    red = 255;
    green = Math.round((score / 75) * 255);
  }
  return `rgb(${red},${green},0)`;
};

interface Props {
  vote_average: number;
  className: string;
}

const VoteChart: React.FC<Props> = ({ vote_average = 0, className }) => (
  <CircularProgressbar
    value={vote_average}
    text={`${vote_average}%`}
    className={className}
    background={true}
    styles={buildStyles({
      pathColor: getPathColor(vote_average),
      textColor: "#fff",
      trailColor: "#1d4328",
      backgroundColor: "#0a1b22",
      textSize: "32px",
    })}
  />
);

export default VoteChart;
