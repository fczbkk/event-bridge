(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EventBridge"] = factory();
	else
		root["EventBridge"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.add = add;
	exports.once = once;
	exports.addFirstSupported = addFirstSupported;
	exports.remove = remove;
	exports.stop = stop;
	exports.target = target;
	/**
	 * Callback fired by an Event.
	 * @callback EventCallback
	 * @param {Event} event
	 */

	var noop = function noop() {};

	/**
	 * Add event listeners to the object.
	 * @param {Object} [object=window] - Any object that can receive event listener.
	 * @param {string|Array.<string>} [events] - Single event name or list of event names.
	 * @param {EventCallback} [callback] - Function to be called when event is fired.
	 */
	function add() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

	  handleEvents(object, events, callback, true);
	}

	/**
	 * Add event listeners to the object. After any of the events has been fired, the event listeners are removed.
	 * @param {Object} [object=window] - Any object that can receive event listener.
	 * @param {string|Array.<string>} [events] - Single event name or list of event names.
	 * @param {EventCallback} [callback] - Function to be called when event is fired.
	 */
	function once() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

	  var wrappedCallback = function wrappedCallback(event) {
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
	function addFirstSupported() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

	  var supported_events = events.filter(isValidEventType);
	  add(object, supported_events[0], callback);
	}

	/**
	 * Remove event listeners from the object.
	 * @param {Object} [object=window] - Any object that can receive event listener.
	 * @param {string|Array.<string>} [events] - Single event name or list of event names.
	 * @param {EventCallback} [callback] - Function to be called when event is fired.
	 */
	function remove() {
	  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;

	  handleEvents(object, events, callback, false);
	}

	/**
	 * Cancel the event and stop its further propagation.
	 * @param {Event} event
	 */
	function stop(event) {
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
	function target(event) {
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
	function isValidEventType(event) {
	  return typeof event === 'string' && 'on' + event in window;
	}

	/**
	 * Cross-browser utility that adds/removes event listener.
	 * @param {Object} object - Any object that can receive event listener.
	 * @param {string} event - Name of the event, without the "on" at the beginning. E.g. "click".
	 * @param {EventCallback} callback - Function to be called when event is fired.
	 * @param {boolean} do_add - If `true`, event will be added, otherwise it will be removed.
	 * @ignore
	 */
	function handleEvent(object, event, callback, do_add) {
	  var main_method = do_add ? 'addEventListener' : 'removeEventListener';
	  var backup_method = do_add ? 'attachEvent' : 'detachEvent';

	  if (isValidEventType(event)) {
	    if (object[main_method]) {
	      object[main_method](event, callback);
	    } else if (object[backup_method]) {
	      object[backup_method]('on' + event, callback);
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

	/**
	 * Cross-browser utility that checks if `input` is Array.
	 * @param {*} input
	 * @returns {boolean}
	 * @ignore
	 */
	function isArray(input) {
	  if (Array.isArray) {
	    return Array.isArray(input);
	  } else {
	    return Object.prototype.toString.call(input) === '[object Array]';
	  }
	}

/***/ }
/******/ ])
});
;