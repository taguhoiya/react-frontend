import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  position: fixed; /*body要素に対して絶対配置*/
  top: 50%; /*上端を中央に*/
  left: 50%; /*左端を中央に*/
`;

export const Loader = (props) => {
  const { state } = props;
  return <MoonLoader loading={state} css={override} size={40} />;
};
