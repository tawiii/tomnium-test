import {combineReducers} from 'redux';
import auth from './auth';
import errors from './errors';
import login from './login';
import userProducts from './userProducts';

export default combineReducers({
    auth, errors, login, userProducts
})
