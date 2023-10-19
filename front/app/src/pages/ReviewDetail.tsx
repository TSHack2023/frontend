import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button } from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorPop from "../components/errorPop";

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

const ReviewDetail = (): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  const [fileurl, setFileurl] = useState<string>("");
  const [evallist, setEvallist] = useState<Eval[]>([]);
  const [scorelist, setScorelist] = useState<ScoreItem[]>([]);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const urlParams = useParams<{ fileid: string }>();
  const getEndpoint = "/filereview";
  const postEndpoint = "/answer";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const getApiUrl = baseUrl + getEndpoint;
  const postApiUrl = baseUrl + postEndpoint;
  const sasToken =
    process.env.REACT_APP_AZURE_SHARED_ACCESS_SIGNATURE ?? "sasToken";

  useEffect(() => {
    // testAPI();
    if (evallist.length === 0) {
      filereviewAPI();
    } else {
      initScoreList();
    }
  }, [evallist]);

  const filereviewAPI = (): void => {
    axios
      .post(getApiUrl, {
        file_id: Number(urlParams.fileid),
      })
      .then((res) => {
        if (res.data.result === true) {
          setFilename(res.data.filename);
          setFileurl(res.data.fileurl);
          setEvallist(res.data.evallist);
        }
      })
      .catch((err) => {
        setErrMsg("サーバとの通信に失敗しました。\n");
        setErrCode(err.message);
        setShow(true);
      });
  };

  const answerAPI = (): void => {
    const id = sessionStorage.getItem("id");
    if (id !== null) {
      axios
        .post(postApiUrl, {
          username: id,
          file_id: Number(urlParams.fileid),
          scorelist,
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
    const newScore: ScoreItem = { eval_id: evalId, score };
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
          <Button className="secondary mb-5" href="/Review">
            一覧に戻る
          </Button>
        </Container>
        <Container className="mb-5">
          <p>ファイル名：{filename}</p>
          <p>
            リンク：<a href={fileurl + sasToken}>{fileurl}</a>
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

      <ErrorPop
        show={show}
        errMsg={errMsg}
        errCode={errCode}
        setShow={setShow}
      />
    </div>
  );
};

export default ReviewDetail;
