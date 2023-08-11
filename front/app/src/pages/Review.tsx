import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/header";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorPop from "../components/errorPop";

interface FileItem {
  id: number;
  filename: string;
  username: string;
  created_at: Date;
}

interface Filter {
  searchType: string;
  filterValue: string;
}

const Review = (): JSX.Element => {
  const initialFilterState: Filter = {
    searchType: "author",
    filterValue: "",
  };

  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilterState);
  const [filteredItems, setFilteredItems] = useState<FileItem[]>(fileList);
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

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
        setFileList(res.data);
      })
      .catch((err) => {
        setErrMsg("サーバとの通信に失敗しました。\n");
        setErrCode(err.message);
        setShow(true);
      });
  };

  const fileListRender = (): JSX.Element => {
    if (filteredItems.length > 0) {
      return (
        <ListGroup>
          {filteredItems.map((item) => {
            const link = "/Review/" + item.id.toString();
            return (
              <ListGroup.Item key={item.id}>
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
          })}
        </ListGroup>
      );
    } else {
      return <></>;
    }
  };

  const handleSearch = (): void => {
    const newFilteredItems = fileList.filter((item) => {
      if (filter.searchType === "author") {
        return (
          filter.filterValue === "" ||
          item.username
            .toLowerCase()
            .startsWith(filter.filterValue.toLowerCase())
        );
      } else if (filter.searchType === "fileName") {
        return (
          filter.filterValue === "" ||
          item.filename
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
    setFilteredItems(fileList);
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
        {fileListRender()}
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

export default Review;
