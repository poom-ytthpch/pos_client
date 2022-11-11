import { styled } from "@mui/material/styles";
import { Drawer } from "@mui/material";
import Config from "../../../config.json";

const MyDrawer = styled(Drawer)({
  "& 	.MuiDrawer-paper": {
    color: Config.color,
    backgroundColor: Config.bgColor,
  },
});

export default MyDrawer;
