# TODO: Prevent user from selecting stuff while a choice window is open.

$document = $(document)
$message = $("#message")
$content = $("#content")

toLoad = 0
preloadImage = (path) ->
  toLoad++
  image = new Image()
  $(image).load ->
    toLoad -= 1
    if toLoad == 0
      game()
  image.src = path

state =
  yourDoorLocked: true
  # Fake.


show = (id) ->
  find(id).removeClass('hidden')

hide = (id) ->
  find(id).addClass('hidden').off 'click'


find = (id) ->
  $("##{id}")

choice = (text, okCallback, noCallback) ->
  $choices = show 'choices'
  $choices.find('.text').text(text)
  $choices.on 'click', '.ok', ->
    hide 'choices'
    okCallback()
  $choices.on 'click', '.no', ->
    hide 'choices'
    noCallback()

# MESSAGES

colorize = (message) ->
  messages = message.split('\n')
  for msg, i in messages
    msg = msg.replace(/^(LL: .*)/, '<span class="ll">$1</span>')
    msg = msg.replace(/^(STEVE: .*)/, '<span class="gq">$1</span>')
    msg = msg.replace(/^(GQ: .*)/, '<span class="gq">$1</span>')
    messages[i] = msg
  messages.join '\n'

message = (msg, cont = "") ->
  $message.removeClass('hidden')
  msg = colorize(msg)
  $message.empty().html(msg.replace(/\n/g, '<br>'))
  $message.append("""
  <div id="continue">
    #{cont}
    <img src="./images/buttons/continue.gif" alt="continue"/>
  </div>""")
  $message.scrollTop(0)
  show "messagehitbox"
  message.up = true

control = ($this) ->
  control.person = $this
control.target = {}

debug = (msg...) ->
  find('debug').html(msg.join('<br>'))  if debug.on
debug.on = true

hideMessage = ->
  if message.up
    $("#message").addClass('hidden')
    find('messagehitbox').addClass('hidden')
    message.up = false
    $document.trigger 'messageend'
hideMessage()

$(document).keyup (e) ->
  if message.up and e.which == 13 || e.which == 90
    hideMessage()

$document.on 'click', '#messagehitbox', ->
  hideMessage()

# Mouse movements
$content.on 'mousedown', (e) ->
  if control.person?
    x = e.pageX - @offsetParent.offsetLeft
    y = e.pageY - @offsetParent.offsetTop
    control.target = {x, y}
    debug x, y

enterName = ->
  $nameInsert = show 'nameinsert'
  $('#newname').focus()
  $nameInsert.find('input').on 'keyup', (e) ->
    if e.which == 13 then enteredName()
  $nameInsert.on 'click', '.ok', ->
    enteredName()

  enteredName = ->
    $nameInsert.find('.first').remove()
    $nameInsert.find('.second').show().on 'click', '.ok', ->
      $nameInsert.remove()
      introYourRoom()

play1 = ->
  $play = show 'play1'
  message "This is you! You're a pretty handsome dude :)"
  $document.one 'messageend', ->
    enterName()

introYourRoom = ->
  $scene = show 'scene1'
  message """
  This is your room. It's a bit dark right now, even if it means getting around is a little harder.
  """
  $document.one 'messageend', ->
    $scene.find('.yourbroim').removeClass('hidden')
    message """
    Looks like your bro is instant messaging you! You have an inkling of what he's got to say, and you don't want to miss it.
    """
    $document.one 'messageend', ->
      $scene.find('.yourbroim').on 'click', ->
        $scene.find('.yourbroim').remove()
        scene1()

