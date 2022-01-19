import { Card, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateCommentIcon } from "../../graphql/CreateCommentIcon";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Stars } from "../Stars";
import { CustomCard } from "./CustomCard";
import stock1 from "../../images/stock-photos/stock-1.jpg";
import { cardStyles3 } from "./CardStyles";

export const CommentDialog = (props) => {
  const authState = useContext(UserAuthContext);
  const { mark, markBool, ave, clipBool } = props;
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
          <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={150}>
            <p>{mark.content}</p>
          </Scrollbars>
          <Divider style={{ background: "inherit" }} />
          <CreateFavoIcon
            favoSum={markFavoSum}
            auth={parseInt(authState.id)}
            markStrId={mark.id}
            initialState={markBool}
          />
          <CreateCommentIcon id={mark.id} userId={parseInt(authState.id)} />
          {markComme}
        </Grid>
        <Grid item md={4}>
          <CustomCard
            classes={styles}
            image={stock1}
            movieName={movie.movieName}
            movie={movie}
            score={Number.isNaN(ave) ? 0 : ave}
            mark={movie.marks.length}
            clip={movie.clips.length}
            id={movie.id}
            auth={parseInt(authState.id)}
            size="small"
            initialState={clipBool}
          />
        </Grid>
        <Grid item md={0.5} />
      </Grid>
    </Card>
  );
};
