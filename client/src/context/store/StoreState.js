import React, { useReducer } from 'react';
import axios from 'axios';
import StoreContext from './storeContext';
import StoreReducer from './storeReducer';
import {
  ADD_STORE,
  GET_STORES,
  DELETE_STORE,
  UPDATE_STORE,
  GET_PRODUCTS,
  STORE_ERROR,
  CLEAR_STORES
  // ADD_ORDER,
  // UPDATE_ORDER
} from '../types';

const StoreState = props => {
  const initialState = {
    products: {},
    stores: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(StoreReducer, initialState);

  // Get Stores
  const getStores = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get('/api/stores', config);
      dispatch({
        type: GET_STORES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: STORE_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  // Clear stores
  const clearStores = () => dispatch({ type: CLEAR_STORES });

  // Add store
  const addStore = async store => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      store.orders = [];
      const res = await axios.post('/api/stores', store, config);
      dispatch({
        type: ADD_STORE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: STORE_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  // Delete store
  const deleteStore = id => {
    dispatch({
      type: DELETE_STORE,
      payload: id
    });
  };

  // Update store
  const updateStore = (id, store) => {
    dispatch({
      type: UPDATE_STORE,
      payload: { id, store }
    });
  };

  // Add order
  const addOrder = async (storeId, order) => {
    await axios.put('/:storeId');
    dispatch({
      type: ADD_STORE,
      payload: { id: storeId, order }
    });
  };

  // Update order

  const updateOrder = (storeId, order) => {
    dispatch({
      type: ADD_STORE,
      payload: { id: storeId, order }
    });
  };

  // Get products
  const getProducts = async () => {
    const products = {
      bakery: [],
      beverages: [],
      canned: [],
      'personal Care': [],
      meat: [],
      produce: [],
      cleaners: [],
      'dry Goods': [],
      dairy: [],
      other: []
    };
    let res = [];
    await axios
      .get('/api/products')
      .then(response => {
        res = [...response.data];
      })
      .catch(error => {
        console.log(error);
      });

    res.forEach(product => {
      products[`${product.category}`].push(product);
    });

    dispatch({
      type: GET_PRODUCTS,
      payload: products
    });
  };
  // Clear filter

  return (
    <StoreContext.Provider
      value={{
        stores: state.stores,
        error: state.error,
        addStore,
        getStores,
        clearStores,
        deleteStore,
        updateStore,
        addOrder,
        updateOrder,
        getProducts,
        products: state.products
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreState;
