import React, { Component } from 'react';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {Grid, Card} from 'semantic-ui-react';
import {getProduct} from "../../AC/product";


class Product extends Component {

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.getProduct(id);
  }

  render () {
    console.log("this.props.product", this.props.product);
    const {loading, product} = this.props;

    if(loading) {
      return  <Spinner />
    }

    return (
      <div className="ui container">
        <Grid columns={16} centered>
          <Grid.Column width={8}>
            <Card fluid>
              <Card.Content header={product.name} />
              <Card.Content description={product.description} />
              <Card.Content>Price: {product.price}</Card.Content>
              <Card.Content>Created By: {product.createdBy ? product.createdBy.name : ''}</Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  ({userProducts}) => ({
    loading: userProducts.loading,
    product: userProducts.product
  }), {getProduct}
)(Product);
