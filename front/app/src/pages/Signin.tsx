import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

const Signin = (): JSX.Element => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const endpoint = "/login";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  const loginAPI = (): void => {
    axios
      .post(apiUrl, {
        username: name,
        password: password,
      })
      .then((res) => {
        if (res.data.result === true) {
          sessionStorage.setItem("id", name);
        } else {
          setErrMsg("ログインに失敗しました。\n");
          setErrCode("");
          setShow(true);
        }
      })
      .catch((err) => {
        setErrMsg("サーバとの通信に失敗しました。\n");
        setErrCode(err.message);
        setShow(true);
      });
  };

  return (
    <>
      <Container className="mt-5">
        <Form>
          {/* アドレス入力フォーム */}
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="input"
              placeholder="ユーザ名を入力してください。"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>

          {/* パスワード入力フォーム */}
          <Form.Group controlId="passWord">
            <Form.Label className="mt-3">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="パスワードを入力してください。"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
        {/* ボタン */}
        <Button
          className="mt-5 mr-3"
          variant="primary"
          size="lg"
          onClick={() => {
            loginAPI();
          }}
        >
          Sign in
        </Button>
        <Button className="mt-5" variant="secondary" size="lg" href="/Signup">
          Sign up
        </Button>
      </Container>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setShow(false);
          }}
        >
          <Modal.Title>{errMsg}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errCode}</Modal.Body>
      </Modal>
    </>
  );
};

export default Signin;
