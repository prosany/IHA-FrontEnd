import CustomModal from "Components/CustomModal";
import React from "react";
import styles from "Styles/authentication.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import billingSchema from "Schema/billingSchema";
import { post } from "API/Helpers";
import { storeUserData } from "Store/Authentication/Login/action";
import { useDispatch } from "react-redux";

interface IProps {
  data?: any;
  token?: any;
  mutate?: any;
  createOne?: boolean;
  setCreateOne?: any;
  deafultData?: any;
  pageNumber?: any;
  search?: any;
  email?: any;
}

const ModifyBilling: React.FC<IProps> = ({
  data,
  token,
  mutate,
  createOne,
  setCreateOne,
  deafultData,
  pageNumber,
  search,
  email,
}) => {
  const dispatch = useDispatch();
  const initalState = {
    full_name: deafultData.full_name,
    email: email || deafultData.email,
    phone: deafultData.phone,
    paid_amount: deafultData.paid_amount,
  };
  const modifyBilling = async (values: any) => {
    try {
      const instant = {
        ...data,
        results: [
          ...data.results,
          { ...values, updatedAt: new Date().toISOString() },
        ],
      };
      mutate(
        [`/billing-list?page=${pageNumber}&search=${search}`, token],
        instant,
        false
      );
      const response = await post(
        `/update-billing/${deafultData.billing_id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 1) {
        setCreateOne(false);
      } else {
        if (response.data.message === "Invalid token") {
          dispatch(storeUserData("", ""));
        }
        setCreateOne(false);
      }
      mutate([`/billing-list?page=${pageNumber}&search=${search}`, token]);
    } catch (error: any) {
      if (error.response.data.message === "Invalid token") {
        dispatch(storeUserData("", ""));
      }
      setCreateOne(false);
      mutate([`/billing-list?page=${pageNumber}&search=${search}`, token]);
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
            onSubmit={modifyBilling}
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
                    disabled={true}
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
                    Update Billing
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

export default ModifyBilling;
