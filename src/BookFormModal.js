import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class BookFormModal extends React.Component {
  state = { name: null, description: "", status: "" };
  handleChangeName = (e) => this.setState({ newBookName: e.target.value });
  handleChangeDesc = (e) => this.setState({ newBookDesc: e.target.value });
  handleChangeStat = (e) => this.setState({ newBookStat: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.formForModal(
      this.state.newBookName,
      this.state.newBookDesc,
      this.state.newBookStat
    );
    this.props.createBook(e);
    this.props.closeModal();
  };
  render() {
    return (
      <Modal show={this.props.isOpen} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Form Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChangeName}
              value={this.state.newBookName}
              placeholder="name input"
            />
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChangeDesc}
              value={this.state.newBookDesc}
              placeholder="Description"
            />
            <Form.Label>Status: </Form.Label>
            <Form.Control
              type="text"
              onChange={this.handleChangeStat}
              value={this.state.newBookStat}
              placeholder="not read/read/reading"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BookFormModal;
