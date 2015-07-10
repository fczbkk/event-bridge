EventBridge =

  add: (object, event, callback = ->) ->
    if object.addEventListener
      object.addEventListener event, callback
    else if object.attachEvent
      object.attachEvent "on#{event}", callback
    return

  remove: (object, event, callback = ->) ->
    if object.removeEventListener
      object.removeEventListener event, callback
    else if object.detachEvent
      object.detachEvent "on#{event}", callback
    return

  stop: (event) ->
    if event?
      if event.preventDefault
        event.preventDefault()
      else
        event.returnValue = false
    return

  target: (event) ->
    if event?
      event.target or event.srcElement
    else
      null


# export to global namespace
if expose?
  expose EventBridge, 'EventBridge'
else
  root = window or global
  root.EventBridge = EventBridge
