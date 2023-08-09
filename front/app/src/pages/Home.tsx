import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import Header from "../components/header";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const Home = (): JSX.Element => {
  const items = [
    { fileName: "example.txt", time: "12:30 PM" },
    { fileName: "document.pdf", time: "03:45 PM" },
    { fileName: "image.jpg", time: "08:15 AM" },
  ];
  const username = "時系列 太郎"; // ユーザー名

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
                  <p>File: {item.fileName}</p>
                  <p>Time（仮）: {item.time}</p>
                </div>
                <Link to="/home/detail">
                  <Button variant="primary">評価を確認</Button>
                </Link>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Home;
