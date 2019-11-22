import { Button, TextField, Box } from "@material-ui/core";
import { registerUser } from "components/Auth/authSlice";
import { Center } from "components/common/Center";
import { Padding } from "components/common/Padding";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "store/store";
import { AuthCard } from "./AuthCard";
import { AuthFooter } from "./AuthFooter";
import { registerValidation } from "./authValidation";

export function Register() {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmed: "" }}
      validationSchema={registerValidation}
      validateOnChange={false}
      onSubmit={async (data, helpers) => {
        const { email, password } = data;
        try {
          await dispatch(registerUser(email, password));
          history.push("/panel");
        } catch (error) {}
      }}
    >
      {props => (
        <Center className="min-h-screen mx-auto flex flex-col bg-blue-700 px-2">
          <AuthCard>
            <form onSubmit={props.handleSubmit}>
              <Box py={1}>
                <TextField
                  value={props.values.email}
                  onChange={props.handleChange}
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
                  fullWidth
                  {...(props.errors.password && {
                    error: true,
                    helperText: props.errors.password,
                  })}
                />
              </Box>

              <Box py={1}>
                <TextField
                  value={props.values.confirmed}
                  onChange={props.handleChange}
                  label="Confirm password"
                  type="password"
                  name="confirmed"
                  variant="outlined"
                  fullWidth={true}
                  {...(props.errors.confirmed && {
                    error: true,
                    helperText: props.errors.confirmed,
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
          <AuthFooter type="register" />
        </Center>
      )}
    </Formik>
  );
}
