import { Button, TextField, Box } from "@material-ui/core";
import { registerUser } from "src/components/Auth/authSlice";
import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppDispatch } from "src/store/store";
import { AuthCard } from "./AuthCard";
import { AuthFooter } from "./AuthFooter";
import { registerValidation } from "./authValidation";
import { TextInput } from "../AdminPanel/common/input/TextInput";

export function RegisterPage() {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmed: "", name: "" }}
      validationSchema={registerValidation}
      validateOnChange={false}
      onSubmit={async (data, helpers) => {
        const { email, password, name } = data;
        try {
          await dispatch(registerUser(email, password, { name }));
          history.push("/panel");
        } catch (error) {}
      }}
    >
      {props => (
        <div className="center min-h-screen mx-auto flex flex-col bg-blue-700 px-2">
          <AuthCard>
            <form onSubmit={props.handleSubmit}>
              <TextInput form={props} name="name" />
              <TextInput form={props} type="email" name="email" />
              <TextInput form={props} type="password" name="password" />
              <TextInput form={props} type="password" name="confirmed" label="Confirm password" />

              <Box pt={1}>
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
        </div>
      )}
    </Formik>
  );
}
