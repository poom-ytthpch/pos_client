import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyTextField = styled(TextField)({
  "& input.Mui-input": {
    color: "#5E07A0",
  },
  "& label.Mui-focused": {
    color: "#FFFF",
  },
  "& label": {
    color: "#FFFF",
  },
  "& input": {
    color: "#FFFF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#FFFF",
    },
    "& label": {
      color: "#FFFF",
    },
    "&:hover fieldset": {
      borderColor: "#FFFF",
      color: "#FFFF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFFF",
      color: "#FFFF",
    },
  },
});

export default MyTextField;
