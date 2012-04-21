(function() {
  var $message;

  $message = $("#message");

  this.message = function(msg, cont) {
    if (cont == null) cont = false;
    $message.html(msg);
    if (cont) {
      return $message.append("<div id=\"continue\">\n  " + cont + " is typing... <img src=\"./images/buttons/continue.gif\" alt=\"continue\"/>\n</div>");
    }
  };

  $(function() {
    return message("hello world!", "GG");
  });

}).call(this);
