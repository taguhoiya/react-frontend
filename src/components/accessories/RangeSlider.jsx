import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import { memo, useCallback } from "react";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "5.0",
  },
  {
    value: 2.5,
    label: "2.5",
  },
];

export const DiscreteSliderValues = memo(() => {
  return (
    <>
      <Box sx={{ width: "60%", margin: "0 auto" }}>
        <Slider
          aria-label="Small steps"
          defaultValue={3}
          step={0.1}
          min={0}
          max={5}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
    </>
  );
});
const Input = styled(MuiInput)`
  width: 42px;
`;

export const InputSlider = memo((props) => {
  const setValue = props.setValue;
  const value = props.value;
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = useCallback(() => {
    if (value < 0) {
      setValue(0);
    } else if (value > 5) {
      setValue(5);
    }
  }, [setValue, value]);
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Typography id="input-slider" gutterBottom>
        Score
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs>
          <Slider
            aria-label="Small steps"
            defaultValue={3}
            step={0.1}
            min={0}
            max={5}
            valueLabelDisplay="auto"
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            marks={marks}
            color="warning"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            color="warning"
            inputProps={{
              step: 0.1,
              min: 0,
              max: 5,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
});
