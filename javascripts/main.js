(function() {
  var $document, $message, colorize, find, hideMessage, message, scene1, scene2, show;

  $document = $(document);

  $message = $("#message");

  show = function(id) {
    return find(id).removeClass('hidden');
  };

  find = function(id) {
    return $("#" + id);
  };

  colorize = function(message) {
    var i, messages, msg, _len;
    messages = message.split('\n');
    for (i = 0, _len = messages.length; i < _len; i++) {
      msg = messages[i];
      msg = msg.replace(/^(LL: .*)/, '<span class="ll">$1</span>');
      msg = msg.replace(/^(GQ: .*)/, '<span class="gq">$1</span>');
      messages[i] = msg;
    }
    return messages.join('\n');
  };

  message = function(msg, cont) {
    if (cont == null) cont = "";
    $message.removeClass('hidden');
    msg = colorize(msg);
    $message.empty().html(msg.replace(/\n/g, '<br>'));
    $message.append("<div id=\"continue\">\n  " + cont + "\n  <img src=\"./images/buttons/continue.gif\" alt=\"continue\"/>\n</div>");
    $message.scrollTop(0);
    return message.up = true;
  };

  hideMessage = function() {
    if (message.up) {
      $("#message").addClass('hidden');
      message.up = false;
      return $document.trigger('messageend');
    }
  };

  hideMessage();

  $(document).keyup(function(e) {
    if (message.up && e.which === 13 || e.which === 90) return hideMessage();
  });

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
        show('scene1');
        return setTimeout(scene1, 0);
      });
    };
  });

  scene1 = function() {
    var $scene;
    $scene = find('scene1');
    message("* LL began instant-messaging you!\nLL: Hello, Steve.\nLL: I just had another revelation.\nGQ: hahaha dude\nGQ: are you serious\nGQ: you have these like every other day\nGQ: every day*\nGQ: ok sorry what is it go on", "LL is typing...");
    return $document.one('messageend', function() {
      $scene.find('.gghouse').removeClass('hidden');
      message("LL: I think we're in a game.\nGQ: O_O\nLL: Let me talk.\nLL: So, I've been wondering.\nLL: Our lives really aren't that different from a video game character.\nLL: We level up, we have arbitrary stat attributes, and all that.\nLL: We even have NPCs.", "LL is typing...");
      return $document.one('messageend', function() {
        message("LL: And our world is called Ludum.\nLL: I don't know, it seems painfully obvious to me now.\nLL: So I did some more sleuthing.\nLL: By which I mean I entered some calculations.", "LL is typing...");
        return $document.one('messageend', function() {
          $scene.find('.stars').removeClass('hidden');
          message("LL: And apparently the world isn't so large.\nLL: But then I remembered that by any measurement of the observable universe, our world is tiny.", "LL is typing...");
          return $document.one('messageend', function() {
            $scene.find('.tentacles').removeClass('hidden');
            message("LL: And then I started wondering...\nLL: What lies beyond?\nLL: What lies sleeping?", "GQ is typing...");
            return $document.one('messageend', function() {
              $scene.find('.ggcomp').appendTo($scene);
              return message("GQ: uh\nGQ: pretty melodramatic there bro!!\nLL: Okay, well, I guess it's not surprising that you'd act this way.\nLL: But, speaking as your friend, I know you're freaked out.\nLL: My work here is done.");
            });
          });
        });
      });
    });
  };

  scene2 = function() {};

  $(function() {
    return scene1();
  });

}).call(this);
