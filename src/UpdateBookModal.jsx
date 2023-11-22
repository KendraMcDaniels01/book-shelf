import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class UpdateBookModal extends React.Component {
  handleBookUpdate = (event) => {
    event.preventDefault();
    let bookToUpdate = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
      _id: this.props.bookToUpdate._id,
      __v: this.props.bookToUpdate.__v
    }
    this.props.putBook(bookToUpdate);
    this.props.closeUpdateModal();
  }
  render() {
    return(
    <Modal show={this.props.showModal} onHide={this.props.closeUpdateModal}>
      <Container>
          <Form onSubmit = {this.handleBookUpdate} >
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" defaultValue={this.props.bookToUpdate.title} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Descritpion</Form.Label>
            <Form.Control type="text" defaultValue={this.props.bookToUpdate.description} />
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Check type="checkbox" defaultChecked={this.props.bookToUpdate.status} />
          </Form.Group>
          <Button type="submit">Update Book</Button>
          </Form>
        </Container>
    </Modal>
  )}
}

export default UpdateBookModal;