import { useQuery } from "@apollo/client";
import { Card, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/stock-1.jpg";
import { cardStyles2 } from "../cards/CardStyles";
import { CustomCard } from "../cards/CustomCard";
import { Loader } from "../Loader";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Stars } from "../Stars";
import { CreateCommentIcon } from "../../graphql/CreateCommentIcon";

export const FavoTabPanel = (props) => {
  const styles = cardStyles2();

  const { authState } = useContext(UserAuthContext);
  const { favorites, clips } = props;

  const favoredMarks = favorites.map((favo) => favo.mark);
  const favoerdMarkIds = favoredMarks.map((mark) => parseInt(mark.id));
  const favoredMarkMovieIds = favoredMarks.map((mark) => mark.movie.id);

  const favoredMarkCommesSum = favoredMarks.map((mark) => mark.comments.length);
  const favoedMarkFavosSum = favoredMarks.map((mark) => mark.favorites.length);

  const clippedMovieIds = clips.map((clip) => parseInt(clip.movie.id));

  const favoredMarkIds = favoredMarks.map((mark) => parseInt(mark.id));
  const markBools = favoerdMarkIds.map((markId) => favoredMarkIds.includes(markId));

  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: favoredMarkMovieIds },
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
        ave: aveScore[idx],
        clipBool: bools[idx],
        favoredMark: favoredMarks[idx],
        favoedMarkCommeSum: favoredMarkCommesSum[idx],
        favoedMarkFavoSum: favoedMarkFavosSum[idx],
        markBool: markBools[idx],
      };
    });
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
                      <Stars value={ary.favoredMark.score} />
                      <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={150}>
                        <p>{ary.favoredMark.content}</p>
                      </Scrollbars>
                      <Divider style={{ background: "inherit" }} />
                      <CreateFavoIcon
                        favoSum={ary.favoedMarkFavoSum}
                        auth={parseInt(authState.id)}
                        markStrId={ary.favoredMark.id}
                        initialState={ary.markBool}
                      />
                      <CreateCommentIcon
                        id={ary.favoredMark.id}
                        markBool={ary.markBool}
                        ave={ary.ave}
                        clipBool={ary.clipBool}
                        userId={parseInt(authState.id)}
                      />
                      {ary.favoedMarkCommeSum}
                    </Grid>
                    <Grid item md={4.5} sm={3}>
                      <CustomCard
                        classes={styles}
                        image={stock1}
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
                    <Grid item md={0.5} />
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
