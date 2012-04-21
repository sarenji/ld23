$message = $("#message")

show = (id) ->
  $("##{id}").removeClass('hidden')

message = (msg, cont = false) ->
  $message.removeClass('hidden')
  $message.html(msg)
  if cont then $message.append("""
    <div id="continue">
      #{cont} <img src="./images/buttons/continue.gif" alt="continue"/>
    </div>""")

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
