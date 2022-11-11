import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import Config from "../../../config.json";

const MyLoadingButton = styled(LoadingButton)({
  color: "black",
  borderColor: "black",
  "&:hover": { borderColor: "grey", color: "grey" },
});

export default MyLoadingButton;
