import Dispatcher from "../dispatcher";
import ActionTypes from "../constants/actions";
import APIEndPoints from "../constants/apiEndPoints";
import Utils from "./../utils";

class CategoriesActions {
  fetchCategories() {
    Dispatcher.dispatch({
      actionType: ActionTypes.FETCH_CATEGORIES
    });

    Utils.fetch(
      {
        endPoint: APIEndPoints.ALL_CATEGORIES,
        method: "GET"
      },
      categories => {
        Dispatcher.dispatch({
          actionType: ActionTypes.CATEGORIES_LOADED,
          payload: categories.data
        });
      }
    );
  }

  categoryChanged(categoryId) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CATEGORY_CHANGED,
      payload: categoryId
    });
  }
}

export default new CategoriesActions();
