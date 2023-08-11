import React from "react";
import { Modal } from "react-bootstrap";

interface errorProps {
  show: boolean;
  errMsg: string;
  errCode: string;
  setShow: (value: React.SetStateAction<boolean>) => void;
}

const ErrorPop = (props: errorProps): JSX.Element => {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
      }}
    >
      <Modal.Header
        closeButton
        onClick={() => {
          props.setShow(false);
        }}
      >
        <Modal.Title>{props.errMsg}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.errCode}</Modal.Body>
    </Modal>
  );
};

export default ErrorPop;
