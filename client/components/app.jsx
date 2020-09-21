import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        console.log('data from fetch', data);
        this.setState({ cart: data.length });
      })
      .catch(err => this.setState({ message: err.message }));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(data => { this.setState({ cart: this.state.cart + 1 }); console.log('No', this.state.cart); })
      .catch(error => { console.error('Error:', error); });
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: {
          productId: params
        }
      }
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  render() {
    return !this.state.isLoading
      ? this.state.view.name === 'catalog'
        ? <div >
          <Header title="$ Wicked Sales" cartCount={this.state.cart}/>
          <ProductList view={this.setView} />
        </div>
        : <div >
          <Header title="$ Wicked Sales" cartCount={this.state.cart}/>
          <ProductDetails viewState = {this.state.view.params} viewMethod={this.setView} addToCart={this.addToCart}/>
        </div>
      : <h1>{ this.state.message }</h1>;
  }
}

export default App;
