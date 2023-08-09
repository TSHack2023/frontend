import Container from "react-bootstrap/Container";
import Header from "../components/header";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";
import EvalItem from "../components/EvalItem";

type Item = {
  id: number,
  item: React.FC<{}>
}

const Contribute = (): JSX.Element => {
  const [filename, setFilename] = useState("");
  const [list, setList] = useState([
    {id: 0, item: <EvalItem id={0}/>}
  ]);
  const addItem = () => {
    setList([...list, {id: list.length, item: <EvalItem id={list.length}/>}]);
    console.log(list);
  };
  const list2 = list.map(list => list.item);

  return (
    <>
      <Header />
      <Container>
        <Form>
          {/* ファイル名 */}
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

          {/* ファイル選択 */}
          <Form.Group as={Row} className="mt-3" controlId="fileUpload">
            <Form.Label column sm="1">
              ファイル
            </Form.Label>
            <Col sm="10">
              <Form.Control type="file" />
            </Col>
          </Form.Group>
        </Form>

        {/* 項目の表示 */}
        {list2}

        {/* ボタン */}
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
