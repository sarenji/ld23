(function() {
  var $content, $document, $message, beginPlaying, colorize, control, debug, enterName, find, game, hide, hideMessage, introYourRoom, message, play1, play2, preloadImage, scene1, scene2, show, state, toLoad, turnOnLights,
    __slice = Array.prototype.slice;

  $document = $(document);

  $message = $("#message");

  $content = $("#content");

  toLoad = 0;

  preloadImage = function(path) {
    var image;
    toLoad++;
    image = new Image();
    $(image).load(function() {
      toLoad -= 1;
      if (toLoad === 0) return game();
    });
    return image.src = path;
  };

  state = {
    yourDoorLocked: true
  };

  show = function(id) {
    return find(id).removeClass('hidden');
  };

  hide = function(id) {
    return find(id).addClass('hidden');
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
    message("You and him both know it'll take you way longer than two minutes. Getting around this house is impossible! But you have to try. Your brother might be annoying slash amusing slash cute with his \"revelations,\" but he always makes cool stuff.");
    return $document.one('messageend', function() {
      message("Your mother is extremely private, so she installed switches everywhere to deter anyone from stealing her things (or her kids). She is especially protective of your little brother and never lets him unlock his own door.\n\nYou can't remember the exact sequences to the switches, because she changes them every night, somehow without you noticing. And some switches depend on another switch being pressed.\n\nYou have no idea how she keeps track of all these switches in her head. It would be so impressive if it wasn't SO INFURIATING.\n\nBut first, why don't you turn on the lights?");
      return $document.one('messageend', function() {
        return beginPlaying();
      });
    });
  };

  beginPlaying = function() {
    var $scene;
    $scene = show('scene1');
    $scene.off('click');
    $scene.find('.doorswitch').removeClass('hidden');
    $scene.find('.lightswitch').removeClass('hidden');
    $scene.find('.door').removeClass('hidden');
    $scene.on('click', '.door', function() {
      if (state.yourDoorLocked) {
        return message("The door is locked from the outside!");
      } else if (state.flippedLight) {
        return message("Ugh. Please turn off the lights first.");
      } else {
        $scene.off('click');
        return scene2();
      }
    });
    $scene.on('click', '.doorswitch', function() {
      if (state.flippedLight) {
        message("You hear a *click*.");
        state.yourDoorLocked = !state.yourDoorLocked;
        if (state.yourDoorLocked) {
          return $(this).removeClass('on');
        } else {
          return $(this).addClass('on');
        }
      } else {
        return message("The switch won't budge! It must depend on another switch...");
      }
    });
    return $scene.on('click', '.lightswitch', function() {
      var $switch;
      $switch = $(this);
      if (state.flippedLight) {
        message("You turn off the lights.\n\nYou hear a second *click*.");
        state.flippedLight = false;
        return $scene.find('.yourroom').removeClass('bright');
      } else if (!(state.flippedLight != null)) {
        message("You inspect the crack. It's been here as long as you remember, and it still looks ominous. Sometimes, you even think it looks like an egg about to wake from a long sleep. But you won't let your bro's \"revelations\" get to you.");
        return $document.one('messageend', function() {
          var $choices;
          $choices = $scene.find('.choices');
          $choices.removeClass('hidden');
          $scene.on('click.choices', '.ok', function() {
            $choices.remove();
            turnOnLights();
            return $scene.off('click.choices');
          });
          return $scene.on('click.choices', '.no', function() {
            $choices.addClass('hidden');
            return $scene.off('click.choices');
          });
        });
      } else {
        return turnOnLights();
      }
    });
  };

  turnOnLights = function() {
    var $scene;
    message("You turn on the lights.\n\nYou hear a second *click*.");
    state.flippedLight = true;
    $scene = find('scene1');
    return $scene.find('.yourroom').addClass('bright');
  };

  scene2 = function() {
    var $scene;
    $scene = show('scene2');
    if (!state.visitedCorridor) {
      state.visitedCorridor = true;
      message("Your bro's room is on the left, your mom's room is on the right, and the main room is dead ahead.\n\nWhere do you go? Pleasenotyourmom'sroom pleasenotyourmom'sroom.");
    }
    $scene.off('click');
    return $scene.on('click', '.south', function() {
      hide('scene2');
      return beginPlaying();
    });
  };

  $(function() {
    preloadImage('images/corridor.gif');
    preloadImage('images/earth.gif');
    preloadImage('images/ggcomp.gif');
    preloadImage('images/gghouse.gif');
    preloadImage('images/llim.gif');
    preloadImage('images/meteor.gif');
    preloadImage('images/scene1.gif');
    preloadImage('images/stars.gif');
    preloadImage('images/switchdown.gif');
    preloadImage('images/switchup.gif');
    preloadImage('images/tentacles.gif');
    preloadImage('images/you.gif');
    preloadImage('images/tinyworld.gif');
    preloadImage('images/yourroom.gif');
    preloadImage('images/yourroombright.gif');
    preloadImage('images/buttons/south.gif');
    preloadImage('images/buttons/north.gif');
    preloadImage('images/buttons/east.gif');
    preloadImage('images/buttons/west.gif');
    return preloadImage('images/buttons/continue.gif');
  });

  game = scene2;

}).call(this);
