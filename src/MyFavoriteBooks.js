import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./myFavoriteBooks.css";
import BestBooks from "./BestBooks";
import axios from "axios";
import Button from "react-bootstrap/Button";
import BookFormModal from "./BookFormModal";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isOpen: false,
      updateFormOpen: false,
      newBookName: "",
      newBookDesc: "",
      newBookStat: "",
      chosenBook: {},
      indexOfChosenBook: -1,
    };
  }

  formForModal = (newBookName, newBookDesc, newBookStat) => {
    this.setState({ newBookName });
    console.log("newbook", newBookName);
    this.setState({ newBookDesc });
    this.setState({ newBookStat });
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  
  closeUpdateModal = () => this.setState({ updateFormOpen: false });

  updateBooks = (bookState) => this.setState({ books: bookState });

  createBook = async (name, desc, stat) => {
    console.log("stuff", this.state);
    const SERVER = "http://localhost:3001";
    const books = await axios.post(`${SERVER}/books`, {
      bookName: name,
      description: desc,
      status: stat,
      email: this.props.email,
    });
    this.setState({ books: books.data });
  };

  deleteItem = async (index) => {
    console.log(index);
    const SERVER = "http://localhost:3001";
    const newBooks = await axios.delete(`${SERVER}/books/${index}`, {
      params: { email: this.props.email },
    });
    console.log("bookState to delete", newBooks.data);

    const newBookArray = this.state.books.filter((book, i) => {
      return index !== i;
    });
    console.log("deleted newbook array", newBookArray);
    this.setState({ books: newBookArray });
  };

  updateItem = async (newName, newDesc, newStat) => {
    const SERVER = "http://localhost:3001";
    const book = {
      name: newName,
      description: newDesc,
      status: newStat,
    };
    this.state.books.splice(this.state.indexOfChosenBook, 1, book);
    const updateBooksArray = await axios.put(
      `${SERVER}/books/${this.state.indexOfChosenBook}`,
      {
        // email: this.props.email,
        name: newName,
        description: newDesc,
        status: newStat,
      },
      { params: { email: this.props.email } }
    );
    console.log(updateBooksArray);
    this.setState({ books: updateBooksArray.data });
  };

  displayUpdateForm = (index) => {
    const chosenBook = this.state.books[index];
    this.setState({ chosenBook, indexOfChosenBook: index });
    this.setState({ updateFormOpen: true });
  };

  render() {
    return (
      <Jumbotron>
        <BookFormModal
          formForModal={this.formForModal}
          closeModal={this.closeModal}
          isOpen={this.state.isOpen}
          handleSubmit={this.handleSubmit}
          createBook={this.createBook}
          updateBooks={this.updateBooks}
          books={this.state.books}
        />
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <Button
          variant="outline-dark"
          onClick={this.openModal}
          style={{ marginBottom: "1rem" }}
        >
          Add Book
        </Button>
        <BestBooks
          email={this.props.email}
          books={this.state.books}
          updateBooks={this.updateBooks}
          deleteItem={this.deleteItem}
          displayUpdateForm={this.displayUpdateForm}
          updateItem={this.updateItem}
          formForModal={this.formForModal}
          closeUpdateModal={this.closeUpdateModal}
          updateFormOpen={this.state.updateFormOpen}
        />
      </Jumbotron>
    );
  }
}

export default MyFavoriteBooks;
