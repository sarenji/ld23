(function() {
  var $message;

  $message = $("#message");

  this.message = function(msg) {
    return $message.html(msg);
  };

  $(function() {
    return message("hello world!");
  });

}).call(this);
