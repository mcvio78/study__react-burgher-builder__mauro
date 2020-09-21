import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false,
};

const purchaseInit = state => {
  return updateObject(state, { purchased: false });
};

const purchaseStart = state => {
  return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  const stateUpdatedProperties = {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  };
  return updateObject(state, stateUpdatedProperties);
};

const purchaseBurgerFail = state => {
  const stateUpdatedProperties = {
    loading: false,
    error: true,
  };
  return updateObject(state, stateUpdatedProperties);
};

const fetchOrderStart = state => {
  return updateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  const stateUpdatedProperties = {
    orders: action.orders,
    loading: false,
  };
  return updateObject(state, stateUpdatedProperties);
};

const fetchOrderFail = state => {
  const stateUpdatedProperties = {
    error: true,
    loading: false,
  };
  return updateObject(state, stateUpdatedProperties);
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);
    default:
      return state;
  }
};

export default orderReducer;
