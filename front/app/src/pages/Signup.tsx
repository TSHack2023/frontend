import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import ErrorPop from "../components/errorPop";

const Signup = (): JSX.Element => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errCode, setErrCode] = useState("");

  const endpoint = "/signup";
  const baseUrl = process.env.REACT_APP_API_BASE_URL ?? "baseUrl";
  const apiUrl = baseUrl + endpoint;

  const signupAPI = (): void => {
    axios
      .post(apiUrl, {
        username: name,
        password,
      })
      .then((res) => {
        if (res.data.result === true) {
          sessionStorage.setItem("id", name);
          setErrMsg("ログインに成功しました。\n");
          setErrCode("");
          setShow(true);
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
            signupAPI();
          }}
        >
          Register
        </Button>
        <Button className="mt-5" variant="secondary" size="lg" href="/Signin">
          Back
        </Button>
      </Container>

      <ErrorPop
        show={show}
        errMsg={errMsg}
        errCode={errCode}
        setShow={setShow}
        redirectURL="/Signup"
      />
    </>
  );
};

export default Signup;