# Scene 1
scene1 = ->
  $scene = show 'scene1'
  $scene.find('.ggcomp').removeClass('hidden')
  message """
  * LL began instant messaging you!
  LL: Hello, Steve.
  LL: I just had another revelation.
  GQ: hahaha dude
  GQ: i knew it
  GQ: you have these like every other day
  GQ: every day*
  GQ: ok sorry what is it go on
  """, "LL is typing..."

  $document.one 'messageend', ->
    $scene.find('.gghouse').removeClass('hidden')
    message """
    LL: I think we're in a game.
    GQ: O_O
    LL: No, let me talk.
    LL: So, I've been wondering.
    LL: Our lives really aren't that different from a video game character.
    LL: We level up, we have arbitrary stat attributes, and all that.
    LL: We even have NPCs.
    """, "LL is typing..."
    $document.one 'messageend', ->
      $scene.find('.tinyworld').removeClass('hidden')
      message """
      LL: And our world is called Ludum.
      LL: I don't know, it seems painfully obvious to me now.
      LL: So I did some more sleuthing.
      LL: By which I mean I entered some calculations.
      """, "LL is typing..."
      $document.one 'messageend', ->
        $scene.find('.stars').removeClass('hidden')
        message """
        LL: And apparently the world isn't so large.
        LL: But then I remembered that by any measurement of the observable universe, our world is tiny.
        """, "LL is typing..."
        $document.one 'messageend', ->
          $scene.find('.monster').removeClass('hidden')
          message """
          LL: And then I started wondering...
          LL: What lies beyond?
          LL: What lies sleeping?
          """, "LL is typing..."
          $document.one 'messageend', ->
            $scene.find('.monsterworld').removeClass('hidden')
            message """
            LL: We are so small.
            """, "GQ is typing..."
            $document.one 'messageend', ->
              $scene.find('.ggcomp').appendTo $scene
              message """
              GQ: uh
              GQ: pretty melodramatic there bro!!
              LL: Okay, well, I guess it's not surprising that you'd act this way.
              LL: But, speaking as your younger brother by blood, you should really quit it.
              LL: And this isn't one of those times where the next day I realize you were absolutely correct.
              LL: Anyway, I have to go fix my dimensional warper. It should be done very soon.
              LL: Be in my room in two minutes.
              * LL signed off.
              GQ: wait what
              * LL is no longer online!
              """
              $document.one 'messageend', play2

play2 = ->
  $scene = show 'scene1'
  $scene.find('.ggcomp').remove()
  $scene.find('.gghouse').remove()
  $scene.find('.stars').remove()
  $scene.find('.tentacles').remove()
  $scene.find('.tinyworld').remove()
  $scene.find('.monster').remove()
  $scene.find('.monsterworld').remove()
  message """
  You and him both know it'll take you way longer than two minutes. Getting around this house is impossible! But you have to try. Your brother might be annoying slash amusing slash cute with his "revelations," but he always makes cool stuff.
  """
  $document.one 'messageend', ->
    message """
    Your mother is extremely private, so she installed switches everywhere to deter anyone from stealing her things (or her kids). She is especially protective of your little brother and never lets him unlock his own door.

    You can't remember the exact sequences to the switches, because she changes them every night, somehow without you noticing. And some switches depend on another switch being pressed.

    You have no idea how she keeps track of all these switches in her head. It would be so impressive if it wasn't SO INFURIATING.

    But first, why don't you turn on the lights?
    """
    $document.one 'messageend', ->
      beginPlaying()

beginPlaying = ->
  $scene = show 'scene1'
  $scene.off 'click'
  $scene.find('.doorswitch').removeClass('hidden')
  $scene.find('.lightswitch').removeClass('hidden')
  $scene.find('.door').removeClass('hidden')
  $scene.on 'click', '.door', ->
    if state.yourDoorLocked
      message """
      The door is locked from the outside!
      """
    else if state.flippedLight
      message """
      Bluhhh. Turn off the lights first.
      """
    else
      hide 'scene1'
      corridor()
  $scene.on 'click', '.doorswitch', ->
    if state.flippedLight
      message """
      You hear a *click*.
      """
      state.yourDoorLocked = !state.yourDoorLocked
      if state.yourDoorLocked then $(this).removeClass('on')
      else                         $(this).addClass('on')
    else
      message """
      The switch won't budge! It must depend on another switch...
      """
  $scene.on 'click', '.lightswitch', ->
    $switch = $(this)
    if state.flippedLight
      message """
      You turn off the lights.

      You hear a second *click*.
      """
      state.flippedLight = false
      $scene.find('.yourroom').removeClass('bright')
    else if !state.flippedLight?
      message """
      You inspect the crack. It's been here as long as you remember, and it still looks ominous. Sometimes, you even think it looks like an egg about to wake from a long sleep. But you won't let your bro's "revelations" get to you.
      """
      $document.one 'messageend', ->
        $choices = $scene.find('.choices')
        $choices.removeClass('hidden')
        $scene.on 'click.choices', '.ok', ->
          $choices.remove()
          turnOnLights()
          $scene.off 'click.choices'
        $scene.on 'click.choices', '.no', ->
          $choices.addClass('hidden')
          $scene.off 'click.choices'
    else
      turnOnLights()

