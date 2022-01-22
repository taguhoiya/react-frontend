import { css } from "@emotion/react";
import { memo } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
`;

export const Loader = memo((props) => {
  const { state } = props;
  return <MoonLoader loading={state} css={override} size={40} />;
});
