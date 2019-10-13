import React, { useState } from 'react';
import { Alert, Badge, Collapse, Button, CardBody, Card } from 'reactstrap';

const OrdersList = ({ orders }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div>
      <Button color='primary' className='my-2' onClick={toggle}>
        Orders{' '}
        {!collapse ? (
          <span style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
            &#9662;
          </span>
        ) : (
          <span style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
            &#9666;
          </span>
        )}{' '}
      </Button>
      <Collapse isOpen={collapse}>
        {orders.map(order => {
          const {
            _id,
            signedBy,
            status,
            isDelivered,
            orderDate,
            deliveryDate,
            products,
            sum
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
                <span>Order #{_id}</span>
                <Badge color={`${status ? 'success' : 'danger'}`}>
                  {status ? 'Active' : 'Inactive'}
                </Badge>
              </Alert>
              <span>Order date: {orderDate}</span>
              <h5>Total price: {sum}</h5>
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
                  <Products products={products} />
                </div>
              ) : null}
              {}
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default OrdersList;

const Products = ({ products }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div>
      <Button color='primary' onClick={toggle} style={{ marginBottom: '1rem' }}>
        Products ordered{' '}
        {!collapse ? (
          <span style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
            &#9662;
          </span>
        ) : (
          <span style={{ fontSize: '1.5rem', marginLeft: '1rem' }}>
            &#9666;
          </span>
        )}{' '}
      </Button>
      <Collapse isOpen={collapse}>
        <Card>
          <CardBody>
            {products.map(product => (
              <p key={Math.random() * Math.random()}>
                <span className='text-primary'>Product:{product.name}</span>
                <br />
                <span>Quantity ordered: {product.quantityOrdered}</span>
                <br />
                <span>Price: {product.price}</span>
                <br />
                <span>Total : {product.quantityOrdered * product.price}</span>
              </p>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
