import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import {Container, Form, Button} from 'react-bootstrap';
import UpdateBookModal from './UpdateBookModal';
import AddBookModal from './AddBookModal';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      bookToUpdate: {},
    }
  }

  openUpdateModal = (bookToUpdate) => {
    this.setState({
      showModal: true,
      bookToUpdate: bookToUpdate
  })
}
  closeUpdateModal = () => {
    this.setState({
      showModal: false
    })
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

  // add book to db

  // create object
  handleBookSubmit = (event) =>{
  event.preventDefault();
  let bookObj = {
    title: event.target.title.value,
    description: event.target.description.value,
    status: event.target.status.checked
  }
  this.postBook(bookObj)
  }

  // post object and update state
  postBook = async (bookObj) => {
    try {
      let url = 'http://localhost:3001/books' // '${process.env.REACT_APP_SERVER}/books' is not working
      let createdBookFromDB = await axios.post(url, bookObj)
      this.setState({
        books:[...this.state.books, createdBookFromDB.data]
      })
    }catch (error) {
      console.log(error.message);
    }
  }


  // delete object from DB

  deleteBook = async (id) => {
    try {
      let url = 'http://localhost:3001/books/' + id; // '${process.env.REACT_APP_SERVER}/books' is not working
      console.log(url);
      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      })
    } catch (error) {
     console.log(error.message) 
    }
  }

  // update object
  putBook = async (bookObj)=> {
    try {
      let url = 'http://localhost:3001/books/' + bookObj._id; // '${process.env.REACT_APP_SERVER}/books' is not working
      let updatedBookFromAxios = await axios.put(url, bookObj);
      let updatedBooks = this.books.map(existingBook => {
        return existingBook._id === bookObj._id
        ? updatedBookFromAxios.data : existingBook
      });
      // currently app only updates on page refresh
      this.setState({
        books: updatedBooks  
      });
     } catch (error) {
      console.log(error.message);
     }
  }

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
         {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
          <Carousel.Item key={book._id}>
            <Carousel.Caption>
              <h3>{book.title}</h3>
              <p>Description: {book.description}</p>
              <button onClick={() => this.deleteBook(book._id)}>Delete</button> 
              <button onClick={() => this.openUpdateModal(book)}>Update</button> 
              </Carousel.Caption>
              <p>{book.status}</p>
                     <img src= "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt= "image of a book" height = "600"/>            
          </Carousel.Item>
  ))}
          </Carousel>
          ): (
            <h3>Book Collection Empty</h3>
          )}
           
        <Container>
          <Form onSubmit = {this.handleBookSubmit} >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descritpion</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Check type="checkbox" />
          </Form.Group>
          <Button type="submit">Add Book</Button>
          </Form>
        </Container>
        <AddBookModal />
        <UpdateBookModal 
          showModal={this.state.showModal} 
          closeUpdateModal={this.closeUpdateModal} 
          bookToUpdate={this.state.bookToUpdate} 
          putBook={this.putBook}
          />
      </>
    )
  }
}

export default BestBooks;
