import React, { useState } from 'react';
import UpdateOrderModal from './storePageModals/UpdateOrderModal';
import { Alert, Badge, Collapse, Button, CardBody, Card } from 'reactstrap';

const OrdersList = ({ orders, storeId }) => {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <div>
      <Button color='primary' className='my-2' onClick={toggle}>
        Orders {orders.length > 0 ? ': ' + orders.length : null}
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
          const { _id, status, isDelivered, products, sum } = order;
          let deliveryDate = new Date(order.deliveryDate);
          let orderDate = new Date(order.orderDate);
          return (
            <div key={_id} className=' card my-1 p-1'>
              <Alert color='secondary' className='row'>
                <span className='col-xs-8'>Order #{_id}</span>
                <div className='col-xs-4 d-flex align-items-center justify-content-center flex-row'>
                  <UpdateOrderModal storeId={storeId} order={order} />
                  <Badge
                    style={{ fontSize: '1.5rem' }}
                    color={`${status ? 'success' : 'danger'}`}
                  >
                    {status ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </Alert>
              <div className='row mx-2'>
                <span>
                  <h5>Order date: </h5>
                  {orderDate.toDateString()}
                </span>

                <span>
                  {status ? (
                    <>
                      {isDelivered ? (
                        <>
                          <h5>Delivered at:</h5>
                          {deliveryDate.toDateString()}
                        </>
                      ) : (
                        <>
                          <h5>Delivery scheduled for:</h5>
                          {deliveryDate.toDateString()}
                        </>
                      )}
                    </>
                  ) : null}
                </span>
                <Alert color='danger'>
                  <h5>Total price: {sum.toFixed(2)}$</h5>
                </Alert>
              </div>
              {products ? (
                <div>
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
        Products ordered {products.length}
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
          <CardBody className='row'>
            {products.map(product => (
              <p className='col-md-4 col-xs-12 col-sm-6' key={product._id}>
                <span className='text-primary'>Product:{product.name}</span>
                <br />
                <span>Quantity ordered: {product.quantityOrdered}</span>
                <br />
                <span>Price: {product.price}$</span>
                <br />
                <span>
                  Total : {(product.quantityOrdered * product.price).toFixed(2)}
                  $
                </span>
              </p>
            ))}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};
