import React from "react";

import Categories from "./categories";
import Products from "./products";

/*
  Renders a Categories and Products component.
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Categories />
        <Products />
      </div>
    );
  }
}

module.exports = App;

