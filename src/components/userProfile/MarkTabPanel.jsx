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
import { CreateCommentIcon } from "../../graphql/CreateComment";

export const MarkTabPanel = (props) => {
  const { marks, clips, favorites } = props;
  const { authState } = useContext(UserAuthContext);
  const styles = cardStyles2();
  const clippedMovieIds = clips.map((clip) => parseInt(clip.movie.id));
  const markCommes = marks.map((mark) => mark.comments.length);
  const markMovieIds = marks.map((mark) => parseInt(mark.movie.id));
  const favoredMarks = favorites.map((favo) => favo.mark);
  const favoredMarkIds = favoredMarks.map((mark) => parseInt(mark.id));
  const markIds = marks.map((mark) => parseInt(mark.id));
  const favoBools = markIds.map((markId) => favoredMarkIds.includes(markId));

  const { loading, error, data } = useQuery(MOVIES, {
    variables: { ids: markMovieIds },
  });

  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const movies = data.movies;
    const ary = movies.map((movie, idx) => {
      const ave = average(movie.marks.map((mark) => mark.score));
      const initialState = clippedMovieIds.includes(parseInt(movie.id));
      return {
        movie: movies[idx],
        markComme: markCommes[idx],
        markSum: movie.marks.length,
        clipSum: movie.clips.length,
        mark: marks[idx],
        ave,
        initialState,
        favoBool: favoBools[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        <Grid container spacing={2}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
            {ary.map((ary, index) => (
              <Grid item lg={6} md={6} xs={12} key={index} my={4}>
                <Card className="card-box" sx={{ backgroundColor: "#e6edf5" }}>
                  <Grid container columnSpacing={{ xs: 2, sm: 3, md: 2 }} py={2}>
                    <Grid item md={0.5} sm={1.5} xs={0.5} />
                    <Grid item md={6.5} sm={6} xs={6}>
                      <h4
                        style={{
                          maxWidth: 100,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ary.movie.movieName}
                      </h4>
                      <Grid xs={12}>
                        <Stars value={ary.mark.score} size={20} />
                      </Grid>
                      <Scrollbars autoHeight autoHeightMin={80} autoHeightMax={150}>
                        <p>{ary.mark.content}</p>
                      </Scrollbars>
                      <Divider style={{ background: "inherit" }} />
                      <CreateFavoIcon
                        favoSum={ary.mark.favorites.length}
                        auth={parseInt(authState.id)}
                        markStrId={ary.mark.id}
                        favoBool={ary.favoBool}
                      />
                      <CreateCommentIcon info={ary} markId={ary.mark.id} />
                      {ary.markComme}
                    </Grid>
                    <Grid item md={4.5} sm={4} xs={5}>
                      <CustomCard
                        classes={styles}
                        image={stock1}
                        info={ary}
                        movie={ary.movie}
                        size="small"
                        ave={ary.ave}
                        markSum={ary.markSum}
                        initialState={ary.initialState}
                        clipSum={ary.clipSum}
                        movieName={ary.movie.movieName}
                        movieId={ary.movie.id}
                      />
                    </Grid>
                    <Grid item md={0.5} sm={1.5} xs={0.5} />
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
