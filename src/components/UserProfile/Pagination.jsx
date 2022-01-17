import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BasicPagination = (props) => {
  const { page, setPage, count } = props;
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        onChange={(e, page) => {
          setPage(page);
          navigate(`../movies/${page}`, { replace: true });
        }}
        page={page}
      />
    </Stack>
  );
};
