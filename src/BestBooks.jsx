import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  
  getAllBooks = async () => {
    try {
      // http://localhost:3001/books
      let url = 'http://localhost:3001/books' // '${process.env.REACT_APP_SERVER}/books' is not working
      let booksFromDB = await axios.get(url);
      this.setState({
        books: booksFromDB.data
      })
    } catch (error){
      console.log(error.message);
    }
  }
  

  componentDidMount () {
    this.getAllBooks();
  }

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
         {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
          <Carousel.Item key={book._id}>
            <div>
              <h3>{book.title}</h3>
              <p>Description: {book.description}</p>
              <p>{book.status}</p>
                     <img src= "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt= "image of a book" />
            </div>
          </Carousel.Item>
  ))}
          </Carousel>
          ): (
            <h3>Book Collection Empty</h3>
          )}
      </>
    )
  }
}

export default BestBooks;
