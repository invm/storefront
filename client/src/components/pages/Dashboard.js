import React, { useContext } from 'react';
import StoresList from '../store/StoresList';
import { Container } from 'reactstrap';
import StoreContext from '../../context/store/storeContext';

const Dashboard = () => {
  const storeContext = useContext(StoreContext);

  const { stores, client } = storeContext;

  return (
    <div className='fade-in'>
      <Container className='py-3'>
        <StoresList stores={stores} client={client} />
      </Container>
    </div>
  );
};

export default Dashboard;
