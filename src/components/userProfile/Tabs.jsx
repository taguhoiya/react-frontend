import { memo, useContext, useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MarkIcon from "@mui/icons-material/RateReview";
import ClipIcon from "@mui/icons-material/Bookmark";
import { Loader, SubLoaderTab } from "../accessories/Loader";
import { TabPanel } from "./Tabpanel";
import { ClipTabPanel } from "./ClipTabPanel";
import { useLocation } from "react-router-dom";
import { FavoTabPanel } from "./FavoTabPanel";
import { MarkTabPanel } from "./MarkTabPanel";
import MediaQuery from "react-responsive";
import { UserInfoContext } from "../providers/UserInfoProvider";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export const TabsBasic = memo(() => {
  const { favorites, marks, clips } = useContext(UserInfoContext);
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
      <MediaQuery query="(max-width: 768px)">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<MarkIcon fontSize="small" />} label="Marks" {...a11yProps(0)} />
          <Tab icon={<ClipIcon fontSize="small" />} label="Clips" {...a11yProps(1)} />
          <Tab icon={<FavoriteIcon fontSize="small" />} label="Favos" {...a11yProps(2)} />
        </Tabs>
      </MediaQuery>

      <MediaQuery query="(min-width: 768px)">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab icon={<MarkIcon />} label="Marks" {...a11yProps(0)} />
          <Tab icon={<ClipIcon />} label="Clips" {...a11yProps(1)} />
          <Tab icon={<FavoriteIcon />} label="Favos" {...a11yProps(2)} />
        </Tabs>
      </MediaQuery>

      <TabPanel value={value} index={0}>
        {!marks[0] ? <SubLoaderTab state={true} /> : <MarkTabPanel />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {!clips[0] ? <SubLoaderTab state={true} /> : <ClipTabPanel />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {!favorites[0] ? <SubLoaderTab state={true} /> : <FavoTabPanel />}
      </TabPanel>
    </>
  );
});
