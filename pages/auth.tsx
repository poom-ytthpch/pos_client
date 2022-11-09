import * as React from "react";
import { NextPage } from "next";
import Default from "./component/Default";
import { Box } from "@mui/material";
import MyTextField from "./component/materials/MyTextField";
import { FormControl } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import MyLoadingButton from "./component/materials/MyLoadingButton";

const Auth: NextPage = (): React.ReactElement => {
  return (
    <Box title="auth" className="bg-dot">
      <Box className="centered">
        <Box className="auth-box">
          <Box className="auth-box-image"></Box>
          <Box className="auth-box-form">
            <FormControl>
              <h1>POS</h1>
              <MyTextField
                id="email"
                label="Email"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <MyTextField
                className="mt-10"
                id="password"
                label="Password"
                type="password"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <MyLoadingButton
                className="mt-10"
                size="large"
                variant="outlined"
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
