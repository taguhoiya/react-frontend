import ReactStars from "react-rating-stars-component";
import { Typography } from "@mui/material";
import { memo } from "react";

export const Stars = memo((props) => {
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
      <Typography pl={1} pt={!props.pt ? "7px" : props.pt}>
        {props.value}
      </Typography>
    </div>
  );
});
