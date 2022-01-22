import { Card, Divider, Grid } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { CustomCard } from "../cards/CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { useContext } from "react";
import { cardStyles2 } from "../cards/CardStyles";
import { average } from "../../Helper";
import { Loader } from "../Loader";
import { MOVIES } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { Stars } from "../Stars";
import { CreateCommentIcon } from "../../graphql/CreateCommentIcon";

export const MarkTabPanel = (props) => {
  const { marks, clips, favorites } = props;
  const { authState } = useContext(UserAuthContext);
  const styles = cardStyles2();
  const clippedMovieIds = clips.map((clip) => parseInt(clip.movie.id));
  const markFavoSums = marks.map((mark) => mark.favorites.length);
  const markCommes = marks.map((mark) => mark.comments.length);
  const markMovieIds = marks.map((mark) => parseInt(mark.movie.id));
  const favoredMarks = favorites.map((favo) => favo.mark);
  const favoredMarkIds = favoredMarks.map((mark) => parseInt(mark.id));
  const markIds = marks.map((mark) => parseInt(mark.id));
  const markBools = markIds.map((markId) => favoredMarkIds.includes(markId));

  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
  });

  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const movies = data.movies;
    const markScoreArray = movies.map((movie) => movie.marks.map((mark) => mark.score));
    const aveScore = markScoreArray.map((score) => average(score));
    const movieIds = movies.map((movie) => parseInt(movie.id));
    const bools = movieIds.map((movieId) => clippedMovieIds.includes(movieId));
    const ary = movies.map((itemOfMovie, idx) => {
      return {
        movie: movies[idx],
        markFavoSum: markFavoSums[idx],
        markComme: markCommes[idx],
        mark: marks[idx],
        ave: aveScore[idx],
        clipBool: bools[idx],
        markBool: markBools[idx],
      };
    });
    console.log(marks)
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {ary.map((ary, index) => (
              <Grid item lg={6} md={6} sm={12} key={index} my={2}>
                <Card className="card-box" sx={{ backgroundColor: "#ceadad" }}>
                  <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                    <Grid item md={0.5} sm={1.5} />
                    <Grid item md={6.5} sm={6}>
                      <h3>{ary.movie.movieName}</h3>
                      <Stars value={ary.mark.score} />
                      <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={150}>
                        <p>{ary.mark.content}</p>
                      </Scrollbars>
                      <Divider style={{ background: "inherit" }} />
                      <CreateFavoIcon
                        favoSum={ary.markFavoSum}
                        auth={parseInt(authState.id)}
                        markStrId={ary.mark.id}
                        initialState={ary.markBool}
                      />
                      <CreateCommentIcon
                        id={ary.mark.id}
                        markBool={ary.markBool}
                        ave={ary.ave}
                        clipBool={ary.clipBool}
                        userId={parseInt(authState.id)}
                      />
                      {ary.markComme}
                    </Grid>
                    <Grid item md={4.5} sm={3}>
                      <CustomCard
                        classes={styles}
                        image={stock1}
                        movieName={ary.movie.movieName}
                        movie={ary.movie}
                        score={Number.isNaN(ary.ave) ? 0 : ary.ave}
                        mark={ary.movie.marks.length}
                        clip={ary.movie.clips.length}
                        id={ary.movie.id}
                        auth={parseInt(authState.id)}
                        size="small"
                        initialState={ary.clipBool}
                      />
                    </Grid>
                    <Grid item md={0.5} sm={1.5} />
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </>
    );
  }
};
