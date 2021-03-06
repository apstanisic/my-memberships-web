import { Box, Button, TextField } from "@material-ui/core";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { attemptLogin } from "src/components/Auth/authSlice";
import { AppDispatch } from "src/store/store";
import { AuthCard } from "./AuthCard";
import { AuthFooter } from "./AuthFooter";
import { loginValidation } from "./authValidation";

export function LoginPage() {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const snackbar = useSnackbar();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidation}
      validateOnChange={false}
      onSubmit={async (data, helpers) => {
        const { email, password } = data;
        try {
          await dispatch(attemptLogin(email, password));
          history.push("/");
        } catch (error) {
          helpers.setFieldValue("password", "");
          snackbar.enqueueSnackbar("Login failed. Please try again.", {
            variant: "error",
          });
        }
      }}
    >
      {props => (
        <div className="center min-h-screen mx-auto flex flex-col bg-blue-700 px-2">
          <AuthCard>
            <form onSubmit={props.handleSubmit}>
              <Box py={1}>
                <TextField
                  value={props.values.email}
                  onChange={props.handleChange}
                  // error={Boolean(props.errors.email)}
                  type="email"
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  {...(props.errors.email && {
                    error: true,
                    helperText: props.errors.email,
                  })}
                />
              </Box>
              <Box py={1}>
                <TextField
                  value={props.values.password}
                  onChange={props.handleChange}
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  fullWidth={true}
                  {...(props.errors.password && {
                    error: true,
                    helperText: props.errors.password,
                  })}
                />
              </Box>
              <Box py={1}>
                <Button
                  type="submit"
                  disabled={props.isSubmitting}
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </AuthCard>
          <AuthFooter type="login" />
        </div>
      )}
    </Formik>
  );
}
