import "whatwg-fetch";

/*
  Contains 2 helper functions
 */
const Utils = {
  /*
    Get parameter from url hash value. Solution from the following link:
    https://stackoverflow.com/questions/11920697/how-to-get-hash-value-in-a-url-in-js
   */
  getParameterFromHash: key => {
    let matches = location.hash.match(new RegExp(key + "=([^&]*)"));
    return matches ? matches[1] : null;
  },
  /*
    Used to make API requests
   */
  fetch({ endPoint, method }, action) {
    fetch(endPoint, {
      method: method
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response error: " + endPoint);
      })
      .then(function(r) {
        action(r);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};

module.exports = Utils;
