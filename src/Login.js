import React from "react";
import Card from "react-bootstrap/Card";
import "./login.css";
import LoginButton from "./LoginButton";

class Login extends React.Component {
  render() {
    return (
      <div style={{ minHeight: "85vh" }}>
        <Card style={{ width: "18rem"}}>
          <Card.Body>
            <Card.Title>Log In</Card.Title>
            <Card.Text>Click Below to Log In</Card.Text>
            <LoginButton />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Login;
