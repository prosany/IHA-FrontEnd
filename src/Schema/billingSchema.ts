import * as yup from "yup";

const billingSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w.+]+@gmail\.com$/, "Email must be gmail."),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/,
      "Phone must be valid."
    )
    .min(11, "Phone must be valid 11 digit number"),
  paid_amount: yup.number().required("Paid amount is required"),
});

export default billingSchema;
