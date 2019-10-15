import React, { useContext, useEffect } from 'react';
import { Button, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import StoreContext from '../../context/store/storeContext';
import AuthContext from '../../context/auth/authContext';

import Store from './Store';

const StoresList = () => {
  const storeContext = useContext(StoreContext);
  const authContext = useContext(AuthContext);

  const { stores, getStores, loading } = storeContext;

  useEffect(() => {
    getStores();
    //eslint-disable-next-line
  }, []);

  return (
    <div style={{ padding: '0.5rem' }} className='card py-2 fade-in'>
      {stores !== null && !loading ? (
        <>
          <h2 style={{ textAlign: 'center' }}>Stores Management</h2>
          <div className='mb-2'>
            <Link
              to={{
                pathname: '/addstore',
                state: {
                  client: authContext.user._id
                }
              }}
            >
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
    </div>
  );
};

export default StoresList;
