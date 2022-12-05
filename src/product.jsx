import React from "react";

import ProductStyles from "./styles/product.css";

/*
  Flux 'Simple-View' component

  Renders a single Product whos details are passed through props
  Toggles a description when the title is clicked
 */
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: this.props.product, selected: false };
  }

  render() {
    return (
      <div className={ProductStyles.product}>
        <span
          className={this.state.selected ? ProductStyles.productActive : null}
          onClick={() => this.setState({ selected: !this.state.selected })}
        >
          {this.state.product.title}
        </span>
        {this.state.selected ? (
          <div className={ProductStyles.productDescription}>
            {this.state.product.description}
          </div>
        ) : null}
      </div>
    );
  }
}

module.exports = Product;
