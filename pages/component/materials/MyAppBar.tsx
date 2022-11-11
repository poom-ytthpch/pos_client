import { styled } from "@mui/material/styles";
import { AppBar } from "@mui/material";

import Config from "../../../config.json";

const MyAppBar = styled(AppBar)({
  color: Config.color,
  backgroundColor: Config.bgColor,
});

export default MyAppBar;