turnOnLights = ->
  message """
  You turn on the lights.

  You hear a second *click*.
  """
  state.flippedLight = true
  $scene = find('scene1')
  $scene.find('.yourroom').addClass('bright')


# Corridor
corridor = ->
  $scene = show 'scene2'
  if !state.visitedCorridor
    state.visitedCorridor = true
    message """
    This is the only hallway in your house.

    Your bro's room is to the west, your mom's room is to the east, and the main room is dead ahead.

    Where do you go? Pleasenotyourmom'sroom pleasenotyourmom'sroom.
    """
  $scene.off 'click'
  $scene.on 'click', '.south', ->
    hide 'scene2'
    beginPlaying()
  $scene.on 'click', '.east', ->
    message """
    You, uh... would really rather not. Your mother loves her games.
    """
  $scene.on 'click', '.west', ->
    if !state.outsideSwitchOn
      message """
      Your bro's door is locked! You need to flip a switch somewhere.
      """
    else
      hide 'scene2'
      broRoom()
  $scene.on 'click', '.north', ->
    hide 'scene2'
    kitchen()

kitchen = ->
  $scene = show 'kitchen'
  if !state.visitedKitchen
    state.visitedKitchen = true
    message """
    This is your main room, which is also the kitchen. Your mother doesn't seem to be here. She seems to be away more often.
    """
  $scene.on 'click', '.east', ->
    hide 'kitchen'
    doorOutside()
  $scene.on 'click', '.west', ->
    hide 'kitchen'
    assembly()
  $scene.on 'click', '.south', ->
    hide 'kitchen'
    corridor()
  $scene.on 'click', '.sink', ->
    if state.kind == "stairs"
      choice "Put STAIRS in front of the sink?", ->
        $scene.find('.stairs').removeClass 'hidden'
        state.sinkHasStairs = true
        state.kind = null
    else if state.sinkHasStairs
      if state.kind?
        message """
        You may be insanely handsome, but you don't have the upper strength to carry two things.
        """
      else
        choice "Take STAIRS?", ->
          $scene.find('.stairs').addClass 'hidden'
          state.sinkHasStairs = false
          state.kind = "stairs"
    else
      message """
      This is where you wash your own dishes. You're not really sure where the water comes from.
      """
  $scene.on 'click', '.hammer', ->
    swap.call(this, "hammer")
  $scene.on 'click', '.gun', ->
    swap.call(this, "gun")
  $scene.on 'click', '.butcher', ->
    swap.call(this, "butcher knife")
  $scene.on 'click', '.u', ->
    message """
    You are TOO handsome! Hehehehe.
    """

swap = (kind) ->
  $kind = $(this)
  if state.sinkHasStairs and state.kind == kind
    message """You put back the #{kind} like a nice boy."""
    state.kind = null
    $kind.css 'opacity', 1
  else if state.sinkHasStairs and ([null, "butcher knife", "gun", "hammer"].indexOf(state.kind) >= 0)
    msg = "Take the #{kind.toUpperCase()}?"
    if state.kind? then msg = "Switch your #{state.kind.toUpperCase()} with the #{kind.toUpperCase()}?"
    choice msg, ->
      state.kind = kind
      find('kitchen').find('.butcher, .gun, .hammer').css 'opacity', 1
      $kind.css 'opacity', .2
      switch kind
        when "hammer"
          message "You take the HAMMER. Iiiiiiiiittt's not a dumb meme time."
        when "gun"
          message "You take the UNLOADED GUN and testosterone rips through you. You briefly entertain a name change to Sylvester Stallone."
        when "butcher knife"
          message "You used to help your FATHER with cooking, back when your mother was pregnant with your bro. You slipped and fell while holding the knife and there was too much blood and... Well, your father's not around anymore."
  else if !state.sinkHasStairs
    message """
    You're too short to reach this #{kind.toUpperCase()}. You may be incredibly handsome, but you are still short.
    """



