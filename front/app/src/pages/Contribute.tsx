import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import EvalItem from "../components/EvalItem";
import uploadFile2AzureStorage from "../components/azureStorage";
import type { Items } from "../components/EvalItem";
import axios from "axios";
import ErrorPop from "../components/errorPop";
const Contribute = (): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  const [iteminfo, setIteminfo] = useState<Items[]>([]);
  const [file, setFile] = useState<File>();
  const [list, setList] = useState<number[]>([]); // EvalItemコンポーネントに付与するIDを格納するための配列
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const endpoint = "/fileupload";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  useEffect(() => {
    initIteminfo();
  }, [list]);

  const fileuploadAPI = (url: string): void => {
    const id = sessionStorage.getItem("id");
    if (id !== null) {
      const evalList = iteminfo.map((item) => {
        const newItem = {
          evalname: item.evalname,
          evalmin: item.evalmin,
          evalmax: item.evalmax,
          explanation: item.explanation,
        };
        return newItem;
      });
      axios
        .post(apiUrl, {
          username: id,
          filename: filename,
          fileurl: url,
          evallist: evalList,
        })
        .then((res) => {
          if (res.data.result === true) {
            console.log(res.status);
          }
        })
        .catch((err) => {
          setErrMsg("サーバとの通信に失敗しました。\n");
          setErrCode(err.message);
          setShow(true);
        });
    } else {
      setErrMsg("ログイン情報の取得に失敗しました。\n");
      setErrCode("");
      setShow(true);
    }
  };

  const initIteminfo = (): void => {
    const newlist = list.map((item) => {
      const index = idCheck(item);
      if (index === -1) {
        const newinfo: Items = {
          id: item,
          evalname: "",
          evalmin: 0,
          evalmax: 0,
          explanation: "",
        };
        return newinfo;
      } else {
        const newinfo = iteminfo[index];
        return newinfo;
      }
    });
    setIteminfo(newlist);
  };

  const idCheck = (id: number): number => {
    const indexList = iteminfo.map((item) => {
      return item.id === id ? 1 : -1;
    });
    return indexList.indexOf(1);
  };

  const changeIteminfo = (
    id: number,
    evalname: string,
    evalmin: number,
    evalmax: number,
    explanation: string,
  ): void => {
    const newitem: Items = {
      id: id,
      evalname: evalname,
      evalmin: evalmin,
      evalmax: evalmax,
      explanation: explanation,
    };
    const newlist = iteminfo.map((item) =>
      item.id === newitem.id ? newitem : item,
    );
    setIteminfo(newlist);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files != null) {
      if (files.length > 0) {
        setFile(files[0]);
      }
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

  const upload = async (): Promise<string> => {
    const id = sessionStorage.getItem("id");
    if (id !== null) {
      if (file !== undefined) {
        await uploadFile2AzureStorage(file)
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch((err) => {
            setErrMsg("ファイルのアップロードに失敗しました。\n");
            setErrCode(err.message);
            setShow(true);
          });
      } else {
        setErrMsg("ファイルの取得に失敗しました。\n");
        setErrCode("");
        setShow(true);
      }
    } else {
      setErrMsg("ログイン情報の取得に失敗しました。\n");
      setErrCode("");
      setShow(true);
    }
    return "";
  };

  const submit = async (): Promise<void> => {
    const url = await upload();
    fileuploadAPI(url);
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
              void submit();
            }}
          >
            投稿
          </Button>
        </div>
      </Container>

      <ErrorPop
        show={show}
        errMsg={errMsg}
        errCode={errCode}
        setShow={setShow}
      />
    </>
  );
};

export default Contribute;
