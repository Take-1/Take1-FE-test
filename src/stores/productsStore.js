import Store from "./store";
import Dispatcher from "../dispatcher";
import ActionTypes from "../constants/actions";
import CategoriesStore from "./categoriesStore";

let allProducts = [];

let categoryProducts = [];

let categoryProductsFiltered = [];

let searchText = "";

function getCategoryProducts() {
  if (categoryProductsFiltered.length) {
    return categoryProductsFiltered;
  }
  return categoryProducts;
}


class ProductsStore extends Store {
  constructor() {
    super();

    Dispatcher.register(this.registerActions.bind(this));
  }

  registerActions(action) {
    switch (action.actionType) {
      case ActionTypes.PRODUCTS_LOADED:
        allProducts = action.payload;
        this.updateProducts(CategoriesStore.getStore().selectedCategory);
        this.emit(this.CHANGE);
        break;
      case ActionTypes.CATEGORY_CHANGED:
      case ActionTypes.GET_PRODUCTS_ONCE:
        this.updateProducts(action.payload);
        this.emit(this.CHANGE);
        break;
      case ActionTypes.SEARCH_INPUT_CHANGED:
        searchText = action.payload;
        categoryProductsFiltered = [];
        if (searchText.trim() !== "") {
          let categoryProductsLength = categoryProducts.length;
          for (let i = 0; i < categoryProductsLength; i++) {
            let product = categoryProducts[i];
            if (
              product.title
                .toLowerCase()
                .indexOf(searchText.trim().toLowerCase()) > -1
            ) {
              categoryProductsFiltered.push(product);
            }
          }
        }
        this.emit(this.CHANGE);
        break;
      default:
        break;
    }
  }

  updateProducts(categoryId) {
    searchText = "";
    categoryProductsFiltered = [];

    categoryProducts = [];

    if (categoryId) {
      let productsLength = allProducts.length;
      for (let i = 0; i < productsLength; i++) {
        let product = allProducts[i];
        let productCategoriesLength = product.categories.length;
        for (let j = 0; j < productCategoriesLength; j++) {
          let productCategory = product.categories[j];
          if (categoryId === productCategory.id) {
            categoryProducts.push(product);
            break;
          }
        }
      }
    } else {
      categoryProducts = allProducts;
    }
  }

  getStore() {
    return {
      products: getCategoryProducts(),
      searchText: searchText
    };
  }
}

export default new ProductsStore();
