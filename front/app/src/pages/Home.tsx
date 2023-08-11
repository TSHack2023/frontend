import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import Header from "../components/header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import ErrorPop from "../components/errorPop";

interface Item {
  file_id: number;
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
  const items = [
    {
      fileId: 0,
      filename: "example.txt",
      username: "",
      created_at: "12:30 PM",
    },
    {
      fileId: 1,
      filename: "document.pdf",
      username: "",
      created_at: "03:45 PM",
    },
    {
      fileId: 2,
      filename: "image.jpg",
      username: "",
      created_at: "08:15 AM",
    },
  ];

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
          if (res.data.result === true) {
            setFileList(res.data.filelist);
          }
        })
        .catch((err) => {
          setErrMsg("サーバとの通信に失敗しました。\n");
          setErrCode(err.message);
          setShow(true);
        });
    }
  };

  const fileListRender = fileList.map((item, index) => {
    const link = "/home/" + item.file_id.toString();
    return (
      <ListGroup.Item key={index}>
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
  });

  return (
    <div>
      <Header />
      <Navbar bg="light">
        <Navbar.Brand>{username}</Navbar.Brand>
      </Navbar>
      <Container>
        <ListGroup>
          {items.map((item, index) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p>File: {item.filename}</p>
                  <p>Time（仮）: {item.created_at}</p>
                </div>
                <Link to="/home/1">
                  <Button variant="primary">評価を確認</Button>
                </Link>
              </div>
            </ListGroup.Item>
          ))}
          {fileListRender}
        </ListGroup>
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

export default Home;
