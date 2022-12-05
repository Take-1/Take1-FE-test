/* global jest describe beforeEach test mount expect*/
import React from "react";

import APIEndPoints from "./constants/apiEndPoints";
import Categories from "./categories";
jest.mock("./utils");

// Shows all the available category names in one row (can wrap into multiple lines if screen is not wide enough)
describe("Categories", () => {
  const MOCK_FETCH_DATA = [
    {
      endPoint: APIEndPoints.ALL_CATEGORIES,
      response: {
        data: [{ id: "1", title: "One" }, { id: "2", title: "Two" }]
      }
    }
  ];

  beforeEach(() => {
    require("./utils").setMockFetchData(MOCK_FETCH_DATA);
  });

  test("Assert list of categories displayed in a row", () => {
    // ..
  });
});
