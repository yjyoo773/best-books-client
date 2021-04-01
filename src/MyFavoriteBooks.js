import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./myFavoriteBooks.css";
import BestBooks from "./BestBooks";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import BookFormModal from "./BookFormModal";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      // bookName: "",
      isOpen: false,
      newBookName: "",
      newBookDesc: "",
      newBookStat: "",
      toggle: true,
    };
  }

  formForModal = (newBookName, newBookDesc, newBookStat) => {
    this.setState({ newBookName });
    console.log('newbook', newBookName);
    this.setState({ newBookDesc });
    this.setState({ newBookStat });
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  // handleSubmit(name,desc,status) => //some code

  updateBooks = (bookState) => this.setState({ books: bookState });

  createBook = async (x,y,z,toggle) => {
    console.log("stuff", this.state);
    // e.preventDefault();
    const SERVER = "http://localhost:3001";
    const books = await axios.post(`${SERVER}/books`, {
      bookName: x,
      description: y,
      status: z,
      email: this.props.email,
    });
    this.setState({ books: books.data, toggle: this.state.toggle });
  };

  deleteItem = async (index) => {
    // use axios to call our API to delete the cat at the index specified
    console.log(index);
    const SERVER = "http://localhost:3001";
    const newBooks = await axios.delete(`${SERVER}/books/${index}`, {
      params: { email: this.props.email },
    });
    console.log("look", this.state.books);

    const newBookArray = this.state.books.filter((book, i) => {
      return index !== i;
    });
    console.log("new book array", newBookArray);
    this.setState({ books: newBookArray });
  };

  render() {
    console.log("FavoriteBooks", this.state);
    return (
      <Jumbotron>
        {/* <Button onClick = >Add Book</Button> */}
        <button onClick={this.openModal}>Display Modal Form</button>
        <BookFormModal
          formForModal={this.formForModal}
          closeModal={this.closeModal}
          isOpen={this.state.isOpen}
          handleSubmit={this.handleSubmit}
          createBook={this.createBook}
          toggle={this.state.toggle}
          updateBooks={this.updateBooks}
          books={this.state.books}
        />
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <BestBooks
          email={this.props.email}
          books={this.state.books}
          updateBooks={this.updateBooks}
          deleteItem={this.deleteItem}
        />
      </Jumbotron>
    );
  }
}

export default MyFavoriteBooks;
