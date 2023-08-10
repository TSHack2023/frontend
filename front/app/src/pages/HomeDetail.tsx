import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Header from "../components/header";
import { Link } from "react-router-dom";
import axios from "axios";

interface AnswerList {
  username: string;
  scorelist: Answer[];
}

interface Answer {
  score_id: number;
  evalname: string;
  score: number;
}

const HomeDetail = (fileid: number): JSX.Element => {
  const [answerlist, setAnswerlist] = useState<AnswerList[]>([]);
  const fileName = "example.txt"; // ファイル名

  const endpoint = "/accessanswer";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  useEffect(() => {
    accessanswerAPI();
  }, []);

  const accessanswerAPI = (): void => {
    axios
      .get(apiUrl, {
        params: {
          file_id: fileid,
        },
      })
      .then((res) => {
        if (res.data.result === true) {
          setAnswerlist(res.data.answerlist);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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

  const answerlistRender = answerlist.map((item) => {
    return (
      <ListGroup.Item key={item.username}>
        <h3>{item.username}</h3>
        <ul>
          {item.scorelist.map((evalItem) => (
            <li key={evalItem.score_id}>
              {evalItem.evalname}: {evalItem.score}
            </li>
          ))}
        </ul>
      </ListGroup.Item>
    );
  });

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
