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

show = (id) ->
  find(id).removeClass('hidden')

hide = (id) ->
  find(id).addClass('hidden').off 'click'


find = (id) ->
  $("##{id}")

# MESSAGES

colorize = (message) ->
  messages = message.split('\n')
  for msg, i in messages
    msg = msg.replace(/^(LL: .*)/, '<span class="ll">$1</span>')
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
  $document.on 'messageend', ->
    enterName()

introYourRoom = ->
  $scene = show 'scene1'
  # TODO: Make room
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
              LL: And this isn't one of those times where the very next day I realize you were absolutely correct.
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
      $scene.off 'click'
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
    message """
    Your bro's door is locked! You need to flip a switch somewhere.

    How does your mother stay so consistent with her games?
    """
  $scene.on 'click', '.north', ->
    hide 'scene2'
    kitchen()

kitchen = ->
  $scene = show 'kitchen'
  if !state.visitedKitchen
    state.visitedKitchen = true
    message """
    This is your main room, which is also the kitchen. Your mom doesn't seem to be here, which is good. But then, she doesn't seem to be around a lot of the time.
    """
  $scene.on 'click', '.east', ->
    hide 'kitchen'
  $scene.on 'click', '.west', ->
    hide 'kitchen'
  $scene.on 'click', '.south', ->
    hide 'kitchen'
    corridor()

# preload images
$ ->
  preloadImage 'images/corridor.gif'
  preloadImage 'images/earth.gif'
  preloadImage 'images/ggcomp.gif'
  preloadImage 'images/gghouse.gif'
  preloadImage 'images/llim.gif'
  preloadImage 'images/meteor.gif'
  preloadImage 'images/scene1.gif'
  preloadImage 'images/stars.gif'
  preloadImage 'images/switchdown.gif'
  preloadImage 'images/switchup.gif'
  preloadImage 'images/tentacles.gif'
  preloadImage 'images/you.gif'
  preloadImage 'images/tinyworld.gif'
  preloadImage 'images/yourroom.gif'
  preloadImage 'images/yourroombright.gif'
  preloadImage 'images/buttons/south.gif'
  preloadImage 'images/buttons/north.gif'
  preloadImage 'images/buttons/east.gif'
  preloadImage 'images/buttons/west.gif'
  preloadImage 'images/buttons/continue.gif'

# game is the first function called after load
game = play1
