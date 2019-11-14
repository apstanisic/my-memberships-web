import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { attemptLogin } from "store/authSlice";
import { loginValidation } from "./authValidation";
import { AppDispatch } from "store/store";

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
