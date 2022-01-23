import { css } from "@emotion/react";
import { memo } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  color: #36a9d7;
  border-color: #36a9d7;
`;


export const Loader = memo((props) => {
  const { state } = props;
  return <PuffLoader loading={state} css={override} size={40} />;
});
