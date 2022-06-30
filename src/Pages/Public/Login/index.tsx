import React, { useState } from "react";
import styles from "Styles/authentication.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginSchema from "Schema/loginSchema";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import startLogin from "Store/Authentication/Login/action";
import { AppDispatch } from "Store";

const Login: React.FC = () => {
  const [remember, setRemember] = useState(false);
  const [togglePassword, setTogglePassword] = useState("password");
  const loginReducer = useSelector((state: any) => state.loginReducer);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const initalState = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: any) => {
    dispatch(startLogin(values.email, values.password, history));
  };

  const handleChange = () => {
    setRemember(!remember);
  };

  return (
    <React.Fragment>
      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.login_haeders}>
            <span className={styles.green_bg}>
              <i className="far fa-sign-in"></i>
            </span>
            <span className={styles.heading_text}>Log in</span>
          </div>
          <p className={styles.benefit}>
            Become a user - you can access all the features of Instructor Hiring
            App.
          </p>
          <hr className="hr_tag" />
          <div className={styles.login_form}>
            <Formik
              initialValues={initalState}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="w_100">
                    <label htmlFor="email" className="form_label">
                      Email <span className="required">*</span>
                    </label>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className={
                        errors.email && touched.email
                          ? "form_error form_control"
                          : "form_control"
                      }
                    />
                    <p className="error_texts">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div className="w_100">
                    <label htmlFor="password" className="form_label">
                      Password <span className="required">*</span>
                    </label>
                    <span className={styles.togglePassword}>
                      <Field
                        type={togglePassword}
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className={
                          errors.password && touched.password
                            ? "form_error form_control"
                            : "form_control"
                        }
                      />
                      {togglePassword === "password" ? (
                        <i
                          className="fas fa-lock"
                          onClick={() => setTogglePassword("text")}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-unlock"
                          onClick={() => setTogglePassword("password")}
                        ></i>
                      )}
                    </span>
                    <p className="error_texts">
                      <ErrorMessage name="password" />
                    </p>
                  </div>
                  <div className={styles.justify_bt}>
                    <div onClick={handleChange}>
                      {remember ? (
                        <i className="fas fa-check-square checked"></i>
                      ) : (
                        <i className="far fa-square"></i>
                      )}
                      <span>Remember me</span>
                    </div>
                    <Link to="/signup">Forgot password?</Link>
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="form_submit"
                      disabled={loginReducer.processing}
                    >
                      {loginReducer.processing
                        ? loginReducer.processingMessage
                        : "Log in"}
                    </button>
                  </div>
                  {loginReducer.error ? (
                    <div className="mt-2 text-danger text-center font_14">
                      {loginReducer.errorMessage}
                    </div>
                  ) : null}
                </Form>
              )}
            </Formik>
          </div>
          <hr className="hr_tag" />
          <div className={styles.useful_link}>
            <p>Don't have an account?</p>
            <Link to="/signup">Sign up</Link>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Login;
