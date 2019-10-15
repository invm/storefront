import React from 'react';
import AddOrder from '../store/AddOrder';

const AddOrderPage = props => {
  return (
    <div>
      <AddOrder store={props.props.location.state} />
    </div>
  );
};

export default AddOrderPage;
