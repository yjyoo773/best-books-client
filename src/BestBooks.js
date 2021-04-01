import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

class BestBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     books: [],
  //   };
  // }

  componentDidMount = () => {
    this.getBooks();
  };

  getBooks = async () => {
    // e.preventDefault();
    // console.log('all the books', this.props.email);
    try {
      const url = "http://localhost:3001";
      const books = await axios.get(`${url}/books`, {
        params: { email: this.props.email },
      });
      // this.setState({ books: books.data });
      this.props.updateBooks(books.data);
      // console.log("bestbooks componentDidMount", this.state.books);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    console.log("from bestbooks",this.props);
    return (
      <>
        {this.props.books.length > 0 && (
          <Carousel>
            {this.props.books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="http://via.placeholder.com/800x400"
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
                      // this.getBooks();
                    }}
                  >
                    Delete This Book
                  </Button>
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
