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
          <div className={'col-sm'}>
            {
              this.state.products.map(product => (
                <ProductListItem key={product.productId} product={product} />
              ))
            }
          </div>
        </div>
      </div>

    );

  }
}

export default ProductList;
