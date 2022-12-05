/* global jest describe beforeEach test mount expect*/
import React from "react";

import APIEndPoints from "./constants/apiEndPoints";
import App from "./app";
jest.mock("./utils");

const MOCK_FETCH_DATA = [
  {
    endPoint: APIEndPoints.ALL_CATEGORIES,
    response: {
      data: [
        { id: "1", title: "CategoryOne" },
        { id: "2", title: "CategoryTwo" }
      ]
    }
  },
  {
    endPoint: APIEndPoints.ALL_PRODUCTS,
    response: {
      data: [
        { id: "1", title: "ProductOne", categories: [{ id: "1" }] },
        { id: "2", title: "ProductTwo", categories: [{ id: "2" }] }
      ]
    }
  }
];

describe("Back and forward button selects correct category", () => {
  beforeEach(() => {
    require("./utils").setMockFetchData(MOCK_FETCH_DATA);
  });

  function clickFirstCategory(app) {
    app
      .find("Categories")
      .find("a")
      .filterWhere(a => {
        return a.text() === "CategoryOne";
      })
      .simulate("click");
  }

  function clickSecondCategory(app) {
    app
      .find("Categories")
      .find("a")
      .filterWhere(a => {
        return a.text() === "CategoryTwo";
      })
      .simulate("click");
  }

  function immitateBackForwardButton(app, hashData) {
    // Set category id into url immitating back button pressed
    require("./utils").setMockGetParameterFromHashData(hashData);
    app
      .find("Categories")
      .instance()
      .onHashChange();
    // Important to call update for this simulation to cause a rerender
    app.update();
  }

  test("Given a category is selected, its products are displayed", () => {
    const app = mount(<App />);

    expect(app.find("Products").find("Product").length).toBe(2);

    clickFirstCategory(app);

    expect(app.find("Products").find("Product").length).toBe(1);

    expect(
      app
        .find("Products")
        .find("Product")
        .props().product.title
    ).toBe("ProductOne");
  });

  test("Given a different category is now selected, its products are displayed", () => {
    const app = mount(<App />);

    // ...
  });

  test("Given back button pressed, the previous category should now be selected", () => {
    const app = mount(<App />);

    // ..
  });

  test("Given forward button pressed, the 'previous' category should now be selected", () => {
    const app = mount(<App />);

    // ..
  });
});

describe("Input field should be placed above the list of products and below the categories", () => {
  beforeEach(() => {
    require("./utils").setMockFetchData(MOCK_FETCH_DATA);
  });

  test("Assert input field above products and below categories", () => {
    const app = mount(<App />);

    expect(
      app
        .find("div")
        .at(0)
        .find("ul")
        .at(0)
        .props().className
    ).toBe("categoryList");

    let secondDiv = app
      .find("div")
      .at(1)
      .find("div")
      .at(0);

    // ..
  });
});
