import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { attemptLogin } from "store/auth/authActions";
import { AsyncDispatch } from "store/stateTypes";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginValidation } from "./authValidation";

export function Login() {
  const dispatch: AsyncDispatch = useDispatch();
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
          history.push("panel");
        } catch (error) {}
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={props.isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
