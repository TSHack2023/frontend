import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Header from "../components/header";
import { Link } from "react-router-dom";
import axios from "axios";

interface FileItem {
  file_id: number;
  filename: string;
  username: string;
  created_at: Date;
}

const Review = (): JSX.Element => {
  const [fileList, setFileList] = useState<FileItem[]>([]);

  const endpoint = "/getfile";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  useEffect(() => {
    getfileAPI();
  }, []);

  const getfileAPI = (): void => {
    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.result === true) {
          setFileList(res.data.filelist);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fileListRender = fileList.map((item) => {
    const link = "/Review/" + item.file_id.toString();
    return (
      <ListGroup.Item key={item.file_id}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h5>ファイル名: {item.filename}</h5>
            <p>投稿者: {item.username}</p>
            <p>投稿日時: {item.created_at.toLocaleString()}</p>
          </div>
          <Link to={link}>
            <Button variant="primary">評価する</Button>
          </Link>
        </div>
      </ListGroup.Item>
    );
  });

  const reviewItems = [
    {
      fileName: "example.mp3",
      author: "Alice",
      timestamp: "2023-08-15 10:30 AM",
    },
    {
      fileName: "document.wav",
      author: "Bob",
      timestamp: "2023-08-14 2:45 PM",
    },
    {
      fileName: "aaa.wav",
      author: "Charlie",
      timestamp: "2023-08-13 5:20 PM",
    },
  ]; // ファイル名、投稿者ユーザ名、投稿日時の組み合わせ

  return (
    <div>
      <Header />
      <Container>
        <ListGroup>
          {reviewItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5>ファイル名: {item.fileName}</h5>
                  <p>投稿者: {item.author}</p>
                  <p>投稿日時: {item.timestamp}</p>
                </div>
                <Link to={`/Review/a`}>
                  <Button variant="primary">評価する</Button>
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Review;
