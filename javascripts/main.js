(function() {
  var $content, $document, $message, colorize, control, debug, enterName, find, hideMessage, introYourRoom, message, play1, play2, scene1, scene2, show, state,
    __slice = Array.prototype.slice;

  $document = $(document);

  $message = $("#message");

  $content = $("#content");

  state = {
    yourDoorLocked: true
  };

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
    show("messagehitbox");
    return message.up = true;
  };

  control = function($this) {
    return control.person = $this;
  };

  control.target = {};

  debug = function() {
    var msg;
    msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (debug.on) return find('debug').html(msg.join('<br>'));
  };

  debug.on = true;

  hideMessage = function() {
    if (message.up) {
      $("#message").addClass('hidden');
      find('messagehitbox').addClass('hidden');
      message.up = false;
      return $document.trigger('messageend');
    }
  };

  hideMessage();

  $(document).keyup(function(e) {
    if (message.up && e.which === 13 || e.which === 90) return hideMessage();
  });

  $document.on('click', '#messagehitbox', function() {
    return hideMessage();
  });

  $content.on('mousedown', function(e) {
    var x, y;
    if (control.person != null) {
      x = e.pageX - this.offsetParent.offsetLeft;
      y = e.pageY - this.offsetParent.offsetTop;
      control.target = {
        x: x,
        y: y
      };
      return debug(x, y);
    }
  });

  enterName = function() {
    var $nameInsert, enteredName;
    $nameInsert = show('nameinsert');
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
      if (newName === "Googlohurf Hoodchuck") {
        alert("Oh, come on! That's a horrible name.");
        $('#newname').focus();
        return;
      }
      $nameInsert.find('.first').remove();
      return $nameInsert.find('.second').show().on('click', '.ok', function() {
        $nameInsert.remove();
        return introYourRoom();
      });
    };
  };

  play1 = function() {
    var $play;
    $play = show('play1');
    message("This is you! You're a pretty handsome dude :)");
    return $document.on('messageend', function() {
      return enterName();
    });
  };

  introYourRoom = function() {
    var $scene;
    $scene = show('scene1');
    message("This is your room. It's a bit dark right now, even if it means getting around is a little harder.");
    return $document.one('messageend', function() {
      $scene.find('.yourbroim').removeClass('hidden');
      message("Looks like your bro is instant messaging you! You have an inkling of what he's got to say, and you don't want to miss it.");
      return $document.one('messageend', function() {
        return $scene.find('.yourbroim').on('click', function() {
          $scene.find('.yourbroim').remove();
          return scene1();
        });
      });
    });
  };

  scene1 = function() {
    var $scene;
    $scene = show('scene1');
    $scene.find('.ggcomp').removeClass('hidden');
    message("* LL began instant messaging you!\nLL: Hello, Steve.\nLL: I just had another revelation.\nGQ: hahaha dude\nGQ: are you serious\nGQ: you have these like every other day\nGQ: every day*\nGQ: ok sorry what is it go on", "LL is typing...");
    return $document.one('messageend', function() {
      $scene.find('.gghouse').removeClass('hidden');
      message("LL: I think we're in a game.\nGQ: O_O\nLL: No, let me talk.\nLL: So, I've been wondering.\nLL: Our lives really aren't that different from a video game character.\nLL: We level up, we have arbitrary stat attributes, and all that.\nLL: We even have NPCs.", "LL is typing...");
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
              message("GQ: uh\nGQ: pretty melodramatic there bro!!\nLL: Okay, well, I guess it's not surprising that you'd act this way.\nLL: But, speaking as your younger brother by blood, you should really quit it.\nLL: And this isn't one of those times where the very next day I realize you were absolutely correct.\nLL: Anyway, I have to go fix my dimensional warper. It should be done very soon.\nLL: Be in my room in two minutes.\n* LL signed off.\nGQ: wait what\n* LL is no longer online!");
              return $document.one('messageend', play2);
            });
          });
        });
      });
    });
  };

  play2 = function() {
    var $scene;
    $scene = show('scene1');
    $scene.find('.ggcomp').remove();
    $scene.find('.gghouse').remove();
    $scene.find('.stars').remove();
    $scene.find('.tentacles').remove();
    message("Getting around this house is impossible! You know it'll take you way longer than two minutes. But you have to try. Your brother might be annoying slash amusing slash cute with his \"revelations,\" but he always makes cool stuff.");
    return $document.one('messageend', function() {
      message("Your mother is extremely private, so she installed switches everywhere to deter anyone from stealing her things (or her kids). She is especially protective of your little brother and never lets him unlock his own door.\n\nYou can't remember the exact sequences to the switches, because she changes them every night. Your mother somehow manages to change them without you noticing. And sometimes, some switches depend on another switch being pressed.\n\nYou have no idea how she keeps track of all these switches in her head. It would be impressive if it wasn't SO INFURIATING.");
      return $document.one('messageend', function() {
        $scene.find('.doorswitch').removeClass('hidden');
        $scene.find('.lightswitch').removeClass('hidden');
        $scene.find('.door').removeClass('hidden');
        $scene.find('.door').on('click', function() {
          if (state.yourDoorLocked) {
            return message("The door is locked!");
          } else {
            return scene2();
          }
        });
        $scene.find('.doorswitch').on('click', function() {
          if (state.flippedLight) {
            message("You hear a *click*.");
            return state.yourDoorLocked = false;
          } else {
            return message("The switch won't budge! It must depend on another switch...");
          }
        });
        return $scene.find('.lightswitch').on('click', function() {
          if (state.flippedLight) {
            message("You turn off the lights.\n\nYou also hear a *click*.");
            return state.flippedLight = false;
          } else {
            message("You turn on the lights. You also resist a light pun.\n\nYou also hear a *click*.");
            return state.flippedLight = true;
          }
        });
      });
    });
  };

  scene2 = function() {
    return message("Navigate!");
  };

  $(play2);

}).call(this);
