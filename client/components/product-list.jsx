import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    fetch('api/products')
      .then(response => response.json())
      .then(result => {
        this.setState({
          products: result
        });
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className={'container'}>
        <div className={'row'}>
          {
            this.state.products.map(product => (
              <ProductListItem key={product.productId} product={product} click={this.props.view} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default ProductList;
