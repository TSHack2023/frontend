import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button, Col, Form, Row } from "react-bootstrap";
import EvalItem from "../components/EvalItem";

const Contribute = (): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  const [list, setList] = useState<number[]>([]);

  const randomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const addItem = (): void => {
    while (true) {
      const rand = randomInt(0, 100);
      if (!list.includes(rand)) {
        setList([...list, rand]);
        break;
      }
    }
  };

  const deleteItem = (id: number): void => {
    const newList = list.filter((item) => item !== id);
    setList(newList);
  };

  const listRender = list.map((item) => {
    return <EvalItem key={item} id={item} func={deleteItem} />;
  });

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Form.Group as={Row} className="mt-5" controlId="fileName">
            <Form.Label column sm="1">
              名前
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="ファイル名を入力してください。"
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3" controlId="fileUpload">
            <Form.Label column sm="1">
              ファイル
            </Form.Label>
            <Col sm="10">
              <Form.Control type="file" />
            </Col>
          </Form.Group>
        </Form>

        {listRender}

        <div className="mt-3">
          <Button variant="primary" size="lg" onClick={addItem}>
            項目を追加
          </Button>{" "}
        </div>
        <div className="mt-3">
          <Button variant="success" size="lg">
            投稿
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Contribute;
