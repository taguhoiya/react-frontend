import { Avatar, Box, Card, Grid, IconButton, Typography } from "@mui/material";
import Scrollbars from "react-custom-scrollbars-2";
import { Stars } from "../accessories/Stars";
import { CustomCard } from "../cards/CustomCard";
import stock1 from "../../images/stock-photos/adtDSC_3214.jpg";
import { cardStyles2 } from "../cards/CardStyles";
import MediaQuery from "react-responsive";
import { MarkThreeVertIcon } from "../cards/MarkThreeVertIcon";
import { useContext } from "react";
import { UserAuthContext } from "../providers/UserAuthProvider";
import { Link } from "react-router-dom";
import defaultImage from "../../images/stock-photos/people-1.jpg";

export const CommentDialog = (props) => {
  const { mark, info, markId, markUserId } = props;
  const styles = cardStyles2();
  const { authState } = useContext(UserAuthContext);
  return (
    <Card className="card-box" sx={{ backgroundColor: "#e6edf5" }}>
      <Grid container columnSpacing={{ xs: 2, sm: 3, md: 4 }} py={2}>
        <MediaQuery query="(max-width: 550px)">
          <Grid item md={0.5} xs={0.5} />
          <Grid item md={7} xs={4.8} className="card-header">
            <Box display="flex">
              <IconButton>
                <Link to={`/user/${info.userId}/profile`}>
                  <Avatar
                    alt={info.nickname}
                    src={!info.userPath ? defaultImage : info.userPath}
                    sx={{ width: 22, height: 22 }}
                  ></Avatar>
                </Link>
              </IconButton>
              <Link to={`/user/${info.userId}/profile`}>
                <Typography
                  sx={{ ml: 1, pt: 1.7, fontFamily: "arial, sans-serif", color: "black" }}
                  fontSize="0.5rem"
                >
                  {info.nickname}
                </Typography>
              </Link>
            </Box>
            <Typography
              sx={{
                maxWidth: 200,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: `'Vollkorn', serif`,
                height: "2rem",
              }}
              mt={1}
              fontSize="0.9rem"
            >
              {info.movie.movieName}
            </Typography>
            <Stars value={mark.score} size={16} pt="0px" starNum={true} />
            <Scrollbars
              autoHeight
              autoHeightMin={150}
              autoHeightMax={180}
              style={{
                border: "1px solid rgba(192, 231, 231, 0.733)",
                borderRadius: "8px",
                paddingInline: "10px",
              }}
            >
              <Typography fontSize="0.8rem">{mark.content}</Typography>
            </Scrollbars>
          </Grid>
          <Grid item md={4.5} sm={3} xs={5}>
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
          <Grid item md={0.5} sm={1.5} xs={0.2}>
            {markUserId == authState.id ? (
              <MarkThreeVertIcon markId={markId} userId={authState.id} />
            ) : null}
          </Grid>
        </MediaQuery>

        <MediaQuery query="(min-width: 550px)">
          <Grid item md={0.5} sm={1.5} xs={0.5} />
          <Grid item md={6.5} sm={6} xs={6}>
            <Box display="flex">
              <IconButton>
                <Link to={`/user/${info.userId}/profile`}>
                  <Avatar
                    alt={info.nickname}
                    src={!info.userPath ? defaultImage : info.userPath}
                    sx={{ width: 30, height: 30 }}
                  ></Avatar>
                </Link>
              </IconButton>
              <Link to={`/user/${info.userId}/profile`}>
                <Typography
                  sx={{ ml: 1, pt: 1.5, fontFamily: "arial, sans-serif", color: "black" }}
                  fontSize="0.8rem"
                >
                  {info.nickname}
                </Typography>
              </Link>
            </Box>
            <Typography
              sx={{
                maxWidth: 400,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontFamily: `'Vollkorn', serif`,
                height: "2rem",
              }}
              fontSize="1.5rem"
            >
              {info.movie.movieName}
            </Typography>
            <Stars value={mark.score} size={20} starNum={true} />
            <Scrollbars
              autoHeight
              autoHeightMin={150}
              autoHeightMax={180}
              style={{
                border: "1px solid rgba(192, 231, 231, 0.733)",
                borderRadius: "8px",
                paddingInline: "10px",
              }}
            >
              <Typography fontSize="1.0rem">{mark.content}</Typography>
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
        </MediaQuery>
      </Grid>
    </Card>
  );
};
