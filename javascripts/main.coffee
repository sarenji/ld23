$message = $("#message")

@message = (msg, cont = false) ->
  $message.html(msg)
  if cont then $message.append("""
    <div id="continue">
      #{cont} is typing... <img src="./images/buttons/continue.gif" alt="continue"/>
    </div>""")


# Game start
$ ->
  message "hello world!", "GG"
