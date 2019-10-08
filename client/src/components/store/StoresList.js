import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Store from './Store';

const StoresList = ({ stores, client }) => {
  return (
    <div style={storeListStyle} className='py-2 fade-in'>
      <h2 style={{ textAlign: 'center' }}>Stores Management</h2>
      <div className='mb-2'>
        <Link
          to={{
            pathname: '/addstore',
            state: {
              client: client
            }
          }}
        >
          {!stores ? (
            <Button>Add First Store</Button>
          ) : (
            <Button>Add Store</Button>
          )}
        </Link>
      </div>
      <div className='stores-grid'>
        {stores && stores.map(store => <Store key={store._id} store={store} />)}
      </div>
    </div>
  );
};

const storeListStyle = {
  padding: '0.5rem',
  width: '100%',
  height: 'fit-content',
  background: 'var(--blue)',
  borderRadius: '0.5rem'
};

export default StoresList;
