/**
 * Callback fired by an Event.
 * @callback EventCallback
 * @param {Event} event
 */


const noop = function () {};


/**
 * Add event listeners to the object.
 * @param {Object} [object=window] - Any object that can receive event listener.
 * @param {string|Array.<string>} [events] - Single event name or list of event names.
 * @param {EventCallback} [callback] - Function to be called when event is fired.
 */
export function add (object = window, events = [], callback = noop) {
  handleEvents(object, events, callback, true);
}


/**
 * Add event listeners to the object. After any of the events has been fired, the event listeners are removed.
 * @param {Object} [object=window] - Any object that can receive event listener.
 * @param {string|Array.<string>} [events] - Single event name or list of event names.
 * @param {EventCallback} [callback] - Function to be called when event is fired.
 */
export function once (object = window, events = [], callback = noop) {
  const wrappedCallback = function (event) {
    callback(event);
    remove(object, events, wrappedCallback);
  };
  add(object, events, wrappedCallback);
}


/**
 * Add first supported event listener from the list, ignore the rest.
 * @param {Object} [object=window] - Any object that can receive event listener.
 * @param {Array.<string>} [events] - List of event names.
 * @param {EventCallback} [callback] - Function to be called when event is fired.
 *
 * @example <caption>Use `onPopState` in modern browsers, but `onHashChange` in IE9.</caption>
 * addFirstSupported(window, ['popstate', 'hashchange'], function () {...});
 */
export function addFirstSupported (
  object = window,
  events = [],
  callback = noop
) {
  const supported_events = events.filter(isValidEventType);
  add(object, supported_events[0], callback);
}


/**
 * Remove event listeners from the object.
 * @param {Object} [object=window] - Any object that can receive event listener.
 * @param {string|Array.<string>} [events] - Single event name or list of event names.
 * @param {EventCallback} [callback] - Function to be called when event is fired.
 */
export function remove (object = window, events = [], callback = noop) {
  handleEvents(object, events, callback, false);
}


/**
 * Cancel the event and stop its further propagation.
 * @param {Event} event
 */
export function stop (event) {
  if (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
}


/**
 * Get reference to the object that dispatched the event.
 * @param {Event} event
 * @returns {Object|null}
 */
export function target (event) {
  if (event) {
    return event.target || event.srcElement || null;
  }
}


/**
 * Returns `true` if event type is supported by the browser.
 * @param {string} event - Name of the event, without the "on" at the beginning. E.g. "click".
 * @returns {boolean}
 * @ignore
 */
function isValidEventType (event) {
  return typeof event === 'string' && `on${event}` in window;
}


/**
 * Cross-browser utility that adds/removes event listener.
 * @param {Object} object - Any object that can receive event listener.
 * @param {string} event - Name of the event, without the "on" at the beginning. E.g. "click".
 * @param {EventCallback} callback - Function to be called when event is fired.
 * @param {boolean} do_add - If `true`, event will be added, otherwise it will be removed.
 * @ignore
 */
function handleEvent (object, event, callback, do_add) {
  const main_method = (do_add) ? 'addEventListener' : 'removeEventListener';
  const backup_method = (do_add) ? 'attachEvent' : 'detachEvent';

  if (isValidEventType(event)) {
    if (object[main_method]) {
      object[main_method](event, callback);
    } else if (object[backup_method]) {
      object[backup_method](`on${event}`, callback);
    }
  }
}


/**
 * Add or remove multiple events to a single object.
 * @param {Object} object - Any object that can receive event listener.
 * @param {string|Array.<string>} events - Single event name or list of event names.
 * @param {EventCallback} callback - Function to be called when event is fired.
 * @param {boolean} do_add - If `true`, event will be added, otherwise it will be removed.
 * @ignore
 */
function handleEvents (object, events, callback, do_add) {
  if (typeof events === 'string') {events = [events];}

  if (isArray(events)) {
    events.forEach(function (event) {
      handleEvent(object, event, callback, do_add);
    });
  }
}


/**
 * Cross-browser utility that checks if `input` is Array.
 * @param {*} input
 * @returns {boolean}
 * @ignore
 */
function isArray (input) {
  if (Array.isArray) {
    return Array.isArray(input);
  } else {
    return Object.prototype.toString.call(input) === '[object Array]';
  }
}
