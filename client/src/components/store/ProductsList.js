import React, { useState, useContext, useEffect } from 'react';
import StoreContext from '../../context/store/storeContext';
import {
  Row,
  Container,
  Badge,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Spinner
} from 'reactstrap';

const ProductsList = ({ addItem }) => {
  const storeContext = useContext(StoreContext);
  const products = storeContext.products;
  // TODO !
  const [category, setCategory] = useState('bakery');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function get() {
      await storeContext.getProducts();
      await setLoading(false);
    }
    if (Object.keys(products).length === 0) get();
    else setLoading(false);
  }, [products, storeContext]);

  const onChange = e => {
    setCategory(e.target.id);
  };

  const categories = [
    'bakery',
    'beverages',
    'canned',
    'personal Care',
    'meat',
    'produce',
    'cleaners',
    'dry Goods',
    'dairy',
    'other'
  ];

  if (loading)
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Spinner style={{ width: '7rem', height: '7rem' }} color='info' />
      </div>
    );
  return (
    <Container style={{ padding: '0' }}>
      <Row>
        {categories.map(cat => {
          return (
            <label
              key={cat}
              className='card btn-light '
              style={categoryStyle}
              htmlFor={cat}
            >
              {cat[0].toUpperCase() + cat.slice(1)}
              <input
                type='radio'
                name='category'
                onChange={onChange}
                id={cat}
              />
            </label>
          );
        })}
      </Row>
      <div className='products-list'>
        {products &&
          products[`${category}`].map(product => (
            <Product key={product._id} product={product} addItem={addItem} />
          ))}
      </div>
    </Container>
  );
};

export default ProductsList;

const categoryStyle = {
  cursor: 'pointer',
  padding: '1rem 0.5rem',
  margin: '1.5%',
  textAlign: 'center'
};

const Product = ({ product, addItem }) => {
  const [amount, setAmount] = useState(1);

  const onClick = e => {
    e.preventDefault();
    if (product.quantityOrdered) product.quantityOrdered += Number(amount);
    else product.quantityOrdered = Number(amount);
    addItem(product);
    setAmount(1);
  };

  const onChange = e => {
    setAmount(e.target.value);
  };
  return (
    <div key={product._id} className='card' style={categoryStyle}>
      <Badge color='warning'>
        {product.name[0].toUpperCase() + product.name.slice(1)}{' '}
      </Badge>
      Supplier: {product.supplier} <br />
      Quantity In Box: {product.quantityInBox} <br />
      Price :{product.price}
      <InputGroup>
        <Input
          min='1'
          type='number'
          value={amount}
          placeholder='Quantity'
          style={{ width: '20px' }}
          onChange={onChange}
        />
        <InputGroupAddon addonType='prepend'>
          <Button onClick={onClick}>Add</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
