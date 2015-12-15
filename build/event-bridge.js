(function() {
  var EventBridge, root;

  if (Array.isArray == null) {
    Array.isArray = function(argument) {
      return Object.prototype.toString.call(argument) === '[object Array]';
    };
  }

  EventBridge = {
    add: function(object, event, callback) {
      var i, len, single_event;
      if (callback == null) {
        callback = function() {};
      }
      if (Array.isArray(event)) {
        for (i = 0, len = event.length; i < len; i++) {
          single_event = event[i];
          EventBridge.add(object, single_event, callback);
        }
        return;
      }
      if (object.addEventListener) {
        object.addEventListener(event, callback);
      } else if (object.attachEvent) {
        object.attachEvent("on" + event, callback);
      }
    },
    remove: function(object, event, callback) {
      var i, len, single_event;
      if (callback == null) {
        callback = function() {};
      }
      if (Array.isArray(event)) {
        for (i = 0, len = event.length; i < len; i++) {
          single_event = event[i];
          EventBridge.remove(object, single_event, callback);
        }
        return;
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
