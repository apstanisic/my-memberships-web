import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "components/Auth/authSlice";
import { AppDispatch } from "store/store";
import { registerValidation } from "./authValidation";
import { Center } from "components/common/Center";
import { AuthCard } from "./AuthCard";
import { Padding } from "components/common/Padding";
import { TextField, Button } from "@material-ui/core";
import { AuthFooter } from "./AuthFooter";

export function Register() {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "", confirm: "" }}
      validationSchema={registerValidation}
      validateOnChange={false}
      onSubmit={async (data, helpers) => {
        const { email, password } = data;
        try {
          await dispatch(registerUser(email, password));
          history.push("panel");
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
                  type="email"
                  label="Email"
                  name="password"
                  variant="outlined"
                  fullWidth
                />
              </Padding>
              <ErrorMessage name="email" component="div" />
              <Padding side="y" size={2}>
                <TextField
                  value={props.values.email}
                  onChange={props.handleChange}
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  error={Boolean(props.errors.password)}
                  fullWidth={true}
                />
              </Padding>
              <ErrorMessage name="password" component="div" />

              <Padding side="y" size={2}>
                <TextField
                  value={props.values.confirm}
                  onChange={props.handleChange}
                  label="Confirm password"
                  type="password"
                  name="confirmed"
                  variant="outlined"
                  error={Boolean(props.errors.confirm)}
                  fullWidth={true}
                />
              </Padding>
              <ErrorMessage name="password" component="div" />
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
          <AuthFooter type="register" />
        </Center>
      )}
    </Formik>
  );
}
