import ReactStars from "react-rating-stars-component";
import { Typography } from "@mui/material";
import { memo } from "react";

type StarsProps = {
  size: string;
  value: string;
  starNum: number;
  typo: string;
  pt: string;
};

export const Stars = memo((props: StarsProps) => {
  return (
    <div style={{ display: "flex" }}>
      <ReactStars
        count={5}
        size={!props.size ? 25 : props.size}
        edit={false}
        value={props.value}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
      />
      {props.starNum ? (
        <Typography
          pl={1}
          pt={!props.pt ? "3px" : props.pt}
          fontSize={props.typo ? props.typo : "1rem"}
        >
          {props.value}
        </Typography>
      ) : null}
    </div>
  );
});
