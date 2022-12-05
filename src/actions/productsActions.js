import Dispatcher from "../dispatcher";
import ActionTypes from "../constants/actions";
import APIEndPoints from "../constants/apiEndPoints";
import Utils from "./../utils";

class ProductsActions {
  searchInputChanged(searchText) {
    Dispatcher.dispatch({
      actionType: ActionTypes.SEARCH_INPUT_CHANGED,
      payload: searchText
    });
  }

  fetchProducts() {
    Dispatcher.dispatch({
      actionType: ActionTypes.FETCH_PRODUCTS
    });

    Utils.fetch(
      {
        endPoint: APIEndPoints.ALL_PRODUCTS,
        method: "GET"
      },
      products => {
        Dispatcher.dispatch({
          actionType: ActionTypes.PRODUCTS_LOADED,
          payload: products.data
        });
      }
    );
  }
}

export default new ProductsActions();
