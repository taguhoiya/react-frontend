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
import defaultImage from "../../images/stock-photos/blank-profile-picture-gc8f506528_1280.png";
import { MarkThreeVertIcon } from "./MarkThreeVertIcon";

export const MarksSection = (props) => {
  const { movieId } = props;
  // const { imageState } = UserImageProvider(UserImageContext);
  const { loading, error, data } = useQuery(MOVIE, {
    variables: { id: movieId },
  });
  if (loading) return <Loader state={true} />;
  if (error) return `Error ${error.message}`;
  if (data) {
    const marks = data.movie.marks;
    const users = marks.map((mark) => mark.user);
    const usersPath = users.map((user) => (!user.path ? "" : `http://www.moview-ori.com${user.path}/`));
    const ary = marks.map((itemOfMark, idx) => {
      return {
        mark: marks[idx],
        user: users[idx],
        userPath: usersPath[idx],
      };
    });
    return (
      <>
        <Loader state={false} />
        <Scrollbars autoHeight autoHeightMin={260} autoHeightMax={260}>
          <List sx={{ width: "100%", bgcolor: "background.paper", margin: "auto" }}>
            {!marks.length ? (
              <Typography
                sx={{ fontStyle: "italic", fontWeight: "medium" }}
                variant="h4"
                mt="15%"
                textAlign="center"
              >
                Post some review!
              </Typography>
            ) : (
              ary.map((ary, index) => {
                return (
                  <>
                    <ListItem key={index} sx={{ pt: "-5%" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 45, height: 45 }}
                          alt={ary.user.nickname}
                          src={!ary.userPath ? defaultImage : ary.userPath}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={ary.user.nickname}
                        secondary={
                          <>
                            <Stars value={ary.mark.score} size={17} pt={"0px"} />
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {ary.mark.content}
                            </Typography>
                          </>
                        }
                      />
                      <MarkThreeVertIcon userId={ary.user.id} markId={ary.mark.id} />
                    </ListItem>
                    <Divider />
                  </>
                );
              })
            )}
          </List>
        </Scrollbars>
      </>
    );
  }
};
