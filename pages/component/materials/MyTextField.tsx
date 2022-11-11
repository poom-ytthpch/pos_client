import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Config from "../../../config.json";

const MyTextField = styled(TextField)({
  "& input.Mui-input": {
    color: "#5E07A0",
  },
  "& label.Mui-focused": {
    color: Config.color,
  },
  "& label": {
    color: Config.color,
  },
  "& input": {
    color: Config.color,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "grey",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: Config.color,
    },
    "& label": {
      color: Config.color,
    },
    "&:hover fieldset": {
      borderColor: Config.color,
      color: Config.color,
    },
    "&.Mui-focused fieldset": {
      borderColor: Config.color,
      color: Config.color,
    },
  },
});

export default MyTextField;
