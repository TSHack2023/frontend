import Container from "react-bootstrap/Container";
import Header from "../components/header";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "react-bootstrap";

const Contribute = (): JSX.Element => {
  const [filename, setFilename] = useState("");
  const [evalnum, setEvalnum] = useState<number>(0);
  const [evalmax, setEvalmax] = useState<number>(0);
  const [evalmin, setEvalmin] = useState<number>(0);
  const [explanation, setExplanation] = useState("");
  return (
    <div>
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

          {/* 評価値設定 */}
          <Form.Group as={Row} className="mt-5" controlId="evaluation">
            {/* 評価値 */}
            <Form.Label column sm="1">
              評価値
            </Form.Label>
            <Col sm="2">
              <Form.Control
                type="number"
                value={evalnum}
                onChange={(e) => {
                  setEvalnum(Number(e.target.value));
                }}
              />
            </Col>

            {/* 評価値最大値 */}
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

            {/* 評価値最小値 */}
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

          {/* 説明 */}
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
          </Form.Group>

          {/* ボタン */}
          <div className="mt-3 d-grid gap-2">
            <Button variant="primary" size="lg">
              項目を追加
            </Button>{" "}
            <Button variant="success" size="lg">
              投稿
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Contribute;