doorOutside = ->
  $scene = show 'dooroutside'
  if !state.visitedDoorOutside
    state.visitedDoorOutside = true
    message """
    Buuuhhh!!! You used to escape through this window (now cloaked behind a barricade of wooden planks). The window is the only un-switch-able escape hatch, and it seems your mother is intent on preventing you from ever using it again.
    """
  $scene.on 'click', '.south', ->
    hide 'dooroutside'
    kitchen()
  $scene.on 'click', '.planks', ->
    $planks = $(this)
    if state.priedPlanks
      hide 'dooroutside'
      goOutside()
    else if !state.kind?
      message """
      You need to find something to unscrew these planks.
      """
    else
      switch state.kind
        when "stairs"
          message "You slam the stairs against the planks. The stairs get a little bent."
        when "butcher knife"
          message "You attack the planks with the butcher knife and look like an idiot in doing so."
        when "gun"
          message "You shoot the planks. Or, you would have if the gun were loaded."
        when "hammer"
          message "You pry the planks out of their foundation. Light filters through the now-open window!"
          $planks.css 'opacity', 0
          state.priedPlanks = true
  $scene.on 'click', '.door', ->
    message """
    Locked. There's nothing interesting outside, anyway.
    """

assembly = ->
  $scene = show 'assembly'
  if !state.visitedAssembly
    state.visitedAssembly = true
    message """
    Welcome to objectively the worst room in the house. You don't doubt the existence of heaven, because there's got to be one to counteract the neverending drama that ensues only because this switch assembly line exists.

    It's a bit depressing to see how many switches your mother is making with the explicit purpose of making your life a miserable hell.
    """
  $scene.on 'click', '.south', ->
    hide 'assembly'
    kitchen()
  $scene.on 'click', '.momswitch', ->
    if state.telescope
      message "You don't want anything to do with this switch anymore."
      return
    switch state.kind
      when "hammer"
        message """
        You slam the hammer as hard as possible on the switch. Nothing happens.
        """
      when "scythe"
        message """
        You try to pry the switch off the wall. The switch stays solidly against the wall.
        """
      when "gun"
        if state.hasBullet
          hide 'assembly'
          fireGunAtSwitch()
        else
          message """
          The gun chamber is empty. You stand there with your gun raised, trying to look macho like Stallone.
          """
      when "butcher knife"
        message """
        You hack at the switch. It wasn't very effective...
        """
      else
        message """
        This is the emergency switch your mother installed in case there ever was a time we needed her. Except nothing you try can ever move the switch. Maybe if you had a high-impact weapon...
        """

  $scene.on 'click', '.assemblyswitch', ->
    $switch = $(this)
    if state.assemblySwitchOn
      if state.kind == 'scythe'
        if state.tookStairs
          message "You can't reach the switch with your SCYTHE!"
        else
          choice "Use the SCYTHE to pull down the switch?", ->
            message "You use the scythe to flip the switch off! Thank Godelius."
            state.assemblySwitchOn = false
            $switch.removeClass 'on'
      else
        message "Bluuhhhh. You have no idea how to turn it back off. You need something to reach around the switch and pull it down."
    else if state.telescope
      message "You are never flipping this switch on again."
    else if state.kind == 'scythe'
      choice 'Do you actually want to flip this switch with the SCYTHE?', ->
        message "You flip the switch without drama."
        state.assemblySwitchOn = true
        $switch.addClass 'on'
    else if state.kind == 'gun'
      choice "Do you ACTUALLY want to poke the switch up with the GUN? You don't even know how you're turning the switch back off!", ->
        message """
        You flip the switch. There is a shuddering boom.

        So young, and the gates of hell have already opened for you.
        """
        state.assemblySwitchOn = true
        $switch.addClass 'on'
    else
      modifier = if state.kind? and state.kind != "stairs" then " with your #{state.kind.toUpperCase()}" else ""
      message """
      You can't reach the switch#{modifier}. Why would you ever want to flip the assembly line switch back on anyway???
      """
  $scene.on 'click', '.stairs', ->
    $stairs = $(this)
    if state.tookStairs
      if state.kind == "stairs"
        message """
        You put back the STAIRS.
        """
        $scene.find('.putbackstairs').removeClass('hidden')
        $stairs.css('opacity', 1)
        state.tookStairs = false
        state.kind = null
      else if state.kind?
        message """
        A #{state.kind.toUpperCase()} cannot replace STAIRS.
        """
      else
        message """
        You have no STAIRS to put back. Although your bro can be a little walkover sometimes...
        """
    else
      if state.kind
        message """
        You are already carrying something! Come on, get with the physics here.
        """
      else
        choice "Take the STAIRS?", ->
          message """
          You take the STAIRS. They're hollow inside like your mother's heart, and dark like hers too.
          """
          state.tookStairs = true
          state.kind = "stairs"
          $stairs.css('opacity', .2)


