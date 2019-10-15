import React from 'react';
import StoresList from '../store/StoresList';
import { Container } from 'reactstrap';

const Dashboard = () => {
  return (
    <div className='fade-in'>
      <Container className='py-3'>
        <StoresList />
      </Container>
    </div>
  );
};

export default Dashboard;
