import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../../context/store/storeContext';
import AuthContext from '../../context/auth/authContext';
import DeleteStoreModal from '../store/storePageModals/DeleteStoreModal.js';
import UpdateStoreModal from '../store/storePageModals/UpdateStoreModal.js';
import OrdersList from '../store/OrdersList';

const StorePage = props => {
  const storeContext = useContext(StoreContext);
  const authContext = useContext(AuthContext);
  const { stores } = storeContext;
  const store = stores.find(store => store._id === props.match.params.id);
  const { _id, address, client, contact, name, size, orders } = store;

  const updateStore = (_id, store) => {
    storeContext.updateStore(_id, store);
    // props.history.push('/dashboard');
  };

  if (stores.length === 0 || client !== authContext.user._id)
    return <Redirect to='/' />;
  return (
    <div className='fade-in mt-2'>
      <Container className='py-3 card'>
        <div className='d-flex flex-column align-items-stretch'>
          <div className='d-flex justify-content-between'>
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
          <p>Size: {size[0].toUpperCase() + size.slice(1)}</p>
          <div>
            <p className='h6'>Address</p>
            Street: {address.street}
            <br />
            City: {address.city}
            {', '}
            {address.zipcode}
          </div>
          <div>
            <p className='h6'>Contact</p>
            Name: {contact.name}
            <br />
            Phone: {contact.phone}
          </div>
          <hr />
          <Link to={`/addorder/${_id}`}>
            <Button> Add Order</Button>
          </Link>
          <div>
            {orders.length > 0 && <OrdersList storeId={_id} orders={orders} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

const truncate = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default StorePage;
