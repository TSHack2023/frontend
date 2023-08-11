import React from "react";
import { Button, Modal } from "react-bootstrap";

interface errorProps {
  show: boolean;
  errMsg: string;
  errCode: string;
  setShow: (value: React.SetStateAction<boolean>) => void;
  redirectURL?: string;
}

const ErrorPop = (props: errorProps): JSX.Element => {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>{props.errMsg}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.errCode}</Modal.Body>
      <Modal.Footer>
        <Button
          href={props.redirectURL}
          onClick={() => {
            props.setShow(false);
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorPop;
