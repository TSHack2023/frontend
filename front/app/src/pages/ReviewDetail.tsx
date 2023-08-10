import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button } from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";
import axios from "axios";

interface Eval {
  eval_id: number;
  evalname: string;
  evalmin: number;
  evalmax: number;
  explanation: string;
}

interface ScoreItem {
  eval_id: number;
  score: number;
}

const ReviewDetail = (fileid: number): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  const [fileurl, setFileurl] = useState<string>("");
  const [evallist, setEvallist] = useState<Eval[]>([]);
  const [scorelist, setScorelist] = useState<ScoreItem[]>([]);

  const getEndpoint = "/filereview";
  const postEndpoint = "/flieupload";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const getApiUrl = baseUrl + getEndpoint;
  const postApiUrl = baseUrl + postEndpoint;

  useEffect(() => {
    testAPI();
    // filereviewAPI();
  }, []);

  const filereviewAPI = (): void => {
    axios
      .get(getApiUrl, {
        params: {
          file_id: fileid,
        },
      })
      .then((res) => {
        if (res.data.result === true) {
          setFilename(res.data.filename);
          setFileurl(res.data.fileurl);
          setEvallist(res.data.evallist);
          initScoreList();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const testAPI = (): void => {
    const testFilename = "file name";
    const testFileurl = "https://example";
    const testEval1: Eval = {
      eval_id: fileid,
      evalname: "name",
      evalmin: 0,
      evalmax: 2,
      explanation: "discription",
    };
    const testEval2: Eval = {
      eval_id: 2,
      evalname: "name2",
      evalmin: 0,
      evalmax: 10,
      explanation: "discription",
    };
    const testEvallist: Eval[] = [testEval1, testEval2];
    setFilename(testFilename);
    setFileurl(testFileurl);
    setEvallist(testEvallist);
    initScoreList();
  };

  const answerAPI = (): void => {
    const id = sessionStorage.getItem("id");
    if (id !== null) {
      axios
        .post(postApiUrl, {
          username: id,
          file_id: fileid,
          scorelist: scorelist,
        })
        .then((res) => {
          if (res.data.result === true) {
            console.log("post success");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const initScoreList = (): void => {
    const newScoreList = evallist.map((item) => {
      const initValue = Math.round((item.evalmin + item.evalmax) / 2);
      const newScore: ScoreItem = { eval_id: item.eval_id, score: initValue };
      return newScore;
    });
    setScorelist(newScoreList);
  };

  const changeScoreList = (evalId: number, score: number): void => {
    const newScore: ScoreItem = { eval_id: evalId, score: score };
    const newList = scorelist.map((item) =>
      item.eval_id === newScore.eval_id ? newScore : item,
    );
    setScorelist(() => newList);
  };

  const evallistrender = evallist.map((item) => {
    return (
      <ReviewItem
        key={item.eval_id}
        id={item.eval_id}
        name={item.evalname}
        min={item.evalmin}
        max={item.evalmax}
        explanation={item.explanation}
        changeScoreList={changeScoreList}
      />
    );
  });

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Container>
          <Button className="secondary mb-5">一覧に戻る</Button>
        </Container>
        <Container className="mb-5">
          <p>ファイル名：{filename}</p>
          <p>
            リンク：<a href={fileurl}>{fileurl}</a>
          </p>
        </Container>
        <Container>{evallistrender}</Container>
        <Container>
          <Button
            className="primary"
            onClick={() => {
              answerAPI();
            }}
          >
            評価送信
          </Button>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewDetail;