goOutside = ->
  $scene = show 'outsideday'
  $scene.on 'click', '.west', ->
    hide 'outsideday'
    doorOutside()
  $scene.on 'click', '.south', ->
    hide 'outsideday'
    if state.assemblySwitchOn then outsideFakeSun()
    else                           outsideNight()
  $scene.on 'click', '.u', ->
    message "Rawr ;-)"
  $scene.on 'click', '.sky', ->
    message "It's too bright to see the stars. You really like stars. They make you feel so small, and yet, paradoxically, they make you feel like you can do anything."

outsideNight = ->
  $scene = show 'outsidenight'
  $scene.on 'click', '.north', ->
    hide 'outsidenight'
    goOutside()
  $scene.on 'click', '.you', ->
    message "You love this spot. You try to escape here once every few hours. There's just something so peaceful about the stars."
  $scene.on 'click', '.generator', ->
    message "It's too dark to see, but this is where the generator for the switch assembly line is."
  $scene.on 'click', '.stars', ->
    message "You think you can make out Godelius Quantide and Leland L., the constellations you and your bro based your internet handles after. You'd be able to tell if you could find the switch for your TELESCOPE."
  $scene.on 'click', '.telescope', ->
    choice "Look through the TELESCOPE?", ->
      hide 'outsidenight'
      endGame()

outsideFakeSun = ->
  $scene = show 'outsidefakesun'
  $scene.on 'click', '.north', ->
    hide 'outsidefakesun'
    goOutside()
  $scene.on 'click', '.you', ->
    message "Sometimes you and your bro like to frolick across this field like idiotic tools. After your bro began discovering his hacker interests, not so much anymore."
  $scene.on 'click', '.sky, .telescope', ->
    message "The generator's artificial sun emits such a bright light that you can't see the stars."
  $scene.on 'click', '.generator', ->
    message "The generator. It's a monstrous monster of a machine that powers the switch assembly line."
  $scene.on 'click', '.switch', ->
    $(this).toggleClass('on')
    if !state.sawDetailedSwitch
      message """
      You flip the switch.

      Wait. What's this poking out below the switch?

      ...

      Okay, whoa. You've simply got to tell your bro about this.
      """
      $document.one 'messageend', ->
        $scene.find('.switchdetail').removeClass('hidden')
        message """
        * You began instant messaging LL on your phone!
        GQ: ok, wow
        GQ: can you believe this
        GQ: mom wired a switch through the fuckin planet out onto the other side
        GQ: this is mad dedication ok
        GQ: i think im forced to admit that this is some impressive shenanigans right here
        GQ: are you there
        * LL is offline and did not receive your message!
        * LL is offline and did not receive your message!
        GQ: alskd;jklsda;jlkf
        * LL is offline and did not receive your message!
        * LL is offline and did not receive your message!
        * LL is offline and did not receive your message!
        * LL is offline and did not receive your message!
        * LL is offline and did not receive your message!
        GQ: ffffffffffffff
        * LL is offline and did not receive your message!
        * You ceased instant messaging LL!
        """
        state.outsideSwitchOn = true
        state.sawDetailedSwitch = true
        $document.one 'messageend', ->
          $scene.find('.switchdetail').addClass('hidden')
    else
      message """
      You flip the switch.

      You hear a second *click*.
      """
      state.outsideSwitchOn = !state.outsideSwitchOn

