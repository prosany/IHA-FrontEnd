import CustomTable from "Components/CustomTable";
import React from "react";
import Sorting from "Helpers/sorting";
import Spinner from "Components/Spinner";

interface IProps {
  billings?: any;
  error?: any;
  deleteBilling?: any;
  editBilling?: any;
  pageNumber?: any;
  setPageNumber?: any;
  pages?: any;
}

const TableData: React.FC<IProps> = ({
  billings,
  error,
  deleteBilling,
  editBilling,
  pageNumber,
  setPageNumber,
  pages,
}) => {
  const tableHead = [
    "Billing ID",
    "Full Name",
    "Email",
    "Phone",
    "Paid Amount",
    "Action",
  ];
  const handlePageChange = async (page: any) => {
    await setPageNumber(page);
  };
  return (
    <>
      <CustomTable tableHead={tableHead}>
        {billings === undefined || error
          ? ""
          : billings !== undefined &&
            Sorting(billings?.results).map((billing: any) => (
              <tr className="text-center" key={billing.billing_id}>
                <td className="align-middle">
                  {!billing.billing_id ? (
                    <Spinner text={"Generating Id"} />
                  ) : (
                    billing.billing_id
                  )}
                </td>
                <td className="align-middle">
                  <span style={{ textTransform: "capitalize" }}>
                    {billing.full_name}
                  </span>
                </td>
                <td className="align-middle">
                  <span>{billing.email}</span>
                </td>
                <td className="align-middle">
                  <span>{billing.phone}</span>
                </td>
                <td className="align-middle">
                  <span>${billing.paid_amount}</span>
                </td>
                <td
                  className="align-middle"
                  style={{ textTransform: "capitalize" }}
                >
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-sm mr-2"
                      onClick={() => editBilling(billing.billing_id)}
                    >
                      Edit
                    </button>{" "}
                    |
                    <button
                      className="btn btn-sm mr-2"
                      onClick={() => deleteBilling(billing.billing_id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
      </CustomTable>

      {billings?.pagination?.total > 10 && (
        <div className="d-flex justify-content-center my-3">
          <nav className="mt-3">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber - 1)}
                  disabled={pageNumber === 1}
                >
                  <i className="fal fa-angle-left"></i> Prev
                </button>
              </li>
              {pages.map((page: any) => (
                <li
                  key={page}
                  className={`page-item ${pageNumber === page ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber + 1)}
                  disabled={pageNumber === pages.length}
                >
                  Next <i className="fal fa-angle-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default TableData;
