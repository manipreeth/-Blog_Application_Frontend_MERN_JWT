import axios from "axios";
import React, { useState, useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("userid");
  console.log(userId);

  const handleOtpChange = (e) => {
    const { value } = e.target;
    // Only allow 4-digit numbers

    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    // Send JSON Web Token which is stored in LocalStorage for Authorization
    const token = localStorage.getItem("token");

    // Handle OTP validation logic here
    await axios
      .post(
        `/users/verifyEmail/${userId}`,
        { otp: otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card className="p-4">
        <Card.Body>
          <h3 className="mb-4">OTP Validation</h3>
          <Form onSubmit={handleOtpSubmit}>
            <Form.Group controlId="otpInput">
              <Form.Label>Enter OTP (4 digits):</Form.Label>
              <Form.Control
                type="number"
                value={otp}
                onChange={handleOtpChange}
                maxLength={4}
                minLength={4}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-4">
              Validate OTP
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerifyAccount;
