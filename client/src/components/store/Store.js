import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert, Badge } from 'reactstrap';

const Store = ({ store }) => {
  const { _id, name, size, address, orders } = store;
  return (
    <div className='card fade-in' style={storeStyle}>
      <Alert color='info' style={truncate}>
        {name}
      </Alert>
      <Badge color='info'>{size.charAt(0).toUpperCase() + size.slice(1)}</Badge>
      <span>
        Address: {address.street}
        {', '}
        {address.city}
      </span>
      <span>
        Last Order :{' '}
        {orders.length > 0
          ? orders[orders.length - 1].orderDate.toString().slice(0, 10)
          : 'Never'}
      </span>
      <span>
        <Button block disabled>
          Orders: {orders.length}
        </Button>
      </span>
      <Link to={`/store/${_id}`}>
        <Button block color='info' className='my-2'>
          {' '}
          View Details{' '}
        </Button>
      </Link>
    </div>
  );
};

const storeStyle = {
  padding: '0.25rem',
  display: 'grid',
  gridTemplateColumns: 'repeat(1,1fr)'
};

const truncate = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default Store;
