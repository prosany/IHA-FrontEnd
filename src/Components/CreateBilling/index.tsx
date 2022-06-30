import CustomModal from "Components/CustomModal";
import React from "react";
import styles from "Styles/authentication.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import billingSchema from "Schema/billingSchema";
import { post } from "API/Helpers";
import { useDispatch } from "react-redux";
import { storeUserData } from "Store/Authentication/Login/action";

interface IProps {
  data?: any;
  token?: any;
  mutate?: any;
  createOne?: boolean;
  setCreateOne?: any;
  pageNumber?: any;
  search?: any;
  email?: any;
}

const CreateBilling: React.FC<IProps> = ({
  data,
  token,
  mutate,
  createOne,
  setCreateOne,
  pageNumber,
  search,
  email,
}) => {
  const dispatch = useDispatch();
  const initalState = {
    full_name: "",
    email: email,
    phone: "",
    paid_amount: "",
  };
  const craeteBilling = async (values: any) => {
    try {
      const response = await post("/add-billing", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 1) {
        setCreateOne(false);
        mutate([`/billing-list?page=${pageNumber}&search=${search}`, token]);
      } else {
        if (response.message === "Invalid token") {
          dispatch(storeUserData("", ""));
        }
        setCreateOne(false);
        const revertBack = {
          ...data,
          results: data.results.filter(
            (data: { billing_id: any }) => data.billing_id
          ),
        };
        mutate(
          [`/billing-list?page=${pageNumber}&search=${search}`, token],
          revertBack,
          false
        );
      }
    } catch (error: any) {
      setCreateOne(false);
      if (error.response.data.message === "Invalid token") {
        dispatch(storeUserData("", ""));
      }
      const revertBack = {
        ...data,
        results: data.results.filter(
          (data: { billing_id: any }) => data.billing_id
        ),
      };
      mutate(
        [`/billing-list?page=${pageNumber}&search=${search}`, token],
        revertBack,
        false
      );
    }
  };
  return (
    <CustomModal open={createOne} toggle={() => setCreateOne(!createOne)}>
      <div className="w-100 mx-auto">
        <span className="close_modal" onClick={() => setCreateOne(!createOne)}>
          <i className="fal fa-times"></i>
        </span>
        <div className={styles.login_form}>
          <Formik
            initialValues={initalState}
            validationSchema={billingSchema}
            onSubmit={craeteBilling}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="w_100 mt-4">
                  <label htmlFor="full_name" className="form_label">
                    Full Name <span className="required">*</span>
                  </label>
                  <Field
                    type="text"
                    name="full_name"
                    id="full_name"
                    placeholder="Enter your Full Name"
                    className={
                      errors.full_name && touched.full_name
                        ? "form_error form_control"
                        : "form_control"
                    }
                  />
                  <p className="error_texts">
                    <ErrorMessage name="full_name" />
                  </p>
                </div>
                <div className="w_100">
                  <label htmlFor="email" className="form_label">
                    Email <span className="required">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    className={
                      errors.email && touched.email
                        ? "form_error form_control"
                        : "form_control"
                    }
                    value={email || ""}
                  />
                  <p className="error_texts">
                    <ErrorMessage name="email" />
                  </p>
                </div>
                <div className="w_100">
                  <label htmlFor="phone" className="form_label">
                    Phone <span className="required">*</span>
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone"
                    className={
                      errors.phone && touched.phone
                        ? "form_error form_control"
                        : "form_control"
                    }
                  />
                  <p className="error_texts">
                    <ErrorMessage name="phone" />
                  </p>
                </div>
                <div className="w_100">
                  <label htmlFor="paid_amount" className="form_label">
                    Paid Amount <span className="required">*</span>
                  </label>
                  <Field
                    type="number"
                    name="paid_amount"
                    id="paid_amount"
                    placeholder="Enter your paid amount"
                    className={
                      errors.paid_amount && touched.paid_amount
                        ? "form_error form_control"
                        : "form_control"
                    }
                  />
                  <p className="error_texts">
                    <ErrorMessage name="paid_amount" />
                  </p>
                </div>
                <div className="mt-3">
                  <button type="submit" className="form_submit">
                    Create Billing
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateBilling;
