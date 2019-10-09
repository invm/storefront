import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import StoreContext from '../../../context/store/storeContext';

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
          fontSize: '1.4rem',
          padding: '0.15rem 0.3rem'
        }}
        onClick={toggle}
      >
        <span role='img' aria-label='delete'>
          ❌
        </span>
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

export default DeleteStoreModal;
