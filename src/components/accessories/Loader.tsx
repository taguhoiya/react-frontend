import { CSSProperties, memo } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Typography } from "@mui/material";

const override: CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
};

const subOverride: CSSProperties = {
  position: "absolute",
  top: "55%",
  left: "50%",
};

const subOverrideTab: CSSProperties = {
  position: "absolute",
  top: "62%",
  left: "50%",
};

const subOverrideStrTab = {
  position: "absolute",
  top: "69%",
  left: "50%",
};

type LoaderProps = {
  state: boolean;
};

export const Loader = memo((props: LoaderProps) => {
  const { state } = props;
  return <PuffLoader loading={state} cssOverride={override} color="#FFB000" size={50} />;
});

export const SubLoader = memo((props: LoaderProps) => {
  const { state } = props;
  return (
    <>
      <PacmanLoader loading={state} cssOverride={subOverride} color="#FFB000" size={20} />
      <Typography sx={subOverrideStrTab} color="secondary">
        No Content...
      </Typography>
    </>
  );
});

export const SubLoaderTab = memo((props: LoaderProps) => {
  const { state } = props;
  return (
    <>
      <PacmanLoader loading={state} cssOverride={subOverrideTab} color="#FFB000" size={20} />
      <Typography sx={subOverrideStrTab} color="secondary">
        No Content...
      </Typography>
    </>
  );
});
