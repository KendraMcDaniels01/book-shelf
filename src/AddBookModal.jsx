import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class AddBookModal extends React.Component {
  render() {
    return(
    <Modal show={this.props.showModal}>
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
    </Modal>
  )}
}

export default AddBookModal;