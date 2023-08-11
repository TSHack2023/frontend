import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Header from "../components/header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ErrorPop from "../components/errorPop";

interface EvaluationItem {
  name: string;
  evaluations: number[];
}

interface AnswerList {
  username: string;
  scorelist: Answer[];
}

interface Answer {
  score_id: number;
  evalname: string;
  score: number;
}

const HomeDetail = (): JSX.Element => {
  const [answerlist, setAnswerlist] = useState<AnswerList[]>([]);
  const [filename, setFilename] = useState<string>("");
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const urlParams = useParams<{ fileinfo: string }>();
  const endpoint = "/accessanswer";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  useEffect(() => {
    accessanswerAPI();
  }, []);

  const accessanswerAPI = (): void => {
    if (urlParams.fileinfo !== undefined) {
      const fileid = urlParams.fileinfo.split("+")[0];
      const filename = urlParams.fileinfo.split("+")[1];

      axios
        .post(apiUrl, {
          file_id: Number(fileid),
        })
        .then((res) => {
          if (res.data.result === true) {
            setFilename(filename);
            setAnswerlist(res.data.answerlist);
          }
        })
        .catch((err) => {
          setErrMsg("サーバとの通信に失敗しました。\n");
          setErrCode(err.message);
          setShow(true);
        });
    }
  };

  const labels =
    answerlist.length > 0
      ? answerlist[0].scorelist.map((item) => {
          return item.evalname;
        })
      : [""]; // ラベルを定義
  const evaluationItems: EvaluationItem[] = answerlist.map((item) => {
    const name = item.username;
    const evaluations = item.scorelist.map((scoreItem) => {
      return scoreItem.score;
    });

    return { name, evaluations };
  });

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
    a.download = filename + "_evaluations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <Button variant="primary" onClick={handleDownloadCSV}>
            CSV ダウンロード
          </Button>
          <h4
            style={{
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            ファイル名: {filename}
          </h4>
          <div style={{ width: "100px" }}></div>
        </div>
        <ListGroup>{answerlistRender}</ListGroup>
      </Container>

      <ErrorPop
        show={show}
        errMsg={errMsg}
        errCode={errCode}
        setShow={setShow}
      />
    </div>
  );
};

export default HomeDetail;