broRoom = ->
  $scene = show 'broroom'
  if !state.visitedBroRoom
    state.visitedBroRoom = true
    message """
    This is your younger bro's room. It's full of hacker gobbledygook. Your bro tried explaining it to you one time, but it sounded like he had a strained anus. You made the mistake of saying that out loud, and he hasn't explained any of his hacker doohickeys to you since.

    Which is too bad, because you secretly enjoy hearing them.
    """
  $scene.on 'click', '.bullet', ->
    # TODO: Check for `kind`
    $bullet = $(this)
    choice "Take POORLY DRAWN, INFINITELY FIREABLE BULLET?", ->
      # TODO: turn bullet into a `kind`.
      message "You put the bullet in your pocket."
      $bullet.remove()
      state.hasBullet = true
  $scene.on 'click', '.east', ->
    hide 'broroom'
    corridor()
  $scene.on 'click', '.bro', ->
    if !state.sawBro
      state.sawBro = true
      $scene.find('.brodeathdetail').removeClass 'hidden'
      message """
      STEVE: oh god
      STEVE: oh god
      STEVE: this cant be possible
      STEVE: tell me youre just having another one of your revelations
      STEVE: bro?
      STEVE: jon?
      STEVE: OH SHIT
      """
      $document.one 'messageend', ->
        $scene.find('.brodeathdetail').addClass 'hidden'
        $scene.find('.yourbroim').removeClass 'hidden'
    else
      message "Your brother's dead body. Oh god!!!!!!!!"
  $scene.on 'click', '.yourbroim', ->
    $scene.find('.yousad').removeClass 'hidden'
    message """
    LL: Hey, Steve.
    LL: I'm hoping you're in my room by now. It's been well past two minutes.
    LL: what?????????
    LL: wait hold on switching usernames
    * LL is now known as GQ!
    GQ: ok what the noggin????????
    GQ: how are you talking to me?????????
    LL: Sorry, I should've let you know beforehand.
    GQ: yeah well um!!!!!!!!!!!!!!!! yeah!!!!!!!!!!
    LL: Uh, are you okay?
    GQ: hahahaha am i okay?????? do i sound okay to you????? i am perfectly fine! i feel fully alive bro!!!!!
    LL: Uh, all right.
    LL: So, I finished my dimensional warper. I'm actually typing to you twenty hours in the future. I'll save YOU the fine nitty gritty, though.
    LL: It's a bit janky, both temporally and spatially. I'm guessing it just needs a few more minutes of calibration.
    GQ: man this is fucked up!!!!!
    GQ: you talking to me in the future with your dead body right next to me
    GQ: i can feel its dead eyes boring into me like a knife-wielding clown about to have the last laugh
    LL: Uh.
    LL: You see a dead body? My dead body, in particular?
    LL: Are you just saying that ironically?
    GQ: i see your body here as unironically plain as day!!!!!!
    GQ: it is so unironic that i am using tricked out exclamation marks like this ok!!!!!!
    GQ: this whole thing is creeping me out more than that episode of jersey shore lovingly remastered in maximum jpeg compression!!!!!!
    LL: Wait, I'm dead?
    GQ: yes you got it! youre a regular sherlock bro!!!!!!!!
    LL: Okay.
    LL: That's odd.
    LL: I'll be back in a jiffy to check it out. Just sit tight before you go insane any further.
    GQ: n
    * LL signed off.
    GQ: o
    GQ: no
    GQ: wait
    * LL is offline and did not receive your message!
    * LL is offline and did not receive your message!
    * LL is offline and did not receive your message!
    GQ: oh fuck!!!!!!!!!!
    * LL is offline and did not receive your message!
    """
    $(this).remove()
    $document.one 'messageend', ->
      $scene.find('.yousad').addClass 'hidden'
  $scene.on 'click', '.scythe', ->
    $scythe = $(this)
    if !state.kind?
      choice "Take BRO'S SCYTHE?", ->
        state.kind = "scythe"
        $scythe.css 'opacity', .2
        message "You take your bro's prized SCYTHE.

        You feel kinda like the reaper of death, all things considering."
    else if state.kind == 'scythe'
      state.kind = null
      $scythe.css 'opacity', 1
      message "You put back the scythe like a nice boy."
    else
      message "You're already carrying something! You can't take his SCYTHE, brah."
# Possible TODO: Add "choice" to bro's room to knock; if so, get a cool conversation :)

