import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Header from "../components/header";
import { Link } from "react-router-dom";
const Review = (): JSX.Element => {
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
