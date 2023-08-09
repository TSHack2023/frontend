import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface Props {
  id: number;
  func: (id: number) => void;
}

const EvalItem = (props: Props): JSX.Element => {
  const itemId = props.id;
  const [evalname, setEvalName] = useState("");
  const [evalmax, setEvalmax] = useState<number>(0);
  const [evalmin, setEvalmin] = useState<number>(0);
  const [explanation, setExplanation] = useState("");
  return (
    <>
      <Form>
        <Form.Group as={Row} className="mt-5" controlId="evaluation">
          <Form.Label column sm="1">
            評価項目
          </Form.Label>
          <Col sm="2">
            <Form.Control
              type="text"
              value={evalname}
              onChange={(e) => {
                setEvalName(e.target.value);
              }}
            />
          </Col>

          <Form.Label column sm="2">
            評価値最大値
          </Form.Label>
          <Col sm="2">
            <Form.Control
              type="number"
              value={evalmax}
              onChange={(e) => {
                setEvalmax(Number(e.target.value));
              }}
            />
          </Col>

          <Form.Label column sm="2">
            評価値最小値
          </Form.Label>
          <Col sm="2">
            <Form.Control
              type="number"
              value={evalmin}
              onChange={(e) => {
                setEvalmin(Number(e.target.value));
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2" controlId="explanation">
          <Form.Label column sm="1">
            説明
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={explanation}
              onChange={(e) => {
                setExplanation(e.target.value);
              }}
            />
          </Col>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              props.func(itemId);
            }}
          >
            項目を削除
          </Button>{" "}
        </Form.Group>
      </Form>
    </>
  );
};

export default EvalItem;
