import { Pagination, Stack } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const BasicPagination = memo((props) => {
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
});
