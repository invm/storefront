/*
  This is the biggest component, it includes modals for deleting the store and also modal for store update, no sense to destructure those because they are used only here
*/

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Container,
  Badge,
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
import StoreContext from '../../context/store/storeContext';

const StorePage = props => {
  // TODO collapse on products and orders
  const storeContext = useContext(StoreContext);
  const storeFromLocation = props.props.location.state;
  const [store, setStore] = useState(storeFromLocation);
  const { _id, address, client, contact, name, size, orders } = store;

  const updateStore = (_id, store) => {
    storeContext.updateStore(_id, store);
    setStore(store);
  };

  return (
    <div className=' fade-in'>
      <Container className='py-3 card'>
        <div style={flex}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={truncate}>{name}</h2>
            <span style={{ display: 'flex' }}>
              <UpdateStoreModal updateStore={updateStore} store={store} />
              <DeleteStoreModal store={store} />
            </span>
          </div>
          <div className='my-1'>
            <Alert>Store ID:{_id}</Alert>
            Size:{size}
          </div>
          <p>Client ID{client}</p>
          <div>
            <p className='h6'>Address</p>
            {address.street}
            <br />

            {address.city}
            {', '}
            {address.zipcode}
          </div>
          <div>
            <p className='h6'>Contact</p>
            {contact.name}
            {contact.phone}
          </div>
          <hr />
          <Button> Add Order</Button>
          <Button> Update Order</Button>
          {
            // TODO add order modal, destructure all modals outside of this file, the add order function should receive store id and the new order, should look like the update method in order to re render the page
            // TODO update order modal, should receive store id and the updated order
          }
          <div>
            <span className='h5'>Orders</span>
            {orders.length > 0 &&
              orders.map(order => {
                const {
                  _id,
                  signedBy,
                  status,
                  isDelivered,
                  orderDate,
                  deliveryDate,
                  products
                } = order;
                return (
                  <div key={_id} className='card my-1 p-1'>
                    <Alert
                      color='secondary'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{_id}</span>
                      <Badge color={`${status ? 'success' : 'danger'}`}>
                        {status ? 'Active' : 'Inactive'}
                      </Badge>
                    </Alert>
                    <>Order date: {orderDate}</>
                    <span>
                      {status ? (
                        <>
                          {isDelivered ? (
                            <>
                              <h6>Delivered at:</h6>
                              {deliveryDate}
                              <h6>Signed By:</h6>
                              {signedBy.name}, Phone :{signedBy.phone}
                            </>
                          ) : (
                            <>
                              <h6>Delivery scheduled for:</h6>
                              {deliveryDate}
                            </>
                          )}
                        </>
                      ) : null}
                    </span>
                    {products ? (
                      <div>
                        <h6>Products ordered:</h6>
                        {products.map(product => (
                          <p key={Math.random() * Math.random()}>
                            <span className='text-primary'>
                              Product:{product.name}
                            </span>
                            <br />
                            <span>
                              Quantity ordered: {product.quantityOrdered}
                            </span>
                            <br />
                            <span>
                              Quantity in box: {product.quantityInBox}
                            </span>
                            <br />
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </div>
  );
};

const flex = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch'
};

const truncate = {
  fontSize: '1.3rem',
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default StorePage;

const DeleteStoreModal = ({ store }) => {
  const [modal, setModal] = useState(false);
  const storeContext = useContext(StoreContext);

  const toggle = () => {
    setModal(!modal);
  };

  const deleteStore = e => {
    storeContext.deleteStore(store._id);
  };
  const { name, size, orders, address } = store;

  return (
    <div>
      <Button
        color='dark'
        style={{
          display: 'inline-block',
          fontSize: '1.3rem',
          padding: '0.15rem 0.3rem'
        }}
        onClick={toggle}
      >
        ❌
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this store?
          <div className='my-2'>
            <h6>{name}.</h6>
            <p>Size:{size.charAt(0).toUpperCase() + size.slice(1)}</p>
            <p>
              Address: {address.street},{address.city}.
            </p>
            <p>Orders: {orders.length}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Link to='/dashboard'>
            <Button color='primary' onClick={deleteStore}>
              Yes, delete all store info
            </Button>
          </Link>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

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
          fontSize: '1.3rem',
          marginRight: '0.25rem',
          padding: '0.15rem 0.3rem'
        }}
        onClick={toggle}
      >
        🔃
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
