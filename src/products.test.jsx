/* global jest describe beforeEach test mount expect*/
import React from "react";

import APIEndPoints from "./constants/apiEndPoints";
jest.mock("./utils");
import Products from "./products";

describe("Shows list of product titles under each other", () => {
  const MOCK_FETCH_DATA = [
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

  beforeEach(() => {
    require("./utils").setMockFetchData(MOCK_FETCH_DATA);
  });

  test("Assert all product titles displayed", () => {
    const products = mount(<Products />);
    // ..
  });
});
