import React, { useContext, useState } from 'react';
import { Alert, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../../context/store/storeContext';
import DeleteStoreModal from '../store/storePageModals/DeleteStoreModal.js';
import UpdateStoreModal from '../store/storePageModals/UpdateStoreModal.js';
import OrdersList from '../store/OrdersList';

const StorePage = props => {
  const storeContext = useContext(StoreContext);
  // TODO spinner and and check if store belongs to user if so, load store, if not, redirect
  const storeFromLocation = props.props.location.state.store || props.store;
  const [store, setStore] = useState(storeFromLocation);
  const { _id, address, client, contact, name, size, orders } = store;

  const updateStore = (_id, store) => {
    storeContext.updateStore(_id, store);
    setStore(store);
  };

  return (
    <div className=' fade-in mt-2'>
      <Container className='py-3 card'>
        <div style={flex}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h5 style={truncate}>{name}</h5>
            <span style={{ display: 'flex' }}>
              <Link className='mx-1' to='/dashboard'>
                <Button
                  color='dark'
                  style={{
                    display: 'inline-block',
                    fontSize: '1.4rem',
                    padding: '0.15rem 0.3rem'
                  }}
                >
                  <span role='img' aria-label='back'>
                    🔙
                  </span>
                </Button>
              </Link>
              <UpdateStoreModal updateStore={updateStore} store={store} />
              <DeleteStoreModal store={store} />
            </span>
          </div>
          <div className='my-1'>
            <Alert style={truncate}>Store ID:{_id}</Alert>
          </div>
          <p>Size:{size}</p>
          <p style={truncate}>Client ID{client}</p>
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
          <Link to={{ pathname: `/addorder/${_id}`, state: store }}>
            <Button> Add Order</Button>
          </Link>
          <Button> Update Order</Button>
          {
            // TODO update order modal, should receive store id and the updated order
          }
          <div>{orders.length > 0 && <OrdersList orders={orders} />}</div>
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
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default StorePage;
