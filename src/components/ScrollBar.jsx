import { Typography } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";

export const ScrollBar = (props) => {
  const { content } = props;
  return (
    <Scrollbars autoHeight autoHeightMin={130} autoHeightMax={130}>
      <Typography variant="body2">{content}</Typography>
    </Scrollbars>
    // <List className="py-0">
    //   <div className="scroll-area rounded bg-white shadow-overflow">
    //     <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={200}>
    //       <ListItem className="py-3 border-0">
    //         <div className="align-box-row w-100">
    //           <div className="mr-3">
    //             <div className="bg-neutral-dark text-primary text-center font-size-xl d-60 rounded-sm"></div>
    //           </div>
    //           <div>
    //             <div className="font-weight-bold d-block opacity-8">Customers</div>
    //             <div className="text-dark opacity-5">
    //               A wonderful serenity has taken possession of my entire soul.
    //             </div>
    //           </div>
    //         </div>
    //       </ListItem>
    //       <Divider />
    //       <ListItem className="py-3 border-0">
    //         <div className="align-box-row w-100">
    //           <div>
    //             <div className="font-weight-bold d-block opacity-8">New articles</div>
    //             <div className="text-dark opacity-5">
    //               I am alone, and feel the charm of existence in this spot.
    //             </div>
    //           </div>
    //         </div>
    //       </ListItem>
    //       <Divider />
    //       <ListItem className="py-3 border-0">
    //         <div className="align-box-row w-100">
    //           <div>
    //             <div className="font-weight-bold d-block opacity-8">Blog posts</div>
    //             <div className="text-dark opacity-5">
    //               When, while the lovely valley teems with vapour around me.
    //             </div>
    //           </div>
    //         </div>
    //       </ListItem>
    //       <Divider />
    //       <ListItem className="py-3 border-0">
    //         <div className="align-box-row w-100">
    //           <div>
    //             <div className="font-weight-bold d-block opacity-8">Google maps</div>
    //             <div className="text-dark opacity-5">
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //             </div>
    //           </div>
    //         </div>
    //       </ListItem>
    //     </Scrollbars>
    //   </div>
    // </List>
  );
};
