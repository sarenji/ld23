(function() {
  var $message, message, show;

  $message = $("#message");

  show = function(id) {
    return $("#" + id).removeClass('hidden');
  };

  message = function(msg, cont) {
    if (cont == null) cont = false;
    $message.removeClass('hidden');
    $message.html(msg);
    if (cont) {
      return $message.append("<div id=\"continue\">\n  " + cont + " <img src=\"./images/buttons/continue.gif\" alt=\"continue\"/>\n</div>");
    }
  };

  $(function() {
    var $nameInsert, enteredName;
    $nameInsert = $('#nameinsert');
    $nameInsert.show();
    $('#newname').focus();
    $nameInsert.find('input').on('keyup', function(e) {
      if (e.which === 13) return enteredName();
    });
    $nameInsert.on('click', '.ok', function() {
      return enteredName();
    });
    return enteredName = function() {
      var newName;
      newName = $('#newname').val();
      if (newName === "Googlohurf Harpstuck") {
        alert("Oh, come on! That's a horrible name.");
        $('#newname').focus();
        return;
      }
      $nameInsert.find('.first').remove();
      return $nameInsert.find('.second').show().on('click', '.ok', function() {
        $nameInsert.remove();
        return show('scene1');
      });
    };
  });

}).call(this);
