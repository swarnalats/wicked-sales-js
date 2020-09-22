import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './CartSummary';

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
        this.setState({ cart: data });
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
      .then(data => { const cartData = this.state.cart; cartData.push(data); this.setState({ cart: cartData }); this.getCartItems(); console.log('Data Added', this.state.cart); })
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
    return (
      <div> <Header title="$ Wicked Sales" cartCount={this.state.cart.length} viewState={this.setView}/>
        {
          !this.state.isLoading
            ? this.state.view.name === 'catalog'
              ? <div >
                {/* <Header title="$ Wicked Sales" cartCount={this.state.cart.length} viewState={this.setView}/> */}
                <ProductList view={this.setView} />
              </div>
              : this.state.view.name === 'cart'
                ? <div >
                  {/* <Header title="$ Wicked Sales" cartCount={this.state.cart.length} viewState={this.setView}/> */}
                  {/* <ProductList view={this.setView} /> */}
                  <CartSummary cartState={this.state.cart} viewMethod={this.setView}/>
                </div>
                : <div >
                  {/* <Header title="$ Wicked Sales" cartCount={this.state.cart.length} viewState={this.setView}/> */}
                  <ProductDetails viewState = {this.state.view.params} viewMethod={this.setView} addToCart={this.addToCart}/>
                </div>
            : <h1>{ this.state.message }</h1>
        }
      </div>
    );
  }
}

export default App;
