import React, { useState } from "react";
import { Form } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import Container from "react-bootstrap/Container";

interface Props {
  name: string;
  min: number;
  max: number;
  explanation: string;
}

const ReviewItem = (props: Props): JSX.Element => {
  const initValue = Math.round((props.min + props.max) / 2).toString();
  const [value, setValue] = useState<string>(initValue);

  const setValidValue = (valueString: string): void => {
    if (Number.isNaN(valueString)) {
      setValue(initValue.toString());
    } else {
      const valueNum = parseInt(valueString, 10);
      if (Number.isNaN(valueString)) {
        setValue(initValue.toString());
      } else {
        if (valueNum <= props.min) {
          setValue(props.min.toString());
        } else if (valueNum >= props.max) {
          setValue(props.max.toString());
        } else {
          setValue(valueNum.toString());
        }
      }
    }
  };

  return (
    <Container className="my-5">
      <Form>
        <Form.Group>
          <Form.Label>{props.name}</Form.Label>
          <div className="form-inline m-4">
            <Form.Text className="mx-3">{props.min}</Form.Text>
            <RangeSlider
              value={value}
              min={props.min}
              max={props.max}
              onChange={(event) => {
                setValidValue(event.target.value);
              }}
            />
            <Form.Text className="mx-3">{props.max}</Form.Text>
            <Form.Control
              type="number"
              value={value}
              onChange={(event) => {
                setValidValue(event.target.value);
              }}
              className="ml-5"
            />
          </div>
          <Form.Text className="ml-3">{props.explanation}</Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ReviewItem;
