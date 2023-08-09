import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Header from "../components/header";
import { Link } from "react-router-dom";
const HomeDetail = (): JSX.Element => {
  const fileName = "example.txt"; // ファイル名

  const evaluationItems = [
    {
      name: "Alice",
      evaluations: [
        { label: "評価項目1", value: 7 },
        { label: "評価項目2", value: 9 },
        { label: "評価項目3", value: 5 },
      ],
    },
    {
      name: "Bob",
      evaluations: [
        { label: "評価項目1", value: 8 },
        { label: "評価項目2", value: 6 },
        { label: "評価項目3", value: 4 },
      ],
    },
    {
      name: "Charlie",
      evaluations: [
        { label: "評価項目1", value: 9 },
        { label: "評価項目2", value: 7 },
        { label: "評価項目3", value: 8 },
      ],
    },
  ]; // ファイル名、名前と評価項目、値の組み合わせ

  return (
    <div>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/home">
            <Button variant="secondary">戻る</Button>
          </Link>
          <h4 style={{ textAlign: "center", margin: "0 auto" }}>
            ファイル名: {fileName}
          </h4>
          <div style={{ width: "100px" }}></div>
        </div>
        <ListGroup>
          {evaluationItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <h3>{item.name}</h3>
              <ul>
                {item.evaluations.map((evaluation, evalIndex) => (
                  <li key={evalIndex}>
                    {evaluation.label}: {evaluation.value}
                  </li>
                ))}
              </ul>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default HomeDetail;
