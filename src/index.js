function isArray (obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}


const noop = function () {};


function handleEvent (object, event, callback, do_add) {
  const main_method = (do_add) ? 'addEventListener' : 'removeEventListener';
  const backup_method = (do_add) ? 'attachEvent' : 'detachEvent';
  const on_event = `on${event}`;

  if (isValidEventType(on_event)) {
    if (object[main_method]) {
      object[main_method](event, callback);
    } else if (object[backup_method]) {
      object[backup_method](on_event, callback);
    }
  }
}

function handleEvents (object, events, callback, do_add) {
  if (typeof events === 'string') {events = [events];}

  if (isArray(events)) {
    events.forEach(function (event) {
      handleEvent(object, event, callback, do_add);
    });
  }
}


export function add (object = window, events = [], callback = noop) {
  handleEvents(object, events, callback, true);
}


export function addFirstSupported (
  object = window,
  events = [],
  callback = noop
) {
  const supported_events = events.filter(isValidEventType);
  add(object, supported_events[0], callback);
}


export function remove (object = window, events = [], callback = noop) {
  handleEvents(object, events, callback, false);
}


export function stop (event) {
  if (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}


export function target (event) {
  if (event) {
    return event.target || event.srcElement || null;
  }
}


/**
 * Returns `true` if event type is supported by the browser.
 * @param {string} event Event type
 * @returns {boolean}
 */
function isValidEventType (event) {
  return typeof event === 'string' && event in window;
}