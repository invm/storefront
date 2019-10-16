import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../../context/store/storeContext';
import AuthContext from '../../context/auth/authContext';
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const AddStore = props => {
  const storeContext = useContext(StoreContext);
  const authContext = useContext(AuthContext);
  const { client } = storeContext;
  const [store, setStore] = useState({
    client,
    size: 'small',
    name: '',
    address: {
      city: '',
      street: '',
      zipcode: ''
    },
    contact: {
      name: '',
      phone: ''
    }
  });

  const onChange = e => {
    switch (e.target.name) {
      case 'contact':
      case 'address':
        setStore({
          ...store,
          [e.target.name]: {
            ...store[e.target.name],
            [e.target.id]: e.target.value
          }
        });
        break;
      default:
        setStore({
          ...store,
          [e.target.name]: e.target.value
        });
        break;
    }
  };

  // Validate
  // const validate = e => {
  //   // TODO Minimal validation, maybe copy from whiskrs site
  // };

  const onSubmit = e => {
    storeContext.addStore(store);
    setStore({
      client,
      size: 'small',
      name: '',
      address: {
        city: '',
        street: '',
        zipcode: ''
      },
      contact: {
        name: '',
        phone: ''
      }
    });
  };

  return (
    <Container className='card fade-in my-3'>
      <Form className='my-2'>
        <FormGroup row>
          <Label for='client' sm={2}>
            Client ID
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              disabled
              value={authContext.user._id}
              name='client'
              id='client'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='name' sm={2}>
            Store Name
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              onChange={onChange}
              value={store.name}
              name='name'
              id='name'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='address' sm={2}>
            Address
          </Label>
          <Col sm={10}>
            <Input
              onChange={onChange}
              placeholder='City'
              value={store.address.city}
              type='text'
              name='address'
              id='city'
            />
            <Input
              onChange={onChange}
              value={store.address.street}
              placeholder='Street'
              type='text'
              name='address'
              id='street'
            />
            <Input
              placeholder='Zip'
              onChange={onChange}
              value={store.address.zipcode}
              type='text'
              name='address'
              id='zipcode'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='contact' sm={2}>
            Contact
          </Label>
          <Col sm={10}>
            <Input
              onChange={onChange}
              value={store.contact.name}
              placeholder='Contact Name'
              type='text'
              name='contact'
              id='name'
            />
            <Input
              onChange={onChange}
              value={store.contact.phone}
              placeholder='Contact Phone'
              type='text'
              name='contact'
              id='phone'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='storeSize' sm={2}>
            Store Size
          </Label>
          <Col sm={10}>
            <Input
              onChange={onChange}
              value={store.size}
              type='select'
              name='size'
            >
              <option value='small'>
                Serves less than 500 customers a day
              </option>
              <option value='medium'>
                Serves less than 1000 customers a day
              </option>
              <option value='large'>
                Serves less than 5000 customers a day
              </option>
              <option value='supermarket'>
                Serves over 5000 customers a day{' '}
              </option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{ size: 12 }}>
            <Link to='/dashboard'>
              <Button
                style={{ fontSize: '2rem' }}
                color='primary'
                block
                onClick={onSubmit}
              >
                Add Store
              </Button>
            </Link>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default AddStore;
