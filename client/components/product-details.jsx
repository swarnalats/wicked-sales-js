import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(response => response.json())
      .then(resp => this.setState({
        product: resp,
        isLoading: false
      })
      )
      .catch(err => this.setState({ message: err.message })
      );
  }

  render() {
    return !this.state.isLoading
      ? <div className={'card'} >
        <h1>Wicked Sales</h1>
        <div className={'card-body'}>
          <button onClick={ e => { this.props.viewMethod('catalog', {}); }}>Back to Catalog</button>
          <h5 > {this.state.product.name}</h5>
          <img src={this.state.product.image} className={'card-img-top'} />
          <p>{this.state.product.price}</p>
          <p>{this.state.product.longDescription}</p>
        </div>
      </div>
      : <h1> {this.state.message }</h1>;
  }
}

export default ProductDetails;
