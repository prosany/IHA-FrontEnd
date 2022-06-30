import React, { useState } from "react";
import styles from "Styles/authentication.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useHistory } from "react-router-dom";
import signupSchema from "Schema/signupSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "Store";
import startReg from "Store/Authentication/Signup/action";

const Signup: React.FC = () => {
  const [togglePassword, setTogglePassword] = useState("password");
  const signupReducer = useSelector((state: any) => state.signupReducer);
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const initalState = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: any) => {
    dispatch(startReg(values.email, values.password, history));
  };

  return (
    <React.Fragment>
      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.login_haeders}>
            <span className={styles.green_bg}>
              <i className="far fa-sign-in"></i>
            </span>
            <span className={styles.heading_text}>Sign up</span>
          </div>
          <p className={styles.benefit}>
            Become a user - you can access all the features of Instructor Hiring
            App.
          </p>
          <hr className="hr_tag" />
          <div className={styles.login_form}>
            <Formik
              initialValues={initalState}
              validationSchema={signupSchema}
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
                  <div className="w_100">
                    <label htmlFor="confirmPassword" className="form_label">
                      Confirm Password <span className="required">*</span>
                    </label>
                    <span className={styles.togglePassword}>
                      <Field
                        type={togglePassword}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Enter your password again"
                        className={
                          errors.confirmPassword && touched.confirmPassword
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
                      <ErrorMessage name="confirmPassword" />
                    </p>
                  </div>

                  <div className="mt-3">
                    <button
                      type="submit"
                      className="form_submit"
                      disabled={signupReducer.processing}
                    >
                      {signupReducer.processing
                        ? signupReducer.processingMessage
                        : "Sign up"}
                    </button>
                  </div>
                  {signupReducer.error ? (
                    <div className="mt-2 text-danger text-center font_14">
                      {signupReducer.errorMessage}
                    </div>
                  ) : null}
                </Form>
              )}
            </Formik>
          </div>
          <hr className="hr_tag" />
          <div className={styles.useful_link}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Signup;
