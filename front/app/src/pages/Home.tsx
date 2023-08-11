import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import Header from "../components/header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorPop from "../components/errorPop";

interface Item {
  id: number;
  filename: string;
  username: string;
  created_at: Date;
}

const Home = (): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [fileList, setFileList] = useState<Item[]>([]);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const endpoint = "/searchfile";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  useEffect(() => {
    searchfileAPI();
  }, []);

  const searchfileAPI = (): void => {
    const id = sessionStorage.getItem("id");
    if (id !== null) {
      setUsername(id);
      axios
        .post(apiUrl, {
          username: username,
        })
        .then((res) => {
          console.log(res);
          setFileList(res.data);
        })
        .catch((err) => {
          setErrMsg("サーバとの通信に失敗しました。\n");
          setErrCode(err.message);
          setShow(true);
        });
    }
  };

  const fileListRender = (): JSX.Element => {
    if (fileList.length > 0) {
      return (
        <ListGroup>
          {fileList.map((item) => {
            const link = "/home/" + item.id.toString();
            return (
              <ListGroup.Item key={item.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p>ファイル名: {item.filename}</p>
                    <p>投稿時間: {item.created_at.toLocaleString()}</p>
                  </div>
                  <Link to={link}>
                    <Button variant="primary">評価を確認</Button>
                  </Link>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div>
      <Header />
      <Navbar bg="light">
        <Navbar.Brand>{username}</Navbar.Brand>
      </Navbar>
      <Container>{fileListRender()}</Container>

      <ErrorPop
        show={show}
        errMsg={errMsg}
        errCode={errCode}
        setShow={setShow}
      />
    </div>
  );
};

export default Home;
