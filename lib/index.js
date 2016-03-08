'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.remove = remove;
exports.stop = stop;
exports.target = target;
function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}

var noop = function noop() {};

function add(object, event) {
  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];

  if (isArray(event)) {
    for (var i = 0; i < event.length; i++) {

      add(object, event[i], callback);
    }
  } else {
    if (object.addEventListener) {
      object.addEventListener(event, callback);
    } else if (object.attachEvent) {
      object.attachEvent('on' + event, callback);
    }
  }
}

function remove(object, event) {
  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];

  if (isArray(event)) {
    for (var i = 0; i < event.length; i++) {
      remove(object, event[i], callback);
    }
  } else {
    if (object.removeEventListener) {
      object.removeEventListener(event, callback);
    } else if (object.detachEvent) {
      object.detachEvent('on' + event, callback);
    }
  }
}

function stop(event) {
  if (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}

function target(event) {
  if (event) {
    return event.target || event.srcElement || null;
  }
}