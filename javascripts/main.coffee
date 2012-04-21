$document = $(document)
$message = $("#message")
$content = $("#content")

state =
  yourDoorLocked: true

show = (id) ->
  find(id).removeClass('hidden')

hide = (id) ->
  find(id).addClass('hidden')

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
  GQ: are you serious
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
          $scene.find('.tentacles').removeClass('hidden')
          message """
          LL: And then I started wondering...
          LL: What lies beyond?
          LL: What lies sleeping?
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
      $scene.find('.doorswitch').removeClass('hidden')
      $scene.find('.lightswitch').removeClass('hidden')
      $scene.find('.door').removeClass('hidden')
      $scene.find('.door').on 'click', ->
        if state.yourDoorLocked
          message """
          The door is locked from the outside!
          """
        else if state.flippedLight
          message """
          Ugh. Please turn off the lights first.
          """
        else
          scene2()
      $scene.find('.doorswitch').on 'click', ->
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
      $scene.find('.lightswitch').on 'click', ->
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
            $scene.on 'click', '.ok', ->
              $choices.remove()
              turnOnLights()
            $scene.on 'click', '.no', ->
              $choices.addClass('hidden')
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


# Scene 2
scene2 = ->
  message """
  Navigate!
  """

# Game start
$ play1
