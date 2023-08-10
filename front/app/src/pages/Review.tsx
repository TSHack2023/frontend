import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
  ];

  const initialFilterState = {
    searchType: "author",
    filterValue: "",
  };

  const [filter, setFilter] = useState(initialFilterState);
  const [filteredItems, setFilteredItems] = useState(reviewItems);

  const handleItems = (fileName: string, author: string): void => {
    console.log("ファイル名:", fileName);
    console.log("投稿者:", author);
  };

  const handleSearch = (): void => {
    const newFilteredItems = reviewItems.filter((item) => {
      if (filter.searchType === "author") {
        return (
          filter.filterValue === "" ||
          item.author.toLowerCase().startsWith(filter.filterValue.toLowerCase())
        );
      } else if (filter.searchType === "fileName") {
        return (
          filter.filterValue === "" ||
          item.fileName
            .toLowerCase()
            .startsWith(filter.filterValue.toLowerCase())
        );
      }
      return false;
    });
    setFilteredItems(newFilteredItems);
  };

  const handleReset = (): void => {
    setFilter(initialFilterState);
    setFilteredItems(reviewItems);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          <Form.Control
            as="select"
            style={{ width: "150px", marginRight: "10px" }}
            value={filter.searchType}
            onChange={(e) => {
              setFilter({ ...filter, searchType: e.target.value });
            }}
          >
            <option value="author">投稿者</option>
            <option value="fileName">ファイル名</option>
          </Form.Control>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            <input
              type="text"
              placeholder={`${
                filter.searchType === "author" ? "投稿者" : "ファイル名"
              }で検索`}
              value={filter.filterValue}
              onChange={(e) => {
                setFilter({ ...filter, filterValue: e.target.value });
              }}
              onKeyPress={handleKeyPress}
            />
            <Button variant="primary" onClick={handleSearch}>
              検索
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              リセット
            </Button>
          </div>
        </div>
        <ListGroup>
          {filteredItems.map((item, index) => (
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
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleItems(item.fileName, item.author);
                    }}
                  >
                    評価する
                  </Button>
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
