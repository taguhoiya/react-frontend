import { css } from "@emotion/react";
import { memo } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Typography } from "@mui/material";

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const subOverride = css`
  position: absolute;
  top: 55%;
  left: 50%;
`;

const subOverrideStr = css`
  position: absolute;
  top: 62%;
  left: 50%;
`;

export const Loader = memo((props) => {
  const { state } = props;
  return <PuffLoader loading={state} css={override} color="#36d7bc" size={40} />;
});

export const SubLoader = memo((props) => {
  const { state } = props;
  return (
    <>
      <PacmanLoader loading={state} css={subOverride} color="#9fddfa" size={20} />
      <Typography sx={subOverrideStr} color="secondary">
        No Content...
      </Typography>
    </>
  );
});
