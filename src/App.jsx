import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Container, Row, Col, Spinner, Card } from "react-bootstrap";

const App = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setFileUrl("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64File = reader.result.split(",")[1];

      const data = {
        fileName: file.name,
        fileData: base64File,
      };

      try {
        const response = await axios.post(
          "https://qwerty1234.execute-api.us-east-1.amazonaws.com/upload", // put your api here
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setFileUrl(response.data.presignedURL);
        setError("");
      } catch (err) {
        console.error("Error uploading file", err);
        setError("File upload failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="bg-secondary text-light shadow-sm border-0">
              <Card.Body>
                <h3 className="mb-4 text-center">Upload a File</h3>

                <Form.Group className="mb-3">
                  <Form.Label>Select a File</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>

                <div className="d-grid mb-3">
                  <Button
                    variant="light"
                    onClick={handleUpload}
                    disabled={loading || !file}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Uploading...
                      </>
                    ) : (
                      "Upload File"
                    )}
                  </Button>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                {fileUrl && (
                  <Alert variant="success" className="mt-3">
                    <h5 className="mb-2">✅ File Uploaded Successfully!</h5>
                    <p className="mb-1">
                      Here is your <strong>shareable link</strong>: (Your file will be deleted in the bucket after 1 day)
                    </p>
                    <div className="bg-dark p-2 rounded border text-break">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-info"
                      >
                        {fileUrl}
                      </a>
                    </div>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
