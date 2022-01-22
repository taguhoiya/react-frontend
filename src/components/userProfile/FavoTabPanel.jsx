import { useQuery } from "@apollo/client";
import { Card, Divider, Grid } from "@mui/material";
import { useContext } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { CreateFavoIcon } from "../../graphql/CreateFavo";
import { MOVIES } from "../../graphql/queries";
import { average } from "../../Helper";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
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
  const favoredMarkMovieIds = favoredMarks.map((mark) => mark.movie.id);
  const clippedMovieIds = clips.map((clip) => parseInt(clip.movie.id));
  const array = favorites.map((favo) => {
    const favoredMarkCommeSum = favo.mark.comments.length;
    const favoredMarkFavoSum = favo.mark.favorites.length;
    return { favoredMarkCommeSum, favoredMarkFavoSum, markBool: true };
  });

  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: favoredMarkMovieIds },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const movies = data.movies;
    const ary = movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      const clipBool = clippedMovieIds.includes(parseInt(movie.id));
      return {
        movie: movies[idx],
        ave,
        clipBool,
        favoredMark: favoredMarks[idx],
        favoedMarkCommeSum: array[idx].favoredMarkCommeSum,
        favoredMarkFavoSum: array[idx].favoredMarkFavoSum,
      };
    });
    console.log(ary);
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {ary.map((ary) => (
              <Grid item lg={6} md={6} sm={12} key={ary.favoredMark.id} my={2}>
                <Card className="card-box" sx={{ backgroundColor: "#ceadad" }}>
                  <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                    <Grid item md={0.5} sm={1.5} />
                    <Grid item md={6.5} sm={6}>
                      <h4 style={{ maxHeight: 24 }}>{ary.movie.movieName}</h4>
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
