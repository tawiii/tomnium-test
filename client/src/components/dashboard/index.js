import React, {Component} from 'react';
import {Grid, Table} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {getCurrentProducts} from "../../AC/product";
import Spinner from '../common/Spinner';


class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProducts();
  }

  handleProduct = (id) => {
    this.props.history.push(`/product/${id}`)
  }

  render () {
    const {loading, products} = this.props;

    if(loading) {
      return  <Spinner />
    }

    return (
      <div className="ui container">
        {console.log("products", products)}
        <div className="text-center create">
          <NavLink to="/create-product">Create product</NavLink>
        </div>
        <Grid columns={16} centered>
          <Grid.Column width={16}>
            { products.length ?
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>CreatedBy</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    products.map(item => {
                      return (
                        <Table.Row
                          onClick={() => this.handleProduct(item._id)}
                          key={item._id}
                          className="table-row"
                          >
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.price}</Table.Cell>
                          <Table.Cell>{item.description}</Table.Cell>
                          <Table.Cell>{item.createdBy.name}</Table.Cell>
                        </Table.Row>
                      )
                    })
                  }
                </Table.Body>
              </Table>
              :
              null
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  ({auth, userProducts}) => ({
    isAuth: auth.isAuth,
    loading: userProducts.loading,
    products: userProducts.products
  }), {getCurrentProducts}
)(withRouter(Dashboard));
