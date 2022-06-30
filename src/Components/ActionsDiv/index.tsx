import React from "react";

interface IProps {
  setCreateOne?: any;
  handleSearch?: any;
}

const ActionsDiv: React.FC<IProps> = ({ setCreateOne, handleSearch }) => {
  return (
    <React.Fragment>
      <div className="mt-4">
        <div className="row bg_nav rounded align-items-center p-2 m-0">
          <div className="col-md-6 text-dark">
            <div className="row align-items-center">
              <label htmlFor="search" className="col-sm-2 col-form-label">
                Billings
              </label>
              <div className="col-sm-10">
                <input
                  onChange={handleSearch}
                  type="text"
                  className="form-control form-control-sm"
                  id="search"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <button
              className="btn btn-sm btn_common rounded px-3"
              onClick={() => setCreateOne(true)}
            >
              Add New Bill
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActionsDiv;
