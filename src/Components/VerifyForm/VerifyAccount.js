import axios from "axios";
import React, { useState, useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [btnClick, setBtnClick] = useState(false);

  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("userid");

  const handleOtpChange = (e) => {
    const { value } = e.target;
    // Only allow 4-digit numbers

    if (/^\d{0,4}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setBtnClick(true);

    // Handle OTP validation logic here
    await axios
      .post(
        `https://blog-application-backend-5dvk.onrender.com/users/verifyEmail/${userId}`,
        { otp: otp }
      )
      .then((res) => {
        setBtnClick(false);

        alert("Your Account Registered Successfully. Please Login!");
        navigate("/login");
      })
      .catch((err) => {
        setBtnClick(false);
        alert(err.response.data.message);
        navigate("/register");
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card className="p-4">
        <Card.Body>
          <h3 className="mb-4">Verify Your Account</h3>
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

            {btnClick ? (
              <Button
                variant="primary"
                disabled={true}
                type="submit"
                className="w-100 mt-4"
              >
                Validating...
              </Button>
            ) : (
              <Button variant="primary" type="submit" className="w-100 mt-4">
                Verify & Procced
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerifyAccount;
