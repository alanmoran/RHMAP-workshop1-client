/**
 * A Backbone View to handle accepting the user input and calling the "cloud" helper function to send the characters
 * to the cloud.
 * @type {*}
 */

App.View.HelloView = Backbone.View.extend({
  el: "#count",
  events: {
    "click button.count-characters": "sayHello"
  },
  initialize: function(){
    _.bindAll(this, "sayHello", "success", "error");
  },
  /**
   * Success function when the $fh.cloud call has completed successfully.
   *
   * @param response: JSON Object -> {strLength: <<Length of the string entered.>>}
   */
  success: function(response){
    var self = this;

    console.log(response);

    var message = response.msg;

    if(message){
      self.$el.find('.hello-result').html(message);
    }
  },
  /**
   * A function to handle an error caused by the $fh.cloud API.
   *
   * @param message: String -> Error message passed back by the cloud "count" endpoint.
   * @param error:  JSON Object ->
   */
  error: function(message, error){
    var self = this;
    var helloResultEl = self.$el.find('.hello-result');

    helloResultEl.html("An Error Occurred When Calling $fh.cloud: " + message + " " + JSON.stringify(error));
    helloResultEl.addClass('text-danger');
  },
  sayHello: function(){
    var self = this;

    var helloResultEl = self.$el.find('.hello-result');

    //Finding the input text.
    var input = self.$el.find("input[type='text']");

    var characters = input.val();

    helloResultEl.html("Calling Cloud Endpoint");
    helloResultEl.removeClass("hidden");

    if(characters){
      //Calling the "cloud" helper function to call the $fh.cloud endpoint.
      App.helpers.cloud("hello", characters, self.success, self.error);
    }
  }
});


/**
 * Listening for the `fhinit` event triggered by the Feedhenry Javascript SDK before initialising the `Count` View.
 *
 * This event must have been triggered before using the $fh Client API functions.
 */
$fh.on('fhinit', function(){
  App.views.hello = new App.View.HelloView();
});

