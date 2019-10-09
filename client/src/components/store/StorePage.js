import React, { useContext, useState } from 'react';
import { Alert, Container, Button } from 'reactstrap';
import StoreContext from '../../context/store/storeContext';
import DeleteStoreModal from './storePageModals/DeleteStoreModal.js';
import UpdateStoreModal from './storePageModals/UpdateStoreModal.js';
import OrdersList from './OrdersList';

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
            <h5 style={truncate}>{name}</h5>
            <span style={{ display: 'flex' }}>
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
          <Button> Add Order</Button>
          <Button> Update Order</Button>
          {
            // TODO add order modal, the add order function should receive store id and the new order, should look like the update method in order to re render the page
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
