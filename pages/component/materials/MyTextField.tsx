import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyTextField = styled(TextField)({
  "& input.Mui-input": {
    color: "#5E07A0",
  },
  "& label.Mui-focused": {
    color: "#778899",
  },
  "& label": {
    color: "#778899",
  },
  "& input": {
    color: "#778899",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#778899",
    },
    "& label": {
      color: "#778899",
    },
    "&:hover fieldset": {
      borderColor: "#778899",
      color: "#778899",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#778899",
      color: "#778899",
    },
  },
});

export default MyTextField;
