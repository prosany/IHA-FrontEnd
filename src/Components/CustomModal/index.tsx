import React from "react";
import { Modal, ModalBody } from "reactstrap";

interface IProps {
  open?: boolean;
  size?: string;
  toggle?: any;
  children?: React.ReactNode | any;
}

const CustomModal: React.FC<IProps> = ({ open, size, toggle, children }) => {
  return (
    <React.Fragment>
      <Modal isOpen={open} size={size} centered={true} toggle={toggle}>
        <ModalBody className="modal_btn">{children}</ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default CustomModal;
