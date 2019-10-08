import React, { useReducer } from 'react';
import uuid from 'uuid';
import StoreContext from './storeContext';
import StoreReducer from './storeReducer';
import {
  ADD_STORE,
  DELETE_STORE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_STORE,
  FILTER_STORES,
  CLEAR_FILTER,
  ADD_ORDER,
  UPDATE_ORDER
} from '../types';

const StoreState = props => {
  const initialState = {
    client: '5d967388d62205626e217ded',
    stores: [
      {
        size: 'medium',
        _id: '5d9673db1c9d440000712a74',
        client: '5d967388d62205626e217ded',
        name: 'Store one of Michael',
        address: {
          city: 'Beer Sheva',
          street: 'Shazar 1',
          zipcode: '12345'
        },
        contact: {
          name: 'Michael',
          phone: '1234567890'
        },
        orders: [
          {
            signedBy: {
              name: 'Michael',
              phone: '1234567890'
            },
            _id: '5d9825c71fe2c7153e280fd7',
            status: false,
            isDelivered: false,
            orderDate: '2019-01-09T22:00:00.000Z',
            deliveryDate: '2019-10-02T22:00:00.000Z',
            products: [
              {
                supplier: 'Supplier one',
                name: 'Product One',
                quantityOrdered: 10,
                _id: 7,
                quantityInBox: 100
              },
              {
                supplier: 'Supplier one',
                name: 'Product Two',
                quantityOrdered: 10,
                _id: 8,
                quantityInBox: 100
              },
              {
                supplier: 'Supplier one',
                name: 'Product Three',
                quantityOrdered: 10,
                _id: 9,
                quantityInBox: 100
              },
              {
                supplier: 'Supplier one',
                name: 'Product Four',
                quantityOrdered: 10,
                _id: 10,
                quantityInBox: 100
              }
            ],
            shop: '5d9673db1c9d440000712a74'
          }
        ]
      },
      {
        size: 'small',
        _id: '5d9684113cdc0b6cc25380f1',
        name: 'Store number three sadf sdaf sd fsdafasd  fa',
        address: {
          city: 'Haifa',
          street: 'Rager',
          zipcode: '2345678'
        },
        contact: {
          name: 'Dan',
          phone: '12345678900'
        },
        client: '5d967388d62205626e217ded',
        orders: [
          {
            signedBy: {
              name: 'Michael',
              phone: '1234567890'
            },
            status: true,
            isDelivered: false,
            orderDate: '2019-01-09T22:00:00.000Z',
            deliveryDate: '2019-10-02T22:00:00.000Z',
            products: [
              {
                quantityOrdered: 10,
                quantityInBox: 100,
                _id: 6,
                supplier: 'Supplier one',
                name: 'Product One'
              }
            ],
            _id: '5d9823f0c01e7413f604f61a'
          },
          {
            signedBy: {
              name: 'Michael',
              phone: '1234567890'
            },
            status: true,
            isDelivered: true,
            orderDate: '2019-01-09T22:00:00.000Z',
            deliveryDate: '2019-10-02T22:00:00.000Z',
            products: [
              {
                quantityOrdered: 10,
                quantityInBox: 100,
                supplier: 'Supplier one',
                name: 'Product One',
                _id: 5
              },
              {
                quantityOrdered: 10,
                quantityInBox: 100,
                _id: 4,
                supplier: 'Supplier one',
                name: 'Product One'
              },
              {
                quantityOrdered: 10,
                quantityInBox: 100,
                _id: 3,
                supplier: 'Supplier one',
                name: 'Product One'
              },
              {
                quantityOrdered: 10,
                quantityInBox: 100,
                supplier: 'Supplier one',
                name: 'Product One',
                _id: 2
              }
            ],
            _id: '5d981b6ea2f6fb0fcb32c983'
          },
          {
            signedBy: {
              name: 'Jonathan',
              phone: '1234567890'
            },
            status: false,
            isDelivered: false,
            orderDate: '2019-01-09T22:00:00.000Z',
            deliveryDate: '2019-10-02T22:00:00.000Z',
            products: [
              {
                quantityOrdered: 10,
                _id: 1,
                quantityInBox: 100,
                supplier: 'Supplier one',
                name: 'Product One'
              }
            ],
            _id: '5d9825c71fe2c7153e280fd7'
          }
        ],
        __v: 3
      },
      {
        size: 'large',
        _id: '5d987c2ba80e1a1fbaac89fc',
        name: 'Store number three',
        address: {
          city: 'Haifa',
          street: 'Rager',
          zipcode: '2345678'
        },
        contact: {
          name: 'Dan',
          phone: '12345678900'
        },
        client: '5d967388d62205626e217ded',
        orders: [],
        __v: 0
      }
    ]
  };

  const [state, dispatch] = useReducer(StoreReducer, initialState);

  // Add shop
  const addStore = store => {
    store.id = uuid.v4();
    store.orders = [];
    dispatch({
      type: ADD_STORE,
      payload: store
    });
  };

  // Delete shop

  // Set current shop

  // Clear current shop

  // Update shop

  // Add order

  // Update order

  // Filter shops

  // Clear filter

  return (
    <StoreContext.Provider
      value={{
        stores: state.stores,
        client: state.client,
        addStore
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreState;
