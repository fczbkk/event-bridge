var EventBridge;

EventBridge = (function() {
  function EventBridge() {}

  EventBridge.prototype.add = function(object, event, callback) {
    if (callback == null) {
      callback = function() {};
    }
    if (object.addEventListener) {
      return object.addEventListener(event, callback);
    } else if (object.attachEvent) {
      return object.attachEvent("on" + event, callback);
    }
  };

  EventBridge.prototype.remove = function(object, event, callback) {
    if (callback == null) {
      callback = function() {};
    }
    if (object.removeEventListener) {
      return object.removeEventListener(event, callback);
    } else if (object.detachEvent) {
      return object.detachEvent("on" + event, callback);
    }
  };

  EventBridge.prototype.stop = function(event) {
    if (event != null) {
      if (event.preventDefault) {
        return event.preventDefault();
      } else {
        return event.returnValue = false;
      }
    }
  };

  EventBridge.prototype.target = function(event) {
    return event.target || event.srcElement;
  };

  return EventBridge;

})();
