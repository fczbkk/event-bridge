class EventBridge

  add: (object, event, callback = ->) ->
    if object.addEventListener
      object.addEventListener event, callback
    else if object.attachEvent
      object.attachEvent "on#{event}", callback

  remove: (object, event, callback = ->) ->
    if object.removeEventListener
      object.removeEventListener event, callback
    else if object.detachEvent
      object.detachEvent "on#{event}", callback

  stop: (event) ->
    if event?
      if event.preventDefault
        event.preventDefault()
      else
        event.returnValue = false

  target: (event) ->
    if event?
      event.target or event.srcElement
    else
      null
