import React, { /* useContext ,*/ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import StoreContext from '../../context/store/storeContext';
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import ProductsList from './ProductsList';

const AddOrder = ({ store }) => {
  // const storeContext = useContext(StoreContext);
  const [sum, setSum] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);
  const [order, setOrder] = useState({ store: store._id });

  useEffect(() => {
    let newSum = orderProducts.reduce((total, current) => {
      return total + current.price * current.quantityOrdered;
    }, 0);
    setSum(newSum);
  }, [orderProducts]);

  const removeItems = e => {
    let select = document.querySelector('#selectedProducts').selectedOptions;
    let toDelete = [];
    for (let option of select) {
      toDelete.push(option.value);
    }
    setOrderProducts(
      orderProducts.filter(product => {
        // Check for every item, all selected products
        let flag = 1;
        for (let i = 0; i < toDelete.length && flag; i++) {
          if (product.name === toDelete[i]) {
            flag = 0;
            product.quantityOrdered = 0;
            break;
          }
        }
        if (flag) return product;
        return null;
      })
    );
  };

  const addItem = product => {
    // Check if already in list
    let flag = 1;
    for (let item of orderProducts) {
      if (item._id === product._id) {
        flag = 0;
      }
    }
    // If not than add as is
    let orders;
    if (flag) {
      orders = [...orderProducts, product];
    } else {
      // Else only change quantity
      orders = [...orderProducts];
    }
    setOrderProducts(orders);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (orderProducts.length > 0) {
      let newOrder = {
        ...order,
        orderDate: new Date().toString().slice(0, 21)
      };
      console.log(newOrder);
      // storeContext.addOrder(store._id);
    }
  };

  const onChange = e => {
    setOrder({
      ...order,
      [e.target.id]: e.target.value
    });
  };

  const date = new Date().toString().slice(0, 21);
  return (
    <Container className='card fade-in my-3'>
      <Form className='my-2'>
        <FormGroup row>
          <Label for='store-id' sm={2}>
            Store ID
          </Label>
          <Col xs={8}>
            <Input
              disabled
              type='text'
              name='store-id'
              value={store._id}
              id='id'
            />
          </Col>
          <Col>
            <Link
              className='mx-1'
              to={{
                pathname: `/store/${store._id}`,
                state: {
                  store
                }
              }}
            >
              <Button
                color='dark'
                style={{
                  display: 'inline-block',
                  fontSize: '1.4rem',
                  padding: '0.15rem 0.3rem'
                }}
              >
                <span role='img' aria-label='back'>
                  🔙
                </span>
              </Button>
            </Link>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='order-time' sm={2}>
            Order Time
          </Label>
          <Col sm={10}>
            <Input
              disabled
              type='text'
              name='order-time'
              value={date}
              id='order-time'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='deliveryDate' md={2}>
            Delivery Date
          </Label>
          <Col md={10}>
            <Input
              type='date'
              onChange={onChange}
              // Min date is tomorrow
              min={
                new Date().toISOString().slice(0, 9) +
                (Number(new Date().toISOString().slice(9, 10)) === 9
                  ? 0
                  : Number(new Date().toISOString().slice(9, 10)) + 1)
              }
              name='deliveryDate'
              id='deliveryDate'
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='selectedProducts' md={2}>
            Products:
          </Label>
          <Col md={8}>
            <Input type='select' id='selectedProducts' multiple>
              {orderProducts.map(product => (
                <option key={product._id} value={product.name}>
                  {product.name}, Ordered{' '}
                  {product.quantityOrdered === 1
                    ? product.quantityOrdered + ' box'
                    : product.quantityOrdered + ' boxes'}{' '}
                  , total price:{' '}
                  {(product.quantityOrdered * product.price).toFixed(2)}$
                </option>
              ))}
            </Input>
          </Col>
          <Col md={2}>
            <Button block onClick={removeItems}>
              Remove
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='selectedProducts' sm={2}>
            Total Price:
          </Label>
          <Col sm={10}>
            <h3>{sum.toFixed(2)} $</h3>
          </Col>
        </FormGroup>
        <FormGroup row>
          <ProductsList addItem={addItem} />
        </FormGroup>
        <FormGroup check row>
          <Col>
            <Button block style={{ fontSize: '2rem' }} onClick={onSubmit}>
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default AddOrder;
