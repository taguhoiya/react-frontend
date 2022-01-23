import { Card, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateCommentIcon } from "../../graphql/CreateComment";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Stars } from "../Stars";
import { CustomCard } from "./CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles3 } from "./CardStyles";

export const CommentDialog = (props) => {
  const authState = useContext(UserAuthContext);
  const { mark, favoBool, info } = props;
  const styles = cardStyles3();
  const movie = mark.movie;
  const markFavoSum = mark.favorites.length;
  const markComme = mark.comments.length;
  return (
    <Card className="card-box" sx={{ backgroundColor: "#ceadad" }}>
      <Grid container columnSpacing={{ xs: 2, sm: 3, md: 4 }} py={2}>
        <Grid item md={0.5} />
        <Grid item md={7} className="card-header">
          <h3>{movie.movieName}</h3>
          <Stars value={mark.score} />
          <Scrollbars autoHeight>
            <p>{mark.content}</p>
          </Scrollbars>
          <Divider style={{ background: "inherit" }} />
          <CreateFavoIcon
            favoSum={markFavoSum}
            auth={parseInt(authState.id)}
            markStrId={mark.id}
            favoBool={favoBool}
          />
          <CreateCommentIcon info={info} markId={mark.id} />
          {markComme}
        </Grid>
        <Grid item md={4}>
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
        <Grid item md={0.5} />
      </Grid>
    </Card>
  );
};
