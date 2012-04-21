$document = $(document)
$message = $("#message")

show = (id) ->
  find(id).removeClass('hidden')

find = (id) ->
  $("##{id}")

# MESSAGES

message = (msg, cont = "") ->
  $message.removeClass('hidden')
  $message.empty().html(msg.replace(/\n/g, '<br>'))
  $message.append("""
  <div id="continue">
    #{cont}
    <img src="./images/buttons/continue.gif" alt="continue"/>
  </div>""")
  $message.scrollTop(0)
  message.up = true

hideMessage = ->
  if message.up
    $("#message").addClass('hidden')
    message.up = false
    $document.trigger 'messageend'
hideMessage()

$(document).keyup (e) ->
  if message.up and e.which == 13 || e.which == 90
    hideMessage()

# Game start
$ ->
  $nameInsert = $('#nameinsert')
  $nameInsert.show()
  $('#newname').focus()
  $nameInsert.find('input').on 'keyup', (e) ->
    if e.which == 13 then enteredName()
  $nameInsert.on 'click', '.ok', ->
    enteredName()

  enteredName = ->
    newName = $('#newname').val()
    if newName == "Googlohurf Harpstuck"
      alert "Oh, come on! That's a horrible name."
      $('#newname').focus()
      return
    $nameInsert.find('.first').remove()
    $nameInsert.find('.second').show().on 'click', '.ok', ->
      $nameInsert.remove()
      show 'scene1'
      setTimeout scene1, 0
      # setTimeout scene1, 3000


# Scene 1
scene1 = ->
  $scene = find 'scene1'
  message """
  * LL began instant-messaging you!
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
    LL: Let me talk.
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
          message """
          LL: And then I started wondering...
          LL: What lies beyond?
          LL: What lies sleeping?
          """, "GQ is typing..."
          $document.one 'messageend', ->
            message """
            GQ: uh
            GQ: pretty melodramatic there bro!!
            LL: Okay, well, I guess it's not surprising that you'd act this way.
            LL: Man, it really sucks not having any other friends than you.
            """



# Scene 2
scene2 = ->


$ ->
  scene1()
