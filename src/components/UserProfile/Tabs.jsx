import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MarkIcon from "@mui/icons-material/RateReview";
import ClipIcon from "@mui/icons-material/Bookmark";
import { Loader } from "../Loader";
import { TabPanel } from "./Tabpanel";
import { ClipTabPanel } from "./ClipTabPanel";
import { useLocation } from "react-router-dom";
import { FavoTabPanel } from "./FavoTabPanel";
import { MarkTabPanel } from "./MarkTabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const TabsBasic = (props) => {
  const { marks, clips, favorites } = props.data;
  const [value, setValue] = useState(0);
  const location = useLocation();
  const state = location.state;
  useEffect(() => {
    if (state) {
      setValue(state.num);
    }
  }, [state]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Loader state={false} />
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<MarkIcon />} label="MARKS" {...a11yProps(0)} />
        <Tab icon={<ClipIcon />} label="Clips" {...a11yProps(1)} />
        <Tab icon={<FavoriteIcon />} label="FAVORITES" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MarkTabPanel marks={marks} clips={clips} favorites={favorites} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ClipTabPanel clips={clips} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FavoTabPanel favorites={favorites} clips={clips} marks={marks} />
      </TabPanel>
    </>
  );
};