fireGunAtSwitch = ->
  $scene = show 'assembly'
  $scene.find('.south').addClass 'hidden'
  $scene.find('.firegun').removeClass 'hidden'
  setTimeout ->
    $scene.find('.brodie').removeClass 'hidden'
    setTimeout ->
      $scene.find('.brodie').remove()
      message "ohgodohgodohgod you just killed your brother ohgodohgodohgod why cant you stop smiling ohgodohgodohgod"
      $document.one 'messageend', ->
        message "You hear a rumbling outside as your brother's future death triggers the switch."
        $document.one 'messageend', ->
          $scene.find('.firegun').remove()
          state.telescope = true
          $('.telescope').removeClass('hidden')
          $scene.find('.south').removeClass 'hidden'
          hide 'assembly'
          assembly()
    , 1000
  , 2000

endGame = ->
  $scene = show 'endscene'
  # TODO show pic
  message "You look through the telescope.

  The stars... You feel a rush of power just as you feel small."
  $document.one 'messageend', ->
    $scene.find('.star').removeClass('hidden')
    message """
    STEVE: wait
    STEVE: what is that
    """
    $document.one 'messageend', ->
      $scene.find('.star').remove()
      $scene.find('.eye').removeClass('hidden')
      message """
      STEVE: oh no
      STEVE: is that
      """
      $document.one 'messageend', ->
        $scene.find('.monster').removeClass('hidden')
        message "STEVE: dad?"
        $document.one 'messageend', ->
          $scene.find('.monsterworld').removeClass('hidden')
          message "You are so small."
          $document.one 'messageend', ->
            hide 'endscene'
            showCredits()

showCredits = ->
  $scene = show 'showcredits'

# game is the first function called after load
game = play1

# preload images (do after game declaration)
$ ->
  preloadImage 'images/assembly.gif'
  preloadImage 'images/bro.gif'
  preloadImage 'images/brodeathdetail.gif'
  preloadImage 'images/brodie.gif'
  preloadImage 'images/broroom.gif'
  preloadImage 'images/bullet.gif'
  preloadImage 'images/butcher.gif'
  preloadImage 'images/corridor.gif'
  preloadImage 'images/dooroutside.gif'
  preloadImage 'images/earth.gif'
  preloadImage 'images/eye.gif'
  preloadImage 'images/firegun.gif'
  preloadImage 'images/ggcomp.gif'
  preloadImage 'images/gghouse.gif'
  preloadImage 'images/gun.gif'
  preloadImage 'images/hammer.gif'
  preloadImage 'images/kitchen.gif'
  preloadImage 'images/llim.gif'
  preloadImage 'images/meteor.gif'
  preloadImage 'images/monster.gif'
  preloadImage 'images/monsterworld.gif'
  preloadImage 'images/planks.gif'
  preloadImage 'images/scene1.gif'
  preloadImage 'images/scythe.gif'
  preloadImage 'images/sinkstairs.gif'
  preloadImage 'images/stairs.gif'
  preloadImage 'images/star.gif'
  preloadImage 'images/stars.gif'
  preloadImage 'images/switchdetail.gif'
  preloadImage 'images/telescope.gif'
  preloadImage 'images/telescopelens.gif'
  preloadImage 'images/tentacles.gif'
  preloadImage 'images/tinyworld.gif'
  preloadImage 'images/tinyworldwhole.gif'
  preloadImage 'images/u.gif'
  preloadImage 'images/underside.gif'
  preloadImage 'images/undersideday.gif'
  preloadImage 'images/usmall.gif'
  preloadImage 'images/woosh.png'
  preloadImage 'images/you.gif'
  preloadImage 'images/yourroom.gif'
  preloadImage 'images/yourroombright.gif'
  preloadImage 'images/yousad.gif'
  preloadImage 'images/buttons/continue.gif'
  preloadImage 'images/buttons/south.gif'
  preloadImage 'images/buttons/north.gif'
  preloadImage 'images/buttons/east.gif'
  preloadImage 'images/buttons/west.gif'
  preloadImage 'images/buttons/switchdown.gif'
  preloadImage 'images/buttons/switchup.gif'
  preloadImage 'images/buttons/switchon90deg.gif'
  preloadImage 'images/buttons/switchoff90deg.gif'
