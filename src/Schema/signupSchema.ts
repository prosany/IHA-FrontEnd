import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required")
    .matches(/^[\w.+]+@gmail\.com$/, "Email must be gmail."),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Both password need to be the same")
    .required("Confirm password is required"),
});

export default signupSchema;
