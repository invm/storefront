import React from 'react';
import { Alert, Container, Badge } from 'reactstrap';

const StorePage = props => {
  // TODO collapse on products and orders
  const store = props.props.location.state;
  const { _id, address, client, contact, name, size, orders } = store;
  return (
    <div className=' fade-in'>
      <Container className='py-3 card'>
        <div style={flex}>
          <h2>Store Page</h2>
          <div>
            <Alert>Store ID:{_id}</Alert>
            {size}
          </div>
          <p>Name:{name}</p>
          <p>Client ID{client}</p>
          <div>
            <p className='h6'>Address</p>
            {address.city}
            {address.street}
            {address.zipcode}
          </div>
          <div>
            <p className='h6'>Contact</p>
            {contact.name}
            {contact.phone}
          </div>
          <hr />
          <div>
            <span className='h5'>Orders</span>
            {orders.length > 0 &&
              orders.map(order => {
                const {
                  _id,
                  signedBy,
                  status,
                  isDelivered,
                  orderDate,
                  deliveryDate,
                  products
                } = order;
                return (
                  <div key={_id} className='card my-1 p-1'>
                    <Alert
                      color='secondary'
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{_id}</span>
                      <Badge color={`${status ? 'success' : 'danger'}`}>
                        {status ? 'Active' : 'Inactive'}
                      </Badge>
                    </Alert>
                    <>Order date: {orderDate}</>
                    <span>
                      {status ? (
                        <>
                          {isDelivered ? (
                            <>
                              <h6>Delivered at:</h6>
                              {deliveryDate}
                              <h6>Signed By:</h6>
                              {signedBy.name}, Phone :{signedBy.phone}
                            </>
                          ) : (
                            <>
                              <h6>Delivery scheduled for:</h6>
                              {deliveryDate}
                            </>
                          )}
                        </>
                      ) : null}
                    </span>
                    {products ? (
                      <div>
                        <h6>Products ordered:</h6>
                        {products.map(product => (
                          <p key={Math.random() * Math.random()}>
                            <span className='text-primary'>
                              Product:{product.name}
                            </span>
                            <br />
                            <span>
                              Quantity ordered: {product.quantityOrdered}
                            </span>
                            <br />
                            <span>
                              Quantity in box: {product.quantityInBox}
                            </span>
                            <br />
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
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

export default StorePage;
