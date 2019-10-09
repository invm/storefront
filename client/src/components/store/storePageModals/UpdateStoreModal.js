import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const UpdateStoreModal = ({ store, updateStore }) => {
  const [modal, setModal] = useState(false);
  const [newStore, setNewStore] = useState(store);

  const toggle = () => {
    setModal(!modal);
  };

  const onUpdateStore = e => {
    updateStore(store._id, newStore);
    toggle();
  };

  const onChange = e => {
    switch (e.target.name) {
      case 'contact':
      case 'address':
        setNewStore({
          ...newStore,
          [e.target.name]: {
            ...newStore[e.target.name],
            [e.target.id]: e.target.value
          }
        });
        break;
      default:
        setNewStore({
          ...newStore,
          [e.target.name]: e.target.value
        });
        break;
    }
  };

  return (
    <div>
      <Button
        color='dark'
        style={{
          display: 'inline-block',
          fontSize: '1.4rem',
          fontWeight: '800',
          marginRight: '0.25rem',
          padding: '0.15rem 0.5rem'
        }}
        onClick={toggle}
      >
        &#8634;
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Store Info</ModalHeader>
        <ModalBody>
          <Form className='my-2'>
            <FormGroup row>
              <Label for='name' sm={2}>
                Store Name
              </Label>
              <Col sm={10}>
                <Input
                  type='text'
                  onChange={onChange}
                  value={newStore.name}
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
                  value={newStore.address.city}
                  type='text'
                  name='address'
                  id='city'
                />
                <Input
                  onChange={onChange}
                  value={newStore.address.street}
                  placeholder='Street'
                  type='text'
                  name='address'
                  id='street'
                />
                <Input
                  placeholder='Zip'
                  onChange={onChange}
                  value={newStore.address.zipcode}
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
                  value={newStore.contact.name}
                  placeholder='Contact Name'
                  type='text'
                  name='contact'
                  id='name'
                />
                <Input
                  onChange={onChange}
                  value={newStore.contact.phone}
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
                  value={newStore.size}
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
                    Serves overs 5000 customers a day{' '}
                  </option>
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={onUpdateStore}>
            Update store info
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateStoreModal;
