import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {Route, Switch} from 'react-router-dom';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard';
import PrivateRoute from './common/PrivateRoute';
import CreateProduct from './dashboard/CreateProduct';
import Product from './dashboard/Product';


class App extends Component {
  render() {
    return (
      <div className="wrap">
        <Nav />
        <div className="wrap-center">
          <Switch>
            <Route  path='/register' component={Register} />
            <Route  path='/login' component={Login} />
            <Route path='/product/:id' component={Product}/>
            <PrivateRoute  path='/create-product' component={CreateProduct} />
            <Route  path='/' component={Dashboard} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
