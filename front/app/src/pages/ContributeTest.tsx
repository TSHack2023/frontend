import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/header";
import uploadFile2AzureStorage from "../components/azureStorage";
import { Button, Form } from "react-bootstrap";

const Contribute = (): JSX.Element => {
  const [file, setFile] = useState<File>();
  const [url, setURL] = useState<string>();
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
      console.log(tmp);
      setURL(tmp);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>File Input</Form.Label>
            <Form.Control
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onFileChange(event);
              }}
            />
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            void upload();
          }}
        >
          Submit
        </Button>
        <p>
          url:<a href={url !== undefined ? url + sasToken : ""}>{url}</a>
        </p>
      </Container>
    </div>
  );
};

export default Contribute;
