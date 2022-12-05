import Store from "./store";
import Dispatcher from "../dispatcher";
import ActionTypes from "../constants/actions";

let categories = [];

let selectedCategory = null;

class CategoriesStore extends Store {
  constructor() {
    super();

    Dispatcher.register(this.registerActions.bind(this));
  }

  registerActions(action) {
    switch (action.actionType) {
      case ActionTypes.CATEGORIES_LOADED:
        categories = action.payload;
        this.emit(this.CHANGE);
        break;
      case ActionTypes.CATEGORY_CHANGED:
        selectedCategory = action.payload;
        this.emit(this.CHANGE);
        break;
      default:
        break;
    }
  }

  getStore() {
    return {
      categories: categories,
      selectedCategory: selectedCategory
    };
  }
}

export default new CategoriesStore();
