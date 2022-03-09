import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { OutlinedInput, Typography } from "@mui/material";
import MediaQuery from "react-responsive";

export const SelectBox = (props) => {
  const { params, setParams } = props;
  const cateArr = [
    "action",
    "adventure",
    "animation",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "family",
    "fantasy",
    "history",
    "horror",
    "music",
    "mystery",
    "romance",
    "science_fiction",
    "tv_movie",
    "thriller",
    "war",
    "western",
  ];
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250,
      },
    },
  };
  const MenuPropsSmall = {
    PaperProps: {
      style: {
        maxHeight: 220,
        width: 150,
      },
    },
  };

  const handleChange = (event) => {
    setParams(event.target.value);
  };

  return (
    <>
      <MediaQuery query="(min-width: 550px)">
        <FormControl
          sx={{ width: 250, position: "absolute", top: 140, mr: 15 }}
          size="small"
          color="warning"
        >
          <Select
            value={params}
            onChange={handleChange}
            displayEmpty
            input={<OutlinedInput />}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>Search by category?</em>
            </MenuItem>
            {cateArr.map((cate, index) => {
              return (
                <MenuItem value={cate} key={index}>
                  {cate}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </MediaQuery>
      <MediaQuery query="(max-width: 550px)">
        <FormControl sx={{ width: 150, position: "relative", mb: 1 }} size="small" color="warning">
          <Select
            value={params}
            onChange={handleChange}
            displayEmpty
            input={<OutlinedInput />}
            MenuProps={MenuPropsSmall}
          >
            <MenuItem value="">
              <em style={{ fontSize: "0.7rem" }}>Search by category?</em>
            </MenuItem>
            {cateArr.map((cate, index) => {
              return (
                <MenuItem value={cate} key={index}>
                  <Typography fontsize="0.7rem">{cate}</Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </MediaQuery>
    </>
  );
};
