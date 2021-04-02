import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import UpdateBookModal from "./UpdateBookModal";

class BestBooks extends React.Component {
  componentDidMount = () => {
    this.getBooks();
  };

  getBooks = async () => {
    try {
      const url = "http://localhost:3001";
      const books = await axios.get(`${url}/books`, {
        params: { email: this.props.email },
      });
      this.props.updateBooks(books.data);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <>
        {this.props.books.length > 0 && (
          <Carousel>
            {this.props.books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="http://placekitten.com/1600/900"
                  alt={`${book.name} ${book.description}`}
                />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <p>
                    {`Description: ${book.description}`}
                    <br />
                    {`Status: ${book.status}`}
                  </p>
                  <Button
                    variant="dark"
                    onClick={() => {
                      this.props.deleteItem(idx);
                    }}
                  >
                    Delete This Book
                  </Button>
                  &nbsp;
                  <Button
                    variant="dark"
                    onClick={() => {
                      this.props.displayUpdateForm(idx);
                    }}
                  >
                    Update This Book
                  </Button>
                  <UpdateBookModal
                    updateItem={this.props.updateItem}
                    isOpen={this.props.updateFormOpen}
                    closeModal={this.props.closeUpdateModal}
                    books={this.props.books}
                    formForModal={this.props.formForModal}
                  />
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </>
    );
  }
}

export default BestBooks;
