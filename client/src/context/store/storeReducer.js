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

export default (state, action) => {
  switch (action.type) {
    case ADD_STORE:
      return {
        ...state,
        stores: [...state.stores, action.payload]
      };

    default:
      return state;
  }
};
