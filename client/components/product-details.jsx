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
    fetch(`/api/products/${this.props.viewState.productId}`)
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
      ? <div className={'container'}>
        <div className={'row'}>
          <h6 className={'backToCatalogButton'} ><button onClick={ e => { this.props.viewMethod('catalog', {}); }}>Back to Catalog</button></h6>
        </div>
        <div className={'row'}>
          <div className={'col-md-5'}>
            <div ><img className={'imageArea1'} src={this.state.product.image} /></div>
          </div>
          <div className={'col-md-7'}>
            <h2> {this.state.product.name}</h2>
            <h4>{'$'}{this.state.product.price / 100}</h4>
            <h5>{this.state.product.shortDescription}</h5>
            <button className={'cartStyleButton'} onClick={ e => { this.props.addToCart(this.state.product); }}>Add to Cart</button>
          </div>
        </div>
        <div className={'row'}>
          <div><h6>{this.state.product.longDescription}</h6></div>
        </div>
      </div>
      : <h1> {this.state.message }</h1>;
  }
}
export default ProductDetails;
