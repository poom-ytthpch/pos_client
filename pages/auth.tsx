import * as React from "react";
import { NextPage } from "next";
import Default from "./component/Default";
import { Box } from "@mui/material";
import MyTextField from "./component/materials/MyTextField";
import { FormControl } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MyLoadingButton from "./component/materials/MyLoadingButton";
import LoginIcon from "@mui/icons-material/Login";

const Auth: NextPage = (): React.ReactElement => {
  return (
    <Box title="auth" className="bg-dot">
      <Box className="centered">
        <Box className="auth-box">
          <Box className="auth-box-image"></Box>
          <Box className="auth-box-form">
            <FormControl variant="outlined" className="auth-box-form-control">
              <Box className="auth-box-form-header">
                <p className="text-color text-3xl font-bold">MEAW POS</p>
              </Box>
              <MyTextField
                id="email"
                label="Email"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <MyTextField
                id="password"
                label="Password"
                type="password"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <MyLoadingButton
                size="large"
                variant="outlined"
                startIcon={<LoginIcon />}
              >
                SignIn
              </MyLoadingButton>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
