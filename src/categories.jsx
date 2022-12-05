import React from "react";

import CategoriesStore from "./stores/categoriesStore";
import CategoriesActions from "./actions/categoriesActions";
import CategoryStyles from "./styles/categories.css";
import Utils from "./utils";

/*
  Flux 'Controller-View' component.
  Uses to the CategoriesStore to receive state changes.

  Calls the fetchCategories action in componentWillMount().
  Category changes update the url hash
  Calls the categoryChanged action when an action is clicked in categoryClicked().
  Calls the categoryChanged action when the back/forward button used by listening to the hashchange event.
  Calls the categoryChanged action in componentDidMount() incase the first url loaded has a category hash.
 */
class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.onCategoriesStoreUpdated = this.onCategoriesStoreUpdated.bind(this);
    this.onHashChange = this.onHashChange.bind(this);
    this.state = CategoriesStore.getStore();
  }

  onCategoriesStoreUpdated() {
    this.setState(CategoriesStore.getStore());
  }

  onHashChange() {
    CategoriesActions.categoryChanged(Utils.getParameterFromHash("category"));
  }

  componentWillMount() {
    window.addEventListener("hashchange", this.onHashChange, false);
    CategoriesStore.addChangeListener(this.onCategoriesStoreUpdated);
    CategoriesActions.fetchCategories();
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.onHashChange, false);
    CategoriesStore.removeChangeListener(this.onCategoriesStoreUpdated);
  }

  componentDidMount() {
    CategoriesActions.categoryChanged(Utils.getParameterFromHash("category"));
  }

  categoryClicked(id, e) {
    e.preventDefault();
    history.pushState(null, null, "#category=" + id);
    CategoriesActions.categoryChanged(id);
  }

  render() {
    return (
      <ul className={CategoryStyles.categoryList}>
        {this.state.categories.map(category => (
          <li key={category.id}>
            <a
              href="#"
              className={
                category.id === this.state.selectedCategory
                  ? CategoryStyles.selectedCategory
                  : null
              }
              onClick={this.categoryClicked.bind(this, category.id)}
            >
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

module.exports = Categories;
