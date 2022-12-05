import React from "react";

import ProductsActions from "./actions/productsActions";
import ProductsStore from "./stores/productsStore";
import Product from "./product";

/*
  Flux 'Controller-View' component.
  Uses to the ProductsStore to receive state changes.

  Calls the fetchProducts action in componentWillMount().
  Calls the searchInputChanged action in input onChange event.
 */
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.onProductsStoreUpdated = this.onProductsStoreUpdated.bind(this);
    this.state = ProductsStore.getStore();
  }

  onProductsStoreUpdated() {
    this.setState(ProductsStore.getStore());
  }

  componentWillMount() {
    ProductsStore.addChangeListener(this.onProductsStoreUpdated);
    ProductsActions.fetchProducts();
  }

  componentWillUnmount() {
    ProductsStore.removeChangeListener(this.onProductsStoreUpdated);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={e => ProductsActions.searchInputChanged(e.target.value)}
          value={this.state.searchText}
        />
        {this.state.products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

module.exports = Products;
