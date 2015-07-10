(function() {
  var EventBridge, root;

  EventBridge = {
    add: function(object, event, callback) {
      if (callback == null) {
        callback = function() {};
      }
      if (object.addEventListener) {
        object.addEventListener(event, callback);
      } else if (object.attachEvent) {
        object.attachEvent("on" + event, callback);
      }
    },
    remove: function(object, event, callback) {
      if (callback == null) {
        callback = function() {};
      }
      if (object.removeEventListener) {
        object.removeEventListener(event, callback);
      } else if (object.detachEvent) {
        object.detachEvent("on" + event, callback);
      }
    },
    stop: function(event) {
      if (event != null) {
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
      }
    },
    target: function(event) {
      if (event != null) {
        return event.target || event.srcElement;
      } else {
        return null;
      }
    }
  };

  if (typeof expose !== "undefined" && expose !== null) {
    expose(EventBridge, 'EventBridge');
  } else {
    root = window || global;
    root.EventBridge = EventBridge;
  }

}).call(this);
