import React from "react";
import axios from "axios";

class BestBooks extends React.Component {

ComponentDidMount = aysnc () => {
    // e.preventDefault();
    console.log('all the books', this.state.name);
    try{
        const url = 'https://localhost:3001';
        const books = await axios.get(`${url}/books`, {params: {email: this.props.email}})
        this.setState({ books: books.data})
    }catch(error) {
        console.error(error);
    }
}
    render() {
        return(
        //    <>
        //    <Books
        //     books={this.state.books}/>
        //    </> 
        )
    }

};

export default BestBooks;


