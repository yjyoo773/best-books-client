import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount = async () => {
    // e.preventDefault();
    // console.log('all the books', this.props.email);
    try {
      const url = "http://localhost:3001";
      const books = await axios.get(`${url}/books`, {
        params: { email: this.props.email },
      });
      this.setState({ books: books.data });
      console.log("bestbooks", this.state.books);
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <>
        {this.state.books.length > 0 && (
          <Carousel style={{ minHeight: "8rem" }}>
            {this.state.books.map((book, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="http://via.placeholder.com/300x450"
                  alt={`${book.name} ${book.description}`}
                />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <p>
                    {`Description: ${book.description}`}
                    <br />
                    {`Status: ${book.status}`}
                  </p>
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
