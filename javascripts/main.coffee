$message = $("#message")

@message = (msg) ->
  $message.html(msg)


# Game start
$ ->
  message "hello world!"
