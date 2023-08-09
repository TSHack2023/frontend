import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button } from "react-bootstrap";
import ReviewItem from "../components/ReviewItem";

interface Eval {
  id: number;
  name: string;
  min: number;
  max: number;
  explanation: string;
}

const ReviewDetail = (): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  const [fileurl, setFileurl] = useState<string>("");
  const [evallist, setEvallist] = useState<Eval[]>([]);

  useEffect(() => {
    getDetailAPI();
  }, []);

  const getDetailAPI = (): void => {
    const testFilename = "file name";
    const testFileurl = "https://example";
    const testEval1: Eval = {
      id: 0,
      name: "name",
      min: 0,
      max: 2,
      explanation: "discription",
    };
    const testEval2: Eval = {
      id: 1,
      name: "name2",
      min: 0,
      max: 10,
      explanation: "discription",
    };
    const testEvallist: Eval[] = [testEval1, testEval2];
    setFilename(testFilename);
    setFileurl(testFileurl);
    setEvallist(testEvallist);
  };

  // const postReviewAPI = (): void => {
  //
  // };

  const evallistrender = evallist.map((item) => {
    return (
      <ReviewItem
        key={item.id}
        name={item.name}
        min={item.min}
        max={item.max}
        explanation={item.explanation}
      />
    );
  });

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Container className="mb-5">
          <p>ファイル名：{filename}</p>
          <p>
            リンク：<a href={fileurl}>{fileurl}</a>
          </p>
        </Container>
        <Container>{evallistrender}</Container>
        <Container>
          <Button className="primary">評価送信</Button>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewDetail;
