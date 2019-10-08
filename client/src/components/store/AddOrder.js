import React, { useContext } from 'react';
import StoreContext from '../../context/store/storeContext';
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from 'reactstrap';

const AddStore = () => {
  const storeContext = useContext(StoreContext);

  const { stores } = storeContext;

  const storeNames = stores ? stores.map(store => store.name) : null;

  const date = new Date().toString().slice(0, 21);
  return (
    <Container className='card fade-in my-3'>
      <Form className='my-2'>
        <FormGroup row>
          <Label for='exampleEmail' sm={2}>
            Order Time
          </Label>
          <Col sm={10}>
            <Input disabled type='text' name='date' value={date} id='date' />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='examplePassword' sm={2}>
            Order Delivery Time
          </Label>
          <Col sm={10}>
            <Input type='date' name='deliveryDate' id='deliveryDate' />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='exampleSelect' sm={2}>
            Select
          </Label>
          <Col sm={10}>
            <Input type='select' name='select' id='exampleSelect'>
              {storeNames
                ? storeNames.map(store => (
                    <option value={store}>{store}</option>
                  ))
                : null}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='exampleSelectMulti' sm={2}>
            Select Multiple
          </Label>
          <Col sm={10}>
            <Input
              type='select'
              name='selectMulti'
              id='exampleSelectMulti'
              multiple
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='exampleText' sm={2}>
            Text Area
          </Label>
          <Col sm={10}>
            <Input type='textarea' name='text' id='exampleText' />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='exampleFile' sm={2}>
            File
          </Label>
          <Col sm={10}>
            <Input type='file' name='file' id='exampleFile' />
            <FormText color='muted'>
              This is some placeholder block-level help text for the above
              input. It's a bit lighter and easily wraps to a new line.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup tag='fieldset' row>
          <legend className='col-form-label col-sm-2'>Radio Buttons</legend>
          <Col sm={10}>
            <FormGroup check>
              <Label check>
                <Input type='radio' name='radio2' /> Option one is this and
                that—be sure to include why it's great
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type='radio' name='radio2' /> Option two can be something
                else and selecting it will deselect option one
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type='radio' name='radio2' disabled /> Option three is
                disabled
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='checkbox2' sm={2}>
            Checkbox
          </Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type='checkbox' id='checkbox2' /> Check me out
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default AddStore;
