(function() {
  var $content, $document, $message, assembly, beginPlaying, colorize, control, corridor, debug, doorOutside, enterName, find, game, goOutside, hide, hideMessage, introYourRoom, kitchen, message, outsideFakeSun, outsideNight, play1, play2, preloadImage, scene1, show, state, swap, toLoad, turnOnLights,
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
    return find(id).addClass('hidden').off('click');
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
    message("* LL began instant messaging you!\nLL: Hello, Steve.\nLL: I just had another revelation.\nGQ: hahaha dude\nGQ: i knew it\nGQ: you have these like every other day\nGQ: every day*\nGQ: ok sorry what is it go on", "LL is typing...");
    return $document.one('messageend', function() {
      $scene.find('.gghouse').removeClass('hidden');
      message("LL: I think we're in a game.\nGQ: O_O\nLL: No, let me talk.\nLL: So, I've been wondering.\nLL: Our lives really aren't that different from a video game character.\nLL: We level up, we have arbitrary stat attributes, and all that.\nLL: We even have NPCs.", "LL is typing...");
      return $document.one('messageend', function() {
        $scene.find('.tinyworld').removeClass('hidden');
        message("LL: And our world is called Ludum.\nLL: I don't know, it seems painfully obvious to me now.\nLL: So I did some more sleuthing.\nLL: By which I mean I entered some calculations.", "LL is typing...");
        return $document.one('messageend', function() {
          $scene.find('.stars').removeClass('hidden');
          message("LL: And apparently the world isn't so large.\nLL: But then I remembered that by any measurement of the observable universe, our world is tiny.", "LL is typing...");
          return $document.one('messageend', function() {
            $scene.find('.monster').removeClass('hidden');
            message("LL: And then I started wondering...\nLL: What lies beyond?\nLL: What lies sleeping?", "LL is typing...");
            return $document.one('messageend', function() {
              $scene.find('.monsterworld').removeClass('hidden');
              message("LL: We are so small.", "GQ is typing...");
              return $document.one('messageend', function() {
                $scene.find('.ggcomp').appendTo($scene);
                message("GQ: uh\nGQ: pretty melodramatic there bro!!\nLL: Okay, well, I guess it's not surprising that you'd act this way.\nLL: But, speaking as your younger brother by blood, you should really quit it.\nLL: And this isn't one of those times where the next day I realize you were absolutely correct.\nLL: Anyway, I have to go fix my dimensional warper. It should be done very soon.\nLL: Be in my room in two minutes.\n* LL signed off.\nGQ: wait what\n* LL is no longer online!");
                return $document.one('messageend', play2);
              });
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
    $scene.find('.tinyworld').remove();
    $scene.find('.monster').remove();
    $scene.find('.monsterworld').remove();
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
        return message("Bluhhh. Turn off the lights first.");
      } else {
        hide('scene1');
        return corridor();
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

  corridor = function() {
    var $scene;
    $scene = show('scene2');
    if (!state.visitedCorridor) {
      state.visitedCorridor = true;
      message("This is the only hallway in your house.\n\nYour bro's room is to the west, your mom's room is to the east, and the main room is dead ahead.\n\nWhere do you go? Pleasenotyourmom'sroom pleasenotyourmom'sroom.");
    }
    $scene.off('click');
    $scene.on('click', '.south', function() {
      hide('scene2');
      return beginPlaying();
    });
    $scene.on('click', '.east', function() {
      return message("You, uh... would really rather not. Your mother loves her games.");
    });
    $scene.on('click', '.west', function() {
      return message("Your bro's door is locked! You need to flip a switch somewhere.\n\nHow does your mother stay so consistent with her games?");
    });
    return $scene.on('click', '.north', function() {
      hide('scene2');
      return kitchen();
    });
  };

  kitchen = function() {
    var $scene;
    $scene = show('kitchen');
    if (!state.visitedKitchen) {
      state.visitedKitchen = true;
      message("This is your main room, which is also the kitchen. Your mother doesn't seem to be here. She seems to be away more often.");
    }
    $scene.on('click', '.east', function() {
      hide('kitchen');
      return doorOutside();
    });
    $scene.on('click', '.west', function() {
      hide('kitchen');
      return assembly();
    });
    $scene.on('click', '.south', function() {
      hide('kitchen');
      return corridor();
    });
    $scene.on('click', '.sink', function() {
      if (state.kind === "stairs") {
        message("You put the stairs in front of the sink.");
        state.sinkHasStairs = true;
        return state.kind = null;
      } else if (state.sinkHasStairs) {
        if (state.kind != null) {
          return message("You may be insanely handsome, but you don't have the upper strength to carry two things.");
        } else {
          message("You take the steppy-up-and-down-thing.");
          state.sinkHasStairs = false;
          return state.kind = "stairs";
        }
      } else {
        return message("This is where you wash your own dishes. You're not really sure where the water comes from.");
      }
    });
    $scene.on('click', '.hammer', function() {
      return swap.call(this, "hammer");
    });
    $scene.on('click', '.gun', function() {
      return swap.call(this, "gun");
    });
    $scene.on('click', '.butcher', function() {
      return swap.call(this, "butcher");
    });
    return $scene.on('click', '.u', function() {
      return message("You are TOO handsome! Hehehehe.");
    });
  };

  swap = function(kind) {
    if (state.sinkHasStairs && state.kind === kind) {
      message("You put back the " + kind + " like a nice boy.");
      state.kind = null;
      return $(this).css('opacity', 1);
    } else if (state.sinkHasStairs && ([null, "butcher", "gun", "hammer"].indexOf(state.kind) >= 0)) {
      state.kind = kind;
      find('kitchen').find('.butcher, .gun, .hammer').css('opacity', 1);
      $(this).css('opacity', .2);
      switch (kind) {
        case "hammer":
          return message("You take the hammer. Iiiiiiiiittt's not a dumb meme time.");
        case "gun":
          return message("You take the gun and testosterone rips through you. You briefly entertain a name change to Sylvester Stallone.");
        case "butcher":
          return message("You used to help your mother with cooking, back when she was pregnant with your bro. Unfortunately you slipped and fell while holding the knife, and the sharp edge sliced your mother in the eye.");
      }
    } else if (!state.sinkHasStairs) {
      return message("You're too short to reach. You may be incredibly handsome, but you are still short.");
    }
  };

  doorOutside = function() {
    var $scene;
    $scene = show('dooroutside');
    if (!state.visitedDoorOutside) {
      state.visitedDoorOutside = true;
      message("Buuuhhh!!! You used to escape through this window (now cloaked behind a barricade of wooden planks). The window is the only un-switch-able escape hatch, and it seems your mother is intent on preventing you from ever using it again.");
    }
    $scene.on('click', '.south', function() {
      hide('dooroutside');
      return kitchen();
    });
    $scene.on('click', '.planks', function() {
      if (state.priedPlanks) {
        hide('dooroutside');
        return goOutside();
      } else if (!(state.kind != null)) {
        return message("You need to find something to unscrew these planks.");
      } else {
        switch (state.kind) {
          case "stairs":
            return message("You slam the stairs against the planks. The stairs get a little bent.");
          case "butcher":
            return message("You attack the planks with the butcher knife and look like an idiot in doing so.");
          case "gun":
            return message("You shoot the planks. Or, you would have if the gun wasn't empty of bullets.");
          case "hammer":
            message("You pry the planks out of their foundation. Light filters through the now-open window!");
            return state.priedPlanks = true;
        }
      }
    });
    return $scene.on('click', '.door', function() {
      return message("Locked. There's nothing interesting outside, anyway.");
    });
  };

  assembly = function() {
    var $scene;
    $scene = show('assembly');
    if (!state.visitedAssembly) {
      state.visitedAssembly = true;
      message("Welcome to objectively the worst room in the house. You don't doubt the existence of heaven, because there's got to be one to counteract the neverending drama that ensues only because this switch assembly line exists.\n\nIt's a bit depressing to see how many switches your mother is making with the explicit purpose of making your life a miserable hell.");
    }
    $scene.on('click', '.south', function() {
      hide('assembly');
      return kitchen();
    });
    $scene.on('click', '.momswitch', function() {
      switch (state.kind) {
        case "hammer":
          return message("You slam the hammer as hard as possible on the switch. Nothing happens.");
        case "sickle":
          return message("You try to pry the switch off the wall. The switch stays solidly against the wall.");
        case "gun":
          return message("The gun chamber is empty. You stand there with your gun raised, trying to look macho like Stallone.");
        case "butcher":
          return message("You hack at the switch. It wasn't very effective...");
        default:
          return message("This is the emergency switch your mother installed in case there ever was a time we needed her. Except you could never figure out how to press it. You needed to five years ago, but that's a story you'd rather not tell.");
      }
    });
    $scene.on('click', '.assemblyswitch', function() {
      var modifier;
      if (state.kind === 'gun') {
        return message("You flip the switch. There is a shuddering boom.\n\nSo young, and the gates of hell have already opened for you.");
      } else {
        modifier = (state.kind != null) && state.kind !== "stairs" ? " with your " + state.kind : "";
        return message("You can't reach the switch" + modifier + "! Why would you ever want to flip the assembly line switch back on anyway???");
      }
    });
    return $scene.on('click', '.stairs', function() {
      if (state.tookStairs) {
        if (state.kind === "stairs") {
          message("You put back the stairs.");
          $scene.find('.putbackstairs').removeClass('hidden');
          $(this).css('opacity', 1);
          state.tookStairs = false;
          return state.kind = null;
        } else if (state.kind != null) {
          return message("A " + state.kind + " is not stairs.");
        } else {
          return message("You have no stairs to put back. Although your bro can be a little walkover sometimes...");
        }
      } else {
        if (state.kind) {
          return message("You are already carrying something! Come on, get with the physics here.");
        } else {
          message("You take the stairs. They're hollow inside like your mother's heart, and dark like hers too.");
          state.tookStairs = true;
          state.kind = "stairs";
          return $(this).css('opacity', .2);
        }
      }
    });
  };

  goOutside = function() {
    var $scene;
    $scene = show('outsideday');
    $scene.on('click', '.west', function() {
      hide('outsideday');
      return doorOutside();
    });
    $scene.on('click', '.south', function() {
      hide('outsideday');
      return outsideNight();
    });
    $scene.on('click', '.u', function() {
      return message("Rawr ;-)");
    });
    return $scene.on('click', '.sky', function() {
      return message("It's too bright to see the stars. You really like stars. They make you feel so small, and yet, paradoxically, they make you feel like you can do anything.");
    });
  };

  outsideNight = function() {
    var $scene;
    $scene = show('outsidenight');
    $scene.on('click', '.north', function() {
      hide('outsidenight');
      return goOutside();
    });
    $scene.on('click', '.you', function() {
      return message("You love this spot. You try to escape here once every few hours. There's just something so peaceful about the stars.");
    });
    $scene.on('click', '.generator', function() {
      return message("It's too dark to see, but this is where the generator for the switch assembly line is.");
    });
    return $scene.on('click', '.stars', function() {
      return message("You think you can make out Godelius Quantide and Leland L., the constellations you and your bro based your internet handles after.");
    });
  };

  outsideFakeSun = function() {
    var $scene;
    $scene = show('outsidefakesun');
    $scene.on('click', '.north', function() {
      hide('outsidefakesun');
      return goOutside();
    });
    $scene.on('click', '.sky', function() {
      return message("The generator's artificial sun emits such a bright light that you can't see the stars.");
    });
    $scene.on('click', '.generator', function() {
      return message("The generator. It's a monstrous monster of a machine that powers the switch assembly line. Oh man, you are totally going to hell for turning it on.");
    });
    return $scene.on('click', '.switch', function() {
      $(this).toggleClass('on');
      if (!state.sawDetailedSwitch) {
        message("You flip the switch.\n\nWait. What's this poking out below the switch?\n\n...\n\nOkay, whoa. You've simply got to tell your bro about this.");
        return $document.one('messageend', function() {
          $scene.find('.switchdetail').removeClass('hidden');
          message("* You began instant messaging LL!\nGQ: ok, wow\nGQ: can you believe this\nGQ: mom wired a switch through the fuckin planet out onto the other side\nGQ: this is mad dedication right here ok\nGQ: i think im forced to admit that this is some impressive shenanigans right here\nGQ: are you there\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\nGQ: alskd;jklsda;jlkf\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\nGQ: ffffffffffffff\n* LL is offline and did not receive your message!\n* You ceased instant messaging LL!");
          state.outsideSwitchOn = true;
          state.sawDetailedSwitch = true;
          return $document.one('messageend', function() {
            return $scene.find('.switchdetail').addClass('hidden');
          });
        });
      } else {
        message("You flip the switch.\n\nYou hear a second *click*.");
        return state.outsideSwitchOn = !state.outsideSwitchOn;
      }
    });
  };

  game = outsideFakeSun;

  $(function() {
    preloadImage('images/assembly.gif');
    preloadImage('images/corridor.gif');
    preloadImage('images/dooroutside.gif');
    preloadImage('images/earth.gif');
    preloadImage('images/ggcomp.gif');
    preloadImage('images/gghouse.gif');
    preloadImage('images/kitchen.gif');
    preloadImage('images/llim.gif');
    preloadImage('images/meteor.gif');
    preloadImage('images/monster.gif');
    preloadImage('images/monsterworld.gif');
    preloadImage('images/scene1.gif');
    preloadImage('images/stars.gif');
    preloadImage('images/stairs.gif');
    preloadImage('images/tentacles.gif');
    preloadImage('images/tinyworld.gif');
    preloadImage('images/tinyworldwhole.gif');
    preloadImage('images/u.gif');
    preloadImage('images/underside.gif');
    preloadImage('images/usmall.gif');
    preloadImage('images/you.gif');
    preloadImage('images/yourroom.gif');
    preloadImage('images/yourroombright.gif');
    preloadImage('images/buttons/continue.gif');
    preloadImage('images/buttons/south.gif');
    preloadImage('images/buttons/north.gif');
    preloadImage('images/buttons/east.gif');
    preloadImage('images/buttons/west.gif');
    preloadImage('images/buttons/switchdown.gif');
    preloadImage('images/buttons/switchup.gif');
    preloadImage('images/buttons/switchon90deg.gif');
    return preloadImage('images/buttons/switchoff90deg.gif');
  });

}).call(this);
