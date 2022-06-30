import { numberWithCommas } from "Helpers/numberWithComma";
import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  data?: any;
}

const Header: React.FC<IProps> = ({ data }) => {
  return (
    <React.Fragment>
      <div className="row shadow-sm px-5 py-3 w-100 m-auto">
        <div className="col-md-6">
          <Link to="/" className="ancor logo">
            Instructor Hiring App
          </Link>
        </div>
        <div className="col-md-6 text-end">
          Taid Total:{" "}
          {numberWithCommas(
            data?.results?.reduce(
              (total: number, item: any) => total + item?.paid_amount,
              0
            )
          ) || 0}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
