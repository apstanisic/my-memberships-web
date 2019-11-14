import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "store/authSlice";
import { AppDispatch } from "store/store";
import { registerValidation } from "./authValidation";

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
        <form onSubmit={props.handleSubmit}>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field type="password" name="confirmed" />
          <ErrorMessage name="confirmed" component="div" />
          <button type="submit" disabled={props.isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}
