import "./App.css";
import React from "react";
import { useState } from "react";
import { Button, Form, Card, Modal } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>
      <Modal

        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
        <Card
          style={{
            width: "29rem",
            textAlign: "center"
          }}
        >
          <Form>
            <Card.Body>
              <Card.Img
                style={{ width: 50 }}
                variant="top"
                src="https://png.pngitem.com/pimgs/s/1-15888_transparent-visa-master-png-logo-visa-png-2019.png"
              />
              <Card.Title style={{ padding: 10 }}>Credit Card</Card.Title>
              <Form.Group className="mb-2" controlId="formBasicText">
                <Form.Control type="text" placeholder="Cardholder Name" require = "require"/>
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Control type="password" min="1" max="999" placeholder="Card Number" require = "require"/><i class="fa fa-eye"></i>

              </Form.Group>
              <Form.Group
                className="mb-5 row align-items-center"
                controlId="formBasictext"
              >
                <div class="col">
                  <Form.Control type="text" min="1" max="999" placeholder="Expiration Date" require = "require"/>
                </div>
                <div class="col">
                  <Form.Control type="text" min="1" max="999" placeholder="CVV" require = "require"/>
                </div>
              </Form.Group>

              <Button href="#" variant="success">
                Purchase
              </Button>
            </Card.Body>
          </Form>
        </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
