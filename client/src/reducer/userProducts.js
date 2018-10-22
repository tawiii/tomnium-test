import C from '../constants'

const defaultState = {
  products: [],
  loading: false,
  product: []
}

export default  (state = defaultState, action) => {
  const {type, payload} = action;
  switch(type) {
    case C.GET_CURRENT_PRODUCTS + C.START_LOAD:
    case C.CREATE_PRODUCT + C.START_LOAD:
    case C.GET_PRODUCT + C.START_LOAD:
    return {...state, loading: true}

    case C.GET_CURRENT_PRODUCTS + C.FINISH_LOAD:
    return {...state, loading: false, products: payload}

    case C.GET_PRODUCT + C.FINISH_LOAD:
    return {...state, loading: false, product: payload}

    case C.GET_ERRORS:
    case C.CREATE_PRODUCT + C.FINISH_LOAD:
    return {...state, loading: false}

    case C.CLEAR_PRODUCT:
    return {...state, products: null}
    default:
    return state;
  }
}
