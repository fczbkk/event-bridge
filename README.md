# Event Bridge

[![npm](https://img.shields.io/npm/v/event-bridge.svg?maxAge=2592000)](https://www.npmjs.com/package/event-bridge)
[![npm](https://img.shields.io/github/license/fczbkk/event-bridge.svg?maxAge=2592000)](https://github.com/fczbkk/event-bridge/blob/master/LICENSE)
[![David](https://img.shields.io/david/fczbkk/event-bridge.svg?maxAge=2592000)](https://david-dm.org/fczbkk/event-bridge)
[![Travis](https://img.shields.io/travis/fczbkk/event-bridge.svg?maxAge=2592000)](https://travis-ci.org/fczbkk/event-bridge)

Object for cross-browser working with events using [bridge pattern](http://en.wikipedia.org/wiki/Bridge_pattern).

This is a simple interface for [adding and removing event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget). Unfortunately, Internet Explorer 9 and older uses non-standard methods to do that.

You should use [`Event` polyfill](https://cdn.polyfill.io/v1/polyfill.js?features=Event|always) if you want the full functionality with native syntax.

## How to use

Install the library via NPM:

```shell
npm install event-bridge --save
```

Then use in your project like this:

```javascript
import EventBridge from 'event-bridge';

// add event listener
EventBridge.add(element, 'click', function (e) {/*...*/});

// remove event listener
// NOTE: you have to use reference to the same function object that you used
// when you were adding the event listener... so no anonymous functions
function handleEvent(e) {/*...*/}
EventBridge.add(element, 'click', handleEvent);  // now the listener is active
EventBridge.remove(element, 'click', handleEvent);  // now it is not

// add multiple event listeners at once
EventBridge.add(element, ['mouseover', 'mouseout'], handleEvent);

// handy methods for cross-browser handling of event objects
EventBridge.add(element, 'click', function (e) {

  // get the event target (IE provides event.srcElement instead event.target)
  EventBridge.target(e);

  // stop the event
  EventBridge.stop(e);

});

// add first event supported by browser - this will add 'onPopState' event in
// modern browsers, but 'onHashChange' in IE9
EventBridge.addFirstSupported(window, ['popstate', 'hashchange'], function () {...});
```

## Documentation

TODO

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/event-bridge/issues) or send me an e-mail at [riki@fczbkk.com](mailto:riki@fczbkk.com).

## License

This project is published under the [MIT license](https://github.com/fczbkk/event-bridge/blob/master/LICENSE). Feel free to use it in any way.
