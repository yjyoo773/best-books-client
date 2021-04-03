import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position:'absolute',left:0,right:0}}>
        <Navbar.Brand>&copy; Best Books</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
