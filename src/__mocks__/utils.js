/*
  Replaces the Utils object with a mock object during testing
  to allow us to mock the API request and also the URL hash
 */

let mockFetchData = [];
let mockGetParameterFromHashData = {};

function setMockFetchData(d) {
  mockFetchData = d;
}

function setMockGetParameterFromHashData(d) {
  mockGetParameterFromHashData = d;
}

const Utils = {
  getParameterFromHash: key => {
    return mockGetParameterFromHashData[key];
  },
  fetch({ endPoint }, action) {
    mockFetchData.map(obj => {
      if (obj.endPoint === endPoint) {
        action(obj.response);
        return false;
      }
      return null;
    });
  }
};

Utils.setMockFetchData = setMockFetchData;
Utils.setMockGetParameterFromHashData = setMockGetParameterFromHashData;

module.exports = Utils;
