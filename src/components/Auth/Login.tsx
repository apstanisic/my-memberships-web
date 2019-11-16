import { Button, makeStyles, TextField } from "@material-ui/core";
import { attemptLogin } from "components/Auth/authSlice";
import { Center } from "components/common/Center";
import { Padding } from "components/common/Padding";
import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "store/store";
import { AuthCard } from "./AuthCard";
import { AuthFooter } from "./AuthFooter";
import { loginValidation } from "./authValidation";

export function Login() {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

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
        } catch (error) {}
      }}
    >
      {props => (
        <Center className="min-h-screen mx-auto flex flex-col bg-blue-700 px-2">
          <AuthCard>
            <form onSubmit={props.handleSubmit}>
              <Padding side="y" size={2}>
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
                    helperText: props.errors.email
                  })}
                />
              </Padding>
              <Padding side="y" size={2}>
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
                    helperText: props.errors.password
                  })}
                />
              </Padding>
              <Padding size={2} side="y">
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
              </Padding>
            </form>
          </AuthCard>
          <AuthFooter type="login" />
        </Center>
      )}
    </Formik>
  );
}
