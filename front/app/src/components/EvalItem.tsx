import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface Props {
  id: number;
  deleteItem: (id: number) => void;
  changeIteminfo: (id: number, evalname: string, evalmin: number, evalmax: number, explanation: string) => void;
}

export type Items = {
  id: number;
  evalname: string;
  evalmin: number;
  evalmax: number;
  explanation: string;
}

const EvalItem = (props: Props): JSX.Element => {
  const [item, setItem] = useState<Items>(
    {id: props.id, evalname: "", evalmax: 0, evalmin: 0, explanation: ""}
  );

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
              value={item.evalname}
              onChange={(e) => {
                setItem({...item, evalname: e.target.value})
                props.changeIteminfo(item.id, item.evalname, item.evalmin, item.evalmax, item.explanation);
              }}
            />
          </Col>

          <Form.Label column sm="2">
            評価値最大値
          </Form.Label>
          <Col sm="2">
            <Form.Control
              type="number"
              value={item.evalmax}
              onChange={(e) => {
                setItem({...item, evalmax: Number(e.target.value)});
                props.changeIteminfo(item.id, item.evalname, item.evalmin, item.evalmax, item.explanation);
              }}
            />
          </Col>

          <Form.Label column sm="2">
            評価値最小値
          </Form.Label>
          <Col sm="2">
            <Form.Control
              type="number"
              value={item.evalmin}
              onChange={(e) => {
                setItem({...item, evalmin: Number(e.target.value)});
                props.changeIteminfo(item.id, item.evalname, item.evalmin, item.evalmax, item.explanation);
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
              value={item.explanation}
              onChange={(e) => {
                setItem({...item, explanation: e.target.value});
                props.changeIteminfo(item.id, item.evalname, item.evalmin, item.evalmax, item.explanation);
              }}
            />
          </Col>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              props.deleteItem(item.id);
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
