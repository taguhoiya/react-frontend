import { css } from "@emotion/react";
import { memo } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
`;

export const Loader = memo((props) => {
  const { state } = props;
  return <PuffLoader loading={state} css={override} color="#36d7bc" size={40} />;
});
