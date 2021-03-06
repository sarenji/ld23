(function() {
  var $content, $document, $message, assembly, beginPlaying, broRoom, choice, colorize, control, corridor, debug, doorOutside, endGame, enterName, find, fireGunAtSwitch, game, goOutside, hide, hideMessage, introYourRoom, kitchen, message, outsideFakeSun, outsideNight, play1, play2, preloadImage, scene1, show, showCredits, state, swap, toLoad, turnOnLights,
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

  choice = function(text, okCallback, noCallback) {
    var $choices;
    show('choicewrapper');
    hide('choices');
    $choices = show('choices');
    $choices.find('.text').text(text);
    $choices.on('click', '.ok', function() {
      hide('choices');
      hide('choicewrapper');
      return okCallback();
    });
    return $choices.on('click', '.no', function() {
      hide('choices');
      hide('choicewrapper');
      return noCallback();
    });
  };

  colorize = function(message) {
    var i, messages, msg, _len;
    messages = message.split('\n');
    for (i = 0, _len = messages.length; i < _len; i++) {
      msg = messages[i];
      msg = msg.replace(/^(LL: .*)/, '<span class="ll">$1</span>');
      msg = msg.replace(/^(STEVE: .*)/, '<span class="gq">$1</span>');
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
    return $document.one('messageend', function() {
      return enterName();
    });
  };

  introYourRoom = function() {
    var $scene;
    $scene = show('scene1');
    $scene.on('click', '.doorswitch', function() {
      return message("This switch could be for the light. But your mom rewires the entire house every day, so it's just a guess.");
    });
    $scene.on('click', '.you', function() {
      return message("You wish you had a mirror right now.");
    });
    $scene.on('click', '.door', function() {
      return message("The door is locked from the outside!");
    });
    $scene.on('click', '.comp', function() {
      return message("Your internet handle is Godelius Quantide, or GQ, named after the first constellation you found with the TELESCOPE.\n\nNo one is online for you to instant message. You can always check later on your PHONE, which is in one of your pockets.");
    });
    message("This is your room. It's a bit dark right now, even if it means getting around is a little harder.");
    return $document.one('messageend', function() {
      $scene.find('.yourbroim').removeClass('hidden');
      message("Looks like your bro is instant messaging you! You have an inkling of what he's got to say, and you don't want to miss it.");
      return $document.one('messageend', function() {
        return $scene.find('.yourbroim').on('click', function() {
          $scene.find('.yourbroim').remove();
          hide('scene1');
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
      message("LL: I think we're in a game.\nGQ: O_O\nLL: No, let me talk.\nLL: So, I've been wondering.\nLL: Our lives really aren't that different from a video game character.\nLL: We level up, we have arbitrary stat attributes, and all that.\nLL: I'm even an NPC.", "LL is typing...");
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
                message("GQ: uh\nGQ: pretty melodramatic there bro!!\nLL: Okay, well, I guess it's not surprising that you'd act this way.\nLL: But, speaking as your younger brother by blood, you should really quit it.\nLL: And this isn't one of those times where the next day I realize you were absolutely correct.\nLL: Anyway, I have to go fix my dimensional warper. It should be done very soon.\nLL: Be in my room in two minutes.\n* LL signed off.\nGQ: wait what\n* LL is offline and did not receive your message!");
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
    message("You and him both know it'll take you way longer than two minutes. Getting around this house is impossible! But you have to try. Your bro might be annoying slash amusing slash cute with his \"revelations,\" but he always makes cool stuff.");
    return $document.one('messageend', function() {
      message("Your mother is extremely private, so she installed switches everywhere to deter anyone from stealing her things (or her kids). She is especially protective of your little bro and never lets him unlock his own door.\n\nYou can't remember the exact sequences to the switches, because she changes them every night, somehow without you noticing. And some switches depend on another switch being pressed.\n\nYou have no idea how she keeps track of all these switches in her head. It would be so impressive if it wasn't SO INFURIATING.\n\nBut first, why don't you turn on the lights?");
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
    $scene.on('click', '.comp', function() {
      return message("Your internet handle is Godelius Quantide, or GQ, named after the first constellation you found with the TELESCOPE.\n\nNo one is online for you to instant message. You can always check later on your PHONE, which is in one of your pockets.");
    });
    $scene.on('click', '.you', function() {
      return message("You are so unbearably cute! Tee hee!");
    });
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
      if (state.momRoomCount == null) state.momRoomCount = 0;
      switch (state.momRoomCount) {
        case 0:
          message("No.");
          break;
        case 1:
          message("Come on, no!");
          break;
        case 2:
          message("NO.");
          break;
        default:
          message("NO!!!!!!!!!!!!!!!!!!!!!!!");
      }
      return state.momRoomCount++;
    });
    $scene.on('click', '.west', function() {
      if (!state.outsideSwitchOn) {
        message("Your bro's door is locked! You need to flip a switch somewhere.");
        return $document.one('messageend', function() {
          return choice('Knock on his door?', function() {
            return message("There is no answer...");
          });
        });
      } else {
        hide('scene2');
        return broRoom();
      }
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
    $scene.on('click', '.fridge', function() {
      return message("Technically, this is your fridge. Practically, it's your bro's. He uses it to hibernate experimental killer robots at sub-zero temperatures. You really don't want to open the fridge.");
    });
    $scene.on('click', '.sink', function() {
      if (state.kind === "stairs") {
        return choice("Put STAIRS in front of the sink?", function() {
          $scene.find('.stairs').removeClass('hidden');
          state.sinkHasStairs = true;
          return state.kind = null;
        });
      } else if (state.sinkHasStairs) {
        if (state.kind != null) {
          return message("You may be insanely handsome, but you don't have the upper strength to carry two things.");
        } else {
          return choice("Take STAIRS?", function() {
            $scene.find('.stairs').addClass('hidden');
            state.sinkHasStairs = false;
            return state.kind = "stairs";
          });
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
      return swap.call(this, "butcher knife");
    });
    return $scene.on('click', '.u', function() {
      return message("You are TOO handsome! Hehehehe.");
    });
  };

  swap = function(kind) {
    var $kind, msg;
    $kind = $(this);
    if (state.sinkHasStairs && state.kind === kind) {
      message("You put back the " + kind + " like a nice boy.");
      state.kind = null;
      return $kind.css('opacity', 1);
    } else if (state.sinkHasStairs && ([null, "butcher knife", "gun", "hammer"].indexOf(state.kind) >= 0)) {
      msg = "Take the " + (kind.toUpperCase()) + "?";
      if (state.kind != null) {
        msg = "Switch your " + (state.kind.toUpperCase()) + " with the " + (kind.toUpperCase()) + "?";
      }
      return choice(msg, function() {
        state.kind = kind;
        find('kitchen').find('.butcher, .gun, .hammer').css('opacity', 1);
        $kind.css('opacity', .2);
        switch (kind) {
          case "hammer":
            return message("You take the HAMMER. Iiiiiiiiittt's not a dumb meme time.");
          case "gun":
            return message("You take the UNLOADED GUN and testosterone rips through you. You briefly entertain a name change to Sylvester Stallone.");
          case "butcher knife":
            return message("You used to help your mother with cooking, while she was pregnant with your bro. You slipped and fell while holding the knife and there was too much blood and... Well, now your mother has one eye.");
        }
      });
    } else if (!state.sinkHasStairs) {
      return message("You're too short to reach this " + (kind.toUpperCase()) + ". You may be incredibly handsome, but you are still short.");
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
      var $planks;
      $planks = $(this);
      if (state.priedPlanks) {
        hide('dooroutside');
        return goOutside();
      } else if (!(state.kind != null)) {
        return message("You need to find something to unscrew these planks.");
      } else {
        switch (state.kind) {
          case "stairs":
            return message("You slam the stairs against the planks. The stairs get a little bent.");
          case "butcher knife":
            return message("You attack the planks with the butcher knife and look like an idiot in doing so.");
          case "gun":
            return message("You shoot the planks. Or, you would have if the gun were loaded.");
          case "hammer":
            message("You pry the planks out of their foundation. You can see the grass past the open window!");
            $planks.css('opacity', 0);
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
      if (state.telescope) {
        message("You don't want anything to do with this switch anymore.");
        return;
      }
      switch (state.kind) {
        case "hammer":
          return message("You slam the hammer as hard as possible on the switch. Nothing happens.");
        case "scythe":
          return message("You try to pry the switch off the wall. The switch stays solidly against the wall.");
        case "gun":
          if (state.hasBullet) {
            return choice("Load the GUN with the BULLET and shoot the switch?", function() {
              hide('assembly');
              return fireGunAtSwitch();
            });
          } else {
            return message("The gun chamber is empty. You stand there with your gun raised, trying to look macho like Stallone.");
          }
          break;
        case "butcher knife":
          return message("You hack at the switch. It wasn't very effective...");
        default:
          return message("This is the emergency switch your mother installed in case there ever was a time we needed her. Except nothing you try can ever move the switch. Maybe if you had a high-impact weapon...");
      }
    });
    $scene.on('click', '.assemblyswitch', function() {
      var $switch, modifier;
      $switch = $(this);
      if (state.assemblySwitchOn) {
        if (state.kind === 'scythe') {
          if (state.tookStairs) {
            return message("You can't reach the switch with your SCYTHE!");
          } else {
            return choice("Use the SCYTHE to pull down the switch?", function() {
              message("You use the scythe to flip the switch off! Thank Godelius.");
              state.assemblySwitchOn = false;
              return $switch.removeClass('on');
            });
          }
        } else {
          return message("Bluuhhhh. You have no idea how to turn it back off. You need something to reach around the switch and pull it down.");
        }
      } else if (state.telescope) {
        return message("You are never flipping this switch on again.");
      } else if (state.kind === 'scythe') {
        return choice('Do you actually want to flip this switch with the SCYTHE?', function() {
          message("You flip the switch without drama.");
          state.assemblySwitchOn = true;
          return $switch.addClass('on');
        });
      } else if (state.kind === 'gun') {
        return choice("Do you ACTUALLY want to poke the switch up with the GUN? You don't even know how you're turning the switch back off!", function() {
          message("You flip the switch. There is a shuddering boom.\n\nSo young, and the gates of hell have already opened for you.");
          state.assemblySwitchOn = true;
          return $switch.addClass('on');
        });
      } else {
        modifier = (state.kind != null) && state.kind !== "stairs" ? " with your " + (state.kind.toUpperCase()) : "";
        return message("You can't reach the switch" + modifier + ". Why would you ever want to flip the assembly line switch back on anyway???");
      }
    });
    return $scene.on('click', '.stairs', function() {
      var $stairs;
      $stairs = $(this);
      if (state.tookStairs) {
        if (state.kind === "stairs") {
          message("You put back the STAIRS.");
          $scene.find('.putbackstairs').removeClass('hidden');
          $stairs.css('opacity', 1);
          state.tookStairs = false;
          return state.kind = null;
        } else if (state.kind != null) {
          return message("A " + (state.kind.toUpperCase()) + " cannot replace STAIRS.");
        } else {
          return message("You have no STAIRS to put back. Although your bro can be a little walkover sometimes...");
        }
      } else {
        if (state.kind) {
          return message("You are already carrying something! Come on, get with the physics here.");
        } else {
          return choice("Take the STAIRS?", function() {
            message("You take the STAIRS. They're light like the inside of your mother's heart, and hollow like hers too.");
            state.tookStairs = true;
            state.kind = "stairs";
            return $stairs.css('opacity', .2);
          });
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
      if (state.assemblySwitchOn) {
        return outsideFakeSun();
      } else {
        return outsideNight();
      }
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
    $scene.on('click', '.stars', function() {
      return message("You think you can make out Godelius Quantide and Leland L., the constellations you and your bro based your internet handles after. You'd be able to tell if you could find the switch for your TELESCOPE.");
    });
    return $scene.on('click', '.telescope', function() {
      return choice("Look through the TELESCOPE?", function() {
        hide('outsidenight');
        return endGame();
      });
    });
  };

  outsideFakeSun = function() {
    var $scene;
    $scene = show('outsidefakesun');
    $scene.on('click', '.north', function() {
      hide('outsidefakesun');
      return goOutside();
    });
    $scene.on('click', '.you', function() {
      return message("Sometimes you and your bro like to frolick across this field like idiotic tools. After your bro began discovering his hacker interests, not so much anymore.");
    });
    $scene.on('click', '.sky, .telescope', function() {
      return message("The generator's artificial sun emits such a bright light that you can't see the stars.");
    });
    $scene.on('click', '.generator', function() {
      return message("The generator. It's a monstrous monster of a machine that powers the switch assembly line.");
    });
    return $scene.on('click', '.switch', function() {
      $(this).toggleClass('on');
      if (!state.sawDetailedSwitch) {
        message("You flip the switch.\n\nWait. What's this poking out below the switch?\n\n...\n\nOkay, whoa. You've simply got to tell your bro about this.");
        return $document.one('messageend', function() {
          $scene.find('.switchdetail').removeClass('hidden');
          message("* You began instant messaging LL on your PHONE!\nGQ: ok, wow\nGQ: can you believe this\nGQ: mom wired a switch through the fuckin planet out onto the other side\nGQ: this is mad dedication ok\nGQ: i think im forced to admit that this is some impressive shenanigans right here\nGQ: are you there\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\nGQ: alskd;jklsda;jlkf\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\nGQ: ffffffffffffff\n* LL is offline and did not receive your message!\n* You ceased instant messaging LL!");
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

  broRoom = function() {
    var $scene;
    $scene = show('broroom');
    if (!state.visitedBroRoom) {
      state.visitedBroRoom = true;
      message("This is your younger bro's room. It's full of hacker gobbledygook. Your bro tried explaining it to you one time, but it sounded like he had a strained anus. You made the mistake of saying that out loud, and he hasn't explained any of his hacker doohickeys to you since.\n\nWhich is too bad, because you secretly enjoy hearing them.");
    }
    $scene.on('click', '.bullet', function() {
      var $bullet;
      $bullet = $(this);
      return choice("Take POORLY DRAWN, INFINITELY FIREABLE BULLET?", function() {
        message("You put the POORLY DRAWN, INFINITELY FIREABLE BULLET in your pocket.");
        $bullet.remove();
        return state.hasBullet = true;
      });
    });
    $scene.on('click', '.east', function() {
      hide('broroom');
      return corridor();
    });
    $scene.on('click', '.pipes', function() {
      return message("When your bro was younger, he always made these pipes just to hide in them. It was a little cute, actually!");
    });
    $scene.on('click', '.bigcomp', function() {
      return message("You wish you knew what this thing does. Compute gits??? Is that right???");
    });
    $scene.on('click', '.comp', function() {
      return message("Your bro's internet handle is Leland L., or LL, a combination of a constellation and an addiction to L from Death Note. You never understood his fascination with death.");
    });
    $scene.on('click', '.bro', function() {
      if (!state.sawBro) {
        state.sawBro = true;
        $scene.find('.brodeathdetail').removeClass('hidden');
        message("STEVE: oh god\nSTEVE: oh god\nSTEVE: this cant be possible\nSTEVE: tell me youre just having another one of your revelations\nSTEVE: bro?\nSTEVE: jon?\nSTEVE: OH SHIT");
        return $document.one('messageend', function() {
          $scene.find('.brodeathdetail').addClass('hidden');
          return $scene.find('.yourbroim').removeClass('hidden');
        });
      } else {
        return message("Your bro's dead body. Oh god!!!!!!!!");
      }
    });
    $scene.on('click', '.yourbroim', function() {
      $scene.find('.yousad').removeClass('hidden');
      message("LL: Hey, Steve.\nLL: I'm hoping you're in my room by now. It's been well past two minutes.\nLL: what?????????\nLL: wait hold on switching usernames\n* LL is now known as GQ!\nGQ: ok what the noggin????????\nGQ: how are you talking to me?????????\nLL: Sorry, I should have told you beforehand.\nGQ: yeah well um!!!!!!!!!!!!!!!! ok!!!!!!!!!!\nLL: Uh, are you okay?\nGQ: hahahaha am i okay?????? do i sound okay to you????? i am perfectly fine! i feel fully alive bro!!!!!\nLL: Uh, all right.\nLL: So, I finished my dimensional warper. I'm actually typing to you twenty hours in the future. I'll save YOU the fine nitty gritty, though.\nLL: It's a bit janky, both temporally and spatially. I'm guessing it just needs a few more minutes of calibration.\nGQ: man this is fucked up!!!!!\nGQ: you talking to me in the future with your dead body lying behind me present tense\nGQ: i can feel its dead eyes boring into me like a knife-wielding clown about to have the last laugh\nLL: Uh.\nLL: You see a dead body? My dead body, in particular?\nLL: Are you just saying that ironically?\nGQ: i see your body here as unironically plain as day!!!!!!\nGQ: it is so unironic that i am using tricked out exclamation marks like this ok!!!!!!\nGQ: this whole thing is creeping me out more than that episode of jersey shore lovingly remastered in maximum jpeg compression!!!!!!\nLL: Wait, I'm dead?\nGQ: yes you got it! youre a regular sherlock bro!!!!!!!!\nLL: Okay.\nLL: That's very interesting.\nLL: I'll come check it out. Just sit tight before you go insane or whatever.\nGQ: n\n* LL signed off.\nGQ: o\nGQ: no\nGQ: wait\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!\nGQ: oh fuck!!!!!!!!!!\nGQ: id hope you die but you are already dead!!!!!!!!!!\n* LL is offline and did not receive your message!\n* LL is offline and did not receive your message!");
      $(this).remove();
      return $document.one('messageend', function() {
        return $scene.find('.yousad').addClass('hidden');
      });
    });
    return $scene.on('click', '.scythe', function() {
      var $scythe;
      $scythe = $(this);
      if (!(state.kind != null)) {
        return choice("Take BRO'S SCYTHE?", function() {
          state.kind = "scythe";
          $scythe.css('opacity', .2);
          return message("You take your bro's prized SCYTHE.        You feel kinda like the reaper of death, all things considering.");
        });
      } else if (state.kind === 'scythe') {
        state.kind = null;
        $scythe.css('opacity', 1);
        return message("You put back the SCYTHE like a nice boy.");
      } else {
        return message("You're already carrying something! You can't take his SCYTHE, brah.");
      }
    });
  };

  fireGunAtSwitch = function() {
    var $fireGun, $scene, src;
    $scene = show('assembly');
    $scene.find('.south').addClass('hidden');
    $fireGun = $scene.find('.firegun');
    $fireGun.removeClass('hidden');
    src = $fireGun.attr('src');
    $fireGun.attr('src', '');
    $fireGun.attr('src', src);
    return setTimeout(function() {
      var $brodie;
      $brodie = $scene.find('.brodie');
      $brodie.removeClass('hidden');
      src = $brodie.attr('src');
      $brodie.attr('src', '');
      $brodie.attr('src', src);
      setTimeout(function() {
        $brodie.remove();
        message("ohgodohgodohgod you just killed your bro ohgodohgodohgod why cant you stop smiling ohgodohgodohgod\n\nohgodohgodohgod you need to calm down where is your TELESCOPE ohgodohgodohgod");
        return $document.one('messageend', function() {
          message("You hear a rumbling outside as your bro's future death triggers the switch.");
          return $document.one('messageend', function() {
            $fireGun.remove();
            state.telescope = true;
            $('.telescope').removeClass('hidden');
            $scene.find('.south').removeClass('hidden');
            hide('assembly');
            return assembly();
          });
        });
      }, 1000);
      return setTimeout(function() {
        return $scene.addClass('on');
      }, 200);
    }, 2000);
  };

  endGame = function() {
    var $scene;
    $scene = show('endscene');
    message("You look through the telescope.  The stars... You feel a rush of power just as you feel small.");
    return $document.one('messageend', function() {
      $scene.find('.star').removeClass('hidden');
      message("STEVE: wait\nSTEVE: what is that");
      return $document.one('messageend', function() {
        $scene.find('.star').remove();
        $scene.find('.eye').removeClass('hidden');
        message("STEVE: oh no\nSTEVE: is that");
        return $document.one('messageend', function() {
          $scene.find('.monster').removeClass('hidden');
          message("STEVE: mom?");
          return $document.one('messageend', function() {
            $scene.find('.monsterworld').removeClass('hidden');
            message("You are so small.");
            return $document.one('messageend', function() {
              hide('endscene');
              return showCredits();
            });
          });
        });
      });
    });
  };

  showCredits = function() {
    var $scene;
    return $scene = show('showcredits');
  };

  game = play1;

  $(function() {
    preloadImage('images/assembly.gif');
    preloadImage('images/assemblyswitchon.gif');
    preloadImage('images/bro.gif');
    preloadImage('images/brodeathdetail.gif');
    preloadImage('images/brodie.gif');
    preloadImage('images/broroom.gif');
    preloadImage('images/bullet.gif');
    preloadImage('images/butcher.gif');
    preloadImage('images/corridor.gif');
    preloadImage('images/dooroutside.gif');
    preloadImage('images/earth.gif');
    preloadImage('images/eye.gif');
    preloadImage('images/firegun.gif');
    preloadImage('images/ggcomp.gif');
    preloadImage('images/gghouse.gif');
    preloadImage('images/gun.gif');
    preloadImage('images/hammer.gif');
    preloadImage('images/kitchen.gif');
    preloadImage('images/llim.gif');
    preloadImage('images/meteor.gif');
    preloadImage('images/monster.gif');
    preloadImage('images/monsterworld.gif');
    preloadImage('images/planks.gif');
    preloadImage('images/scene1.gif');
    preloadImage('images/scythe.gif');
    preloadImage('images/sinkstairs.gif');
    preloadImage('images/stairs.gif');
    preloadImage('images/star.gif');
    preloadImage('images/stars.gif');
    preloadImage('images/switchdetail.gif');
    preloadImage('images/telescope.gif');
    preloadImage('images/telescopelens.gif');
    preloadImage('images/tentacles.gif');
    preloadImage('images/tinyworld.gif');
    preloadImage('images/tinyworldwhole.gif');
    preloadImage('images/u.gif');
    preloadImage('images/underside.gif');
    preloadImage('images/undersideday.gif');
    preloadImage('images/usmall.gif');
    preloadImage('images/woosh.png');
    preloadImage('images/you.gif');
    preloadImage('images/yourroom.gif');
    preloadImage('images/yourroombright.gif');
    preloadImage('images/yousad.gif');
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
