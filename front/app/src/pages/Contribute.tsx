import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import { Button, Col, Form, Row } from "react-bootstrap";
import EvalItem from "../components/EvalItem";
import type { Items } from "../components/EvalItem";

const Contribute = (): JSX.Element => {
  const [filename, setFilename] = useState<string>("");
  const [iteminfo, setIteminfo] = useState<Items[]>([]); // 入力された情報をオブジェクトを用いて、コンポーネントごとに管理する配列
  const [list, setList] = useState<number[]>([]); // EvalItemコンポーネントに付与するIDを格納するための配列

  // 初期化のための関数
  const initIteminfo = () => {
    const newlist = list.map((item) => {
      const newinfo: Items = {
        id: item,
        evalname: "",
        evalmin: 0,
        evalmax: 0,
        explanation: "",
      };
      return newinfo;
    });
    setIteminfo(newlist);
  };

  // listに変更があると、initIteminfo()が自動的に起動するようにした
  useEffect(() => {
    initIteminfo();
  }, [list]);

  // setIteminfo()によりiteminfoを更新 / これを子コンポーネントに渡す
  const changeIteminfo = (
    id: number,
    evalname: string,
    evalmin: number,
    evalmax: number,
    explanation: string,
  ) => {
    const newitem: Items = { id, evalname, evalmin, evalmax, explanation };
    const newlist = iteminfo.map((item) =>
      item.id === newitem.id ? newitem : item,
    );
    setIteminfo(newlist);
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
    console.log(iteminfo);
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

          <Form.Group as={Row} className="mt-3" controlId="fileUpload">
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
              console.log(iteminfo);
            }}
          >
            項目を追加
          </Button>{" "}
        </div>
        <div className="mt-3">
          <Button variant="success" size="lg">
            投稿
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Contribute;
