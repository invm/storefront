import React, { /* useContext, */ useState, useEffect } from 'react';
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

const AddOrder = ({ id }) => {
  const [sum, setSum] = useState(0);
  const [orderProducts, setOrderProducts] = useState([]);

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
      if (item.id === product.id) {
        flag = 0;
      }
    }
    // If not than add as is
    let orders;
    if (flag) {
      orders = [...orderProducts, product];
    } else {
      // Else only change quantity
      orders = [
        ...orderProducts.map(item => {
          if (item.id === product.id) {
            item.quantityOrdered += product.quantityOrdered;
          }
          return item;
        })
      ];
    }
    setOrderProducts(orders);
  };

  const date = new Date().toString().slice(0, 21);
  return (
    <Container className='card fade-in my-3'>
      <Form className='my-2'>
        <FormGroup row>
          <Label for='store-id' sm={2}>
            Store ID
          </Label>
          <Col sm={10}>
            <Input disabled type='text' name='store-id' value={id} id='id' />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='order-time' sm={2}>
            Order Time
          </Label>
          <Col sm={10}>
            <Input disabled type='text' name='date' value={date} id='date' />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='examplePassword' sm={2}>
            Delivery Date
          </Label>
          <Col sm={10}>
            <Input
              type='date'
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
          <Label for='selectedProducts' sm={2}>
            Products:
          </Label>
          <Col sm={8}>
            <Input type='select' id='selectedProducts' multiple>
              {orderProducts.map(product => (
                <option key={product.id} value={product.name}>
                  {product.name}, Ordered {product.quantityOrdered} boxes, total
                  price: {product.quantityOrdered * product.price}$
                </option>
              ))}
            </Input>
          </Col>
          <Col sm={2}>
            <Button block onClick={removeItems}>
              Remove Product
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='selectedProducts' sm={2}>
            Total Price:
          </Label>
          <Col sm={10}>
            <h3>{sum} $</h3>
          </Col>
        </FormGroup>
        <FormGroup row>
          <ProductsList addItem={addItem} />
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default AddOrder;
