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
                  <Toggle products={products} />
                </div>
              ) : null}
            </div>
          );
        })}
      </Collapse>
    </div>
  );
};

export default OrdersList;

const Toggle = ({ products }) => {
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
                <span>Quantity in box: {product.quantityInBox}</span>
                <br />
              </p>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
