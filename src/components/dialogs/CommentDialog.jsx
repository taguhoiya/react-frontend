import { Card, Grid } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { Stars } from "../Stars";
import { CustomCard } from "../cards/CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles3 } from "../cards/CardStyles";

export const CommentDialog = (props) => {
  const { mark, info } = props;
  const styles = cardStyles3();
  const movie = mark.movie;
  return (
    <Card className="card-box" sx={{ backgroundColor: "#e6edf5" }}>
      <Grid container columnSpacing={{ xs: 2, sm: 3, md: 4 }} py={2}>
        <Grid item md={0.5} xs={0.5} />
        <Grid item md={7} xs={5} className="card-header">
          <h3>{movie.movieName}</h3>
          <Stars value={mark.score} size={20} starNum={true} />
          <Scrollbars autoHeight>
            <p>{mark.content}</p>
          </Scrollbars>
        </Grid>
        <Grid item md={4} xs={4}>
          <CustomCard
            classes={styles}
            image={stock1}
            info={info}
            movie={info.movie}
            size="small"
            ave={info.ave}
            markSum={info.markSum}
            initialState={info.initialState}
            clipSum={info.clipSum}
            movieName={info.movie.movieName}
            movieId={info.movie.id}
          />
        </Grid>
        <Grid item md={0.5} xs={0.5} />
      </Grid>
    </Card>
  );
};
