import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button, Col, Form, Row } from "react-bootstrap";
import EvalItem from "../components/EvalItem";
import uploadFile2AzureStorage from "../components/azureStorage";
import type { Items } from "../components/EvalItem";
const Contribute = (): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  // EvalItemコンポーネントに付与するIDを格納するための配列
  const [iteminfo, setIteminfo] = useState<Items[]>([]);
  const [file, setFile] = useState<File>();
  const [url, setURL] = useState<string>();
  const [list, setList] = useState<number[]>([]);
  const [evalname, setEvalName] = useState("");

  const initIteminfo = () => {
    const newlist = list.map((item) => {
      const newinfo: Items = {id: item, evalname: "", evalmin: 0, evalmax: 0, explanation: ""};
      return newinfo;
    });
    setIteminfo(newlist);
  };

  useEffect(() => {
    initIteminfo();
  }, [list]);

  const changeIteminfo = (id: number, evalname: string, evalmin: number, evalmax: number, explanation: string) => {
    const newitem: Items = {id: id, evalname: evalname, evalmin: evalmin, evalmax: evalmax, explanation: explanation};
    const newlist = iteminfo.map((item) => 
      item.id === newitem.id ? newitem: item,
    );
    setIteminfo(newlist);
  }

  const sasToken =
    process.env.REACT_APP_AZURE_SHARED_ACCESS_SIGNATURE ?? "sasToken";

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files != null) {
      if (files.length > 0) {
        setFile(files[0]);
      }
    }
  };

  const upload = async (): Promise<void> => {
    if (file != null) {
      const tmp = await uploadFile2AzureStorage(file);
      setURL(tmp);
    }
  };

  const randomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const addItem = (): void => {
    while (true) {
      const rand = randomInt(0, 100);
      if (!list.includes(rand)) {
        setList([...list, rand]);
        break;
      }
    }
  };

  const deleteItem = (id: number): void => {
    const newList = list.filter((item) => item !== id);
    setList(newList);
  };

  const submit = (): void => {
    void upload();
  };

  const listRender = list.map((item) => {
    return (
      <EvalItem
        key={item}
        id={item}
        deleteItem={deleteItem}
        changeIteminfo={changeIteminfo}
      />
    );
  });

  return (
    <>
      <Header />
      <Container>
        <Form>
          <Form.Group as={Row} className="mt-5" controlId="fileName">
            <Form.Label column sm="1">
              名前
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="ファイル名を入力してください。"
                value={filename}
                onChange={(e) => {
                  setFilename(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mt-3"
            controlId="fileUpload"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onFileChange(event);
            }}
          >
            <Form.Label column sm="1">
              ファイル
            </Form.Label>
            <Col sm="10">
              <Form.Control type="file" />
            </Col>
          </Form.Group>
        </Form>

        {listRender}

        <div className="mt-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              addItem();
              console.log();
            }}
          >
            項目を追加
          </Button>{" "}
        </div>
        <div className="mt-3">
          <Button
            variant="success"
            size="lg"
            onClick={() => {
              submit();
            }}
          >
            投稿
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Contribute;
