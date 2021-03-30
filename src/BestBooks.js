import React from "react";
import axios from "axios";

class BestBooks extends React.Component {
    constructor(props){
        super(props);
        this.state={
            books:[]
        }
    }

    componentDidMount = async() => {
    // e.preventDefault();
    // console.log('all the books', this.props.email);
        try{
            const url = 'http://localhost:3001';
            const books = await axios.get(`${url}/books`, {params: {email: this.props.email}});
            this.setState({ books: books.data});
            console.log('bestbooks',this.state.books)
        }catch(error) {
            console.error(error);
        }
    }
    render() {
        return(
           <>
            {/* {this.state.books} */}
           
           </> 
        );
    }

};

export default BestBooks;


