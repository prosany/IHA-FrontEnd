import React from "react";
import { Table } from "reactstrap";

interface CustomTableProps {
  tableHead: string[];
  children?: React.ReactNode;
  isButton?: boolean;
  handleFunction?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  buttonName?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  tableHead,
  children,
  isButton,
  handleFunction,
  buttonName,
}) => {
  return (
    <React.Fragment>
      <div className="table-responsive w-100 mt-3">
        <Table className="table table-hover m-0 border rounded table-centered table-nowrap">
          <thead className="border-0 table_head">
            <tr className="border-0">
              {tableHead.map((data, idx) => (
                <th key={idx} className="text-center table_text">
                  {data}
                </th>
              ))}
              {isButton && (
                <th>
                  <button {...handleFunction}>
                    {buttonName} <i className="fas fa-plus mx-2"></i>
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="border-0">{children}</tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default CustomTable;
