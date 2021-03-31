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
      newBookName:'',
      newBookDesc:'',
      newBookStat:'',
    };
  }


  formForModal = (newBookName,newBookDesc,newBookStat)=>{
      this.setState({newBookName})
      this.setState({newBookDesc})
      this.setState({newBookStat})
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  // handleSubmit(name,desc,status) => //some code

  updateBooks = (bookState) => this.setState({ books: bookState });

  createBook = async (e) => {
    e.preventDefault();
    const SERVER = "http://localhost:3001";
    const books = await axios.post(`${SERVER}/books`, {
      bookName: this.state.newBookName,
      description: this.state.newBookDesc,
      status: this.state.newBookStat,
      email: this.props.email,
    });
    this.setState({ books: books.data });
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
          /> 
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <BestBooks
          email={this.props.email}
          books={this.state.books}
          updateBooks={this.updateBooks}
        />
      </Jumbotron>
    );
  }
}

export default MyFavoriteBooks;
