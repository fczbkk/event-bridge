'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.addFirstSupported = addFirstSupported;
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

function handleEvent(object, event, callback, do_add) {
  var main_method = do_add ? 'addEventListener' : 'removeEventListener';
  var backup_method = do_add ? 'attachEvent' : 'detachEvent';
  var on_event = 'on' + event;

  if (isValidEventType(on_event)) {
    if (object[main_method]) {
      object[main_method](event, callback);
    } else if (object[backup_method]) {
      object[backup_method](on_event, callback);
    }
  }
}

function handleEvents(object, events, callback, do_add) {
  if (typeof events === 'string') {
    events = [events];
  }

  if (isArray(events)) {
    events.forEach(function (event) {
      handleEvent(object, event, callback, do_add);
    });
  }
}

function add() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
  var events = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];

  handleEvents(object, events, callback, true);
}

function addFirstSupported() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
  var events = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];

  var supported_events = events.filter(isValidEventType);
  add(object, supported_events[0], callback);
}

function remove() {
  var object = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
  var events = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
  var callback = arguments.length <= 2 || arguments[2] === undefined ? noop : arguments[2];

  handleEvents(object, events, callback, false);
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

/**
 * Returns `true` if event type is supported by the browser.
 * @param {string} event Event type
 * @returns {boolean}
 */
function isValidEventType(event) {
  return typeof event === 'string' && event in window;
}