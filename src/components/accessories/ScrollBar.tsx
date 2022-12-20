import { Typography } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";

export const ScrollBar = (props: { content: string }) => {
  const { content } = props;
  return (
    <Scrollbars autoHeight autoHeightMin={130} autoHeightMax={130}>
      <Typography variant="body2">{content}</Typography>
    </Scrollbars>
  );
};
