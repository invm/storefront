import React, { useContext, useEffect } from 'react';
import { Button, Spinner, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../../context/store/storeContext';

import Store from '../store/Store';

const StoresList = () => {
  const storeContext = useContext(StoreContext);

  const { stores, getStores, loading } = storeContext;

  useEffect(() => {
    if (!stores) getStores();
    // eslint-disable-next-line
  }, []);

  return (
    <Container
      style={{ padding: '0.5rem', height: '100%' }}
      className='bg-light card my-2 py-3 fade-in'
    >
      {stores !== null && !loading ? (
        <>
          <h2 className='text-center text-primary'>Stores Management</h2>
          <div className='mb-2'>
            <Link to='/addstore'>
              {stores.length === 0 && stores !== null ? (
                <Button>Add First Store</Button>
              ) : (
                <Button>Add Store</Button>
              )}
            </Link>
          </div>
          <div className='stores-grid'>
            {stores.length > 0 &&
              stores.map(store => <Store key={store._id} store={store} />)}
          </div>
        </>
      ) : (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Spinner
            className='fade-in'
            style={{ width: '7rem', height: '7rem' }}
            color='info'
          />
        </div>
      )}
    </Container>
  );
};

export default StoresList;
