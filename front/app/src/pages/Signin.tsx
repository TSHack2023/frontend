import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const Signin = (): JSX.Element => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="メールアドレスを入力してください。"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label class="mt-3">Password</Form.Label>
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
        <Button className="mt-3" variant="primary" size="lg" href="/Signin">
          Sign in
        </Button>{" "}
        <Button className="mt-3" variant="secondary" size="lg" href="Signup">
          Sign up
        </Button>
      </Container>
    </>
  );
};

export default Signin;
