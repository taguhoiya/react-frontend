import { Pagination, Stack } from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const BasicPagination = memo((props) => {
  const { page, setPage, count, mark } = props;
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="warning"
        onChange={(e, page) => {
          setPage(page);
          mark ? navigate(`../marks/${page}`) : navigate(`../movies/${page}`);
        }}
        page={page}
      />
    </Stack>
  );
});
