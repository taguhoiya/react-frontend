import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { MOVIE } from "../../graphql/queries";
import { Loader } from "../Loader";
import { Stars } from "../Stars";
import Scrollbars from "react-custom-scrollbars-2";
import defaultImage from "./../../images/stock-photos/people-3.jpg";
import { MarkThreeVertIcon } from "./MarkThreeVertIcon";
import { memo } from "react";
import MediaQuery from "react-responsive";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export const MarksSection = memo((props) => {
  const { movieId } = props;
  const { loading, error, data } = useQuery(MOVIE, {
    variables: { id: movieId },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const marks = data.movie.marks;
    const ary = marks.map((mark, idx) => {
      const user = mark.user;
      const userPath = !user.path ? "" : `https://www.moview-ori.com${user.path}`;
      return { mark: marks[idx], user, userPath };
    });
    return (
      <>
        <Loader state={false} />
        <Scrollbars autoHeight>
          {!marks.length ? (
            <Typography
              sx={{ fontStyle: "italic", fontWeight: "medium", color: "#c7c3c3" }}
              variant="h5"
              textAlign="center"
            >
              No review yet.
            </Typography>
          ) : (
            ary.map((ary, index) => {
              return (
                <>
                  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <MediaQuery query="(min-width: 550px)">
                      <Divider />
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <IconButton>
                            <Link to={`/user/${ary.user.id}/profile`}>
                              <Avatar
                                sx={{ width: 32, height: 32 }}
                                alt={ary.user.nickname}
                                src={!ary.userPath ? defaultImage : ary.userPath}
                              />
                            </Link>
                          </IconButton>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                sx={{ display: "inline" }}
                                fontSize="0.7rem"
                                color="text.primary"
                              >
                                {ary.user.nickname}
                              </Typography>
                            </>
                          }
                          fontSize="0.6rem"
                          secondary={
                            <>
                              <Stars value={ary.mark.score} size={16} pt={"0px"} starNum={true} />
                              <Typography
                                sx={{ display: "inline" }}
                                fontSize="0.8rem"
                                component="span"
                                color="text.primary"
                              >
                                {ary.mark.content}
                              </Typography>
                            </>
                          }
                        />
                        <MarkThreeVertIcon userId={ary.user.id} markId={ary.mark.id} />
                      </ListItem>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 550px)">
                      <Divider />
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <IconButton>
                            <Link to={`/user/${ary.user.id}/profile`}>
                              <Avatar
                                sx={{ width: 25, height: 25 }}
                                alt={ary.user.nickname}
                                src={!ary.userPath ? defaultImage : ary.userPath}
                              />
                            </Link>
                          </IconButton>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <>
                              <Typography
                                sx={{ display: "inline" }}
                                fontSize="0.5rem"
                                color="text.primary"
                              >
                                {ary.user.nickname}
                              </Typography>
                            </>
                          }
                          fontSize="0.6rem"
                          secondary={
                            <>
                              <Stars value={ary.mark.score} size={11} pt="0px" starNum={false} />
                              <Typography
                                sx={{ display: "inline" }}
                                fontSize="0.5rem"
                                component="span"
                                color="text.primary"
                              >
                                {ary.mark.content}
                              </Typography>
                            </>
                          }
                        />
                        <MarkThreeVertIcon userId={ary.user.id} markId={ary.mark.id} />
                      </ListItem>
                    </MediaQuery>
                  </List>
                </>
              );
            })
          )}
        </Scrollbars>
      </>
    );
  }
});
