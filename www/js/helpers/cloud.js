/**
 * Helper function to allow access to the $fh.cloud Client API function from anywhere in the app.
 */

App.helpers.cloud = function(cloudEndpoint, userInput, successCb, errCb){

  /**
   * Sending a POST request to the cloudEndpoint.
   *
   * In this case, the cloudEndpoint is "hello", but any cloud endpoint you have exposed can be accessed
   * using the $fh.cloud.
   *
   * @type {{path: string, method: string, contentType: string, data: {userInput: *}, timeout: number}}
   */
  var params = {
    path: cloudEndpoint,
    method: "GET",
    contentType: "application/json",
    data: {hello: userInput},
    timeout: 15000
  };

  $fh.cloud(params, successCb, errCb);
}