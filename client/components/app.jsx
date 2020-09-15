import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
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
  }

  render() {
    // alert(this.state.view.name);
    return !this.state.isLoading
      ? this.state.view.name === 'catalog'
        ? <div>
          <Header title="Wicked Sales" />
          <ProductList view={this.setView} />
        </div>
        : <div>
          <Header title="Wicked Sales" />
          <ProductDetails viewState = {this.state.view.params} viewMethod={this.setView}/>
        </div>
      : <h1>{ this.state.message }</h1>;
  }
}

export default App;
