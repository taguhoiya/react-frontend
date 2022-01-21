import { memo } from "react";
import { useParams } from "react-router-dom";
import { Dashboard } from "./DashBoard";

export const Demo = memo(() => {
  const num = parseInt(useParams().num);
  return <Dashboard num={num} />;
});
