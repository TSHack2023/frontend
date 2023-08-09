import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Header from "../components/header";
import { Link } from "react-router-dom";

interface EvaluationItem {
  name: string;
  evaluations: number[];
}

const HomeDetail = (): JSX.Element => {
  const fileName = "example.txt"; // ファイル名

  const labels = ["評価項目1", "評価項目2", "評価項目3"]; // ラベルを定義

  const evaluationItems: EvaluationItem[] = [
    {
      name: "Alice",
      evaluations: [7, 9, 5],
    },
    {
      name: "Bob",
      evaluations: [8, 6, 4],
    },
    {
      name: "Charlie",
      evaluations: [9, 7, 8],
    },
  ];

  // CSV 形式に変換
  const convertToCSV = (data: EvaluationItem[]): string => {
    const header = ["名前", ...labels].join(","); // ヘッダー部分を作成
    const rows = data.map((item) => [item.name, ...item.evaluations].join(",")); // データ部分を作成
    return [header, ...rows].join("\n"); // ヘッダーとデータを結合して CSV 形式にする
  };

  const handleDownloadCSV = (): void => {
    const csvData = convertToCSV(evaluationItems);
    const blob = new Blob(["\uFEFF" + csvData], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "evaluation_items.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <Button variant="primary" onClick={handleDownloadCSV}>
            CSV ダウンロード
          </Button>
          <h4
            style={{
              textAlign: "center",
              margin: "0 auto",
            }}
          >
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
                    {labels[evalIndex]}: {evaluation}
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
