import axios from 'axios';
import C from '../constants';
import {setErrors} from './errors';

export const getCurrentProducts = () => dispatch => {
  dispatch({
    type: C.GET_CURRENT_PRODUCTS + C.START_LOAD
  })
  axios.get('/api/product')
  .then(({data}) => {
    dispatch({
      type: C.GET_CURRENT_PRODUCTS + C.FINISH_LOAD,
      payload: data
    })
  })
  .catch( ({response}) => dispatch(setErrors(response.data)))
}

export const createProduct = (dataProduct, history) => dispatch => {
  dispatch({
    type: C.CREATE_PRODUCT + C.START_LOAD
  })
  axios.post('/api/product', dataProduct)
  .then(res =>  {
    dispatch({ type: C.CREATE_PRODUCT + C.FINISH_LOAD})
    history.push('/')
  })
  .catch( ({response}) => dispatch(setErrors(response.data)))
}

export const getProduct = (id) => dispatch => {
  dispatch({
    type: C.GET_PRODUCT + C.START_LOAD
  })
  axios.get(`/api/product/${id}`)
  .then(({data}) => {
    console.log("data", data);
    dispatch({
      type: C.GET_PRODUCT + C.FINISH_LOAD,
      payload: data
    })
  })
  .catch( ({response}) => dispatch(setErrors(response.data)))
}
