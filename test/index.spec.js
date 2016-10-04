import * as evt from './../src/';


function simulateClick(element){
  var event = document.createEvent("MouseEvent");
  event.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
  element.dispatchEvent(event);
}


describe('Event Bridge', function() {

  var elm = null;
  var handle_event = null;

  beforeEach(function() {
    elm = document.createElement('div');
    handle_event = jasmine.createSpy('handle_event');
  });

  it('should add event listener', function() {
    evt.add(elm, 'click', handle_event);
    simulateClick(elm);
    expect(handle_event).toHaveBeenCalled();
  });

  it('should remove event listener', function() {
    evt.add(elm, 'click', handle_event);
    evt.remove(elm, 'click', handle_event);
    simulateClick(elm);
    expect(handle_event).not.toHaveBeenCalled();
  });

  it('should stop event', function() {
    var event_happened = false;

    evt.onclick = function() {
      event_happened = true;
    };

    evt.add(elm, 'click', function(e) {
      evt.stop(e);
    });

    simulateClick(elm);
    expect(event_happened).toEqual(false);
  });

  it('should get event target', function(done) {
    evt.add(elm, 'click', function(e) {
      expect(evt.target(e)).toEqual(elm);
      done();
    });
    simulateClick(elm);
  });

  it('should not throw when getting target of non-eisting event', function() {
    expect(function() {
      evt.target(null);
    }).not.toThrow();
  });

  it('should work with multiple events types', function() {
    spyOn(elm, 'addEventListener').and.callThrough();
    evt.add(elm, ['mouseover', 'mouseout'], handle_event);
    expect(elm.addEventListener).toHaveBeenCalledWith('mouseover', handle_event);
    expect(elm.addEventListener).toHaveBeenCalledWith('mouseout', handle_event);

    spyOn(elm, 'removeEventListener').and.callThrough();
    evt.remove(elm, ['mouseover', 'mouseout'], handle_event);
    expect(elm.removeEventListener).toHaveBeenCalledWith('mouseover', handle_event);
    expect(elm.removeEventListener).toHaveBeenCalledWith('mouseout', handle_event);
  });

  it('should fire event listener once', function () {
    evt.once(elm, 'click', handle_event);
    simulateClick(elm);
    simulateClick(elm);
    expect(handle_event.calls.count()).toEqual(1);
  });

});
