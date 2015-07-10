describe 'Event Bridge', ->

  evt = null
  elm = null
  handle_event = null

  beforeEach ->
    evt = EventBridge
    elm = document.createElement 'div'
    handle_event = jasmine.createSpy 'handle_event'

  it 'should exist', ->
    expect(EventBridge).toBeDefined()


  it 'should add event listener', ->
    evt.add elm, 'click', handle_event
    simulateMouseEvent elm, 'click'
    expect(handle_event).toHaveBeenCalled()

  it 'should remove event listener', ->
    evt.add elm, 'click', handle_event
    evt.remove elm, 'click', handle_event
    simulateMouseEvent elm, 'click'
    expect(handle_event).not.toHaveBeenCalled()

  it 'should stop event', ->
    event_happened = false
    evt.onclick = -> event_happened = true
    evt.add elm, 'click', (e) -> evt.stop e
    simulateMouseEvent elm, 'click'
    expect(event_happened).toEqual false

  it 'should get event target', (done) ->
    evt.add elm, 'click', (e) ->
      expect(evt.target e).toEqual elm
      done()
    simulateMouseEvent elm, 'click'

  it 'should not throw when getting target of non-eisting event', ->
    expect(-> evt.target null).not.toThrow()
