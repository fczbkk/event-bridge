import {simulateMouseEvent} from '@fczbkk/event-simulator';

import * as evt from './../src/index.js';


describe('Event Bridge', function () {

  let elm = null;
  let handle_event = null;

  // helper function that returns mock element
  const getElement = () => elm;

  beforeEach(function () {
    elm = document.createElement('div');
    handle_event = jasmine.createSpy('handle_event');
  });

  describe('basic functionality', function () {

    it('should add event listener', function () {
      evt.add(elm, 'click', handle_event);
      simulateMouseEvent(elm);
      expect(handle_event).toHaveBeenCalled();
    });

    it('should remove event listener', function () {
      evt.add(elm, 'click', handle_event);
      evt.remove(elm, 'click', handle_event);
      simulateMouseEvent(elm);
      expect(handle_event).not.toHaveBeenCalled();
    });

    it('should stop event', function () {
      let event_happened = false;

      evt.onclick = function () {
        event_happened = true;
      };

      evt.add(elm, 'click', function (e) {
        evt.stop(e);
      });

      simulateMouseEvent(elm);
      expect(event_happened).toEqual(false);
    });

    it('should get event target', function (done) {
      evt.add(elm, 'click', function (e) {
        expect(evt.target(e)).toEqual(elm);
        done();
      });
      simulateMouseEvent(elm);
    });

    it('should not throw when get target of non-existing event', function () {
      expect(function () {
        evt.target(null);
      }).not.toThrow();
    });

    it('should work with multiple events types', function () {
      spyOn(elm, 'addEventListener').and.callThrough();
      evt.add(elm, ['mouseover', 'mouseout'], handle_event);
      expect(elm.addEventListener)
        .toHaveBeenCalledWith('mouseover', handle_event);
      expect(elm.addEventListener)
        .toHaveBeenCalledWith('mouseout', handle_event);

      spyOn(elm, 'removeEventListener').and.callThrough();
      evt.remove(elm, ['mouseover', 'mouseout'], handle_event);
      expect(elm.removeEventListener)
        .toHaveBeenCalledWith('mouseover', handle_event);
      expect(elm.removeEventListener)
        .toHaveBeenCalledWith('mouseout', handle_event);
    });

    it('should fire event listener once', function () {
      evt.once(elm, 'click', handle_event);
      simulateMouseEvent(elm);
      simulateMouseEvent(elm);
      expect(handle_event.calls.count()).toEqual(1);
    });

    it('should add first supported event listener', function () {
      evt.addFirstSupported(elm, ['xxx', 'click'], handle_event);
      simulateMouseEvent(elm);
      expect(handle_event).toHaveBeenCalled();
    });

    it('should add first supported event listener once', function () {
      evt.addFirstSupportedOnce(elm, ['xxx', 'click'], handle_event);
      simulateMouseEvent(elm);
      simulateMouseEvent(elm);
      expect(handle_event.calls.count()).toEqual(1);
    });

  });

  describe('input object via function', function () {

    it('should add event listener', function () {
      evt.add(getElement, 'click', handle_event);
      simulateMouseEvent(elm);
      expect(handle_event).toHaveBeenCalled();
    });

    it('should remove event listener', function () {
      evt.add(getElement, 'click', handle_event);
      evt.remove(getElement, 'click', handle_event);
      simulateMouseEvent(elm);
      expect(handle_event).not.toHaveBeenCalled();
    });

  });

});
