# Event Bridge

Object for cross-browser working with events using [bridge pattern](http://en.wikipedia.org/wiki/Bridge_pattern).

This is a simple interface for [adding and removing event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget). Unfortunately, Internet Explorer 9 and older uses non-standard methods to do that.

You should use [`Event` polyfill](https://cdn.polyfill.io/v1/polyfill.js?features=Event|always) if you want the full functionality with native syntax.

## Example

```javascript
// create instance of ClassBridge object
var event_bridge = new EventBridge;

// add event listener
event_bridge.add(element, 'click', function (e) {/*...*/});

// remove event listener
// NOTE: you have to use reference to the same function object that you used
// when you were adding the event listener... so no anonymous functions
function handleEvent(e) {/*...*/}
event_bridge.add(element, 'click', handleEvent);  // now the listener is active
event_bridge.remove(element, 'click', handleEvent);  // now it is not

// handy methods for cross-browser handling of event objects
event_bridge.add(element, 'click', function (e) {

  // get the event target (IE provides event.srcElement instead event.target)
  event_bridge.target(e);

  // stop the event
  event_bridge.stop(e);

});

```

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/event-bridge/issues) or send me an e-mail at [riki@fczbkk.com](mailto:riki@fczbkk.com).

## License

Angle JS is published under the [UNLICENSE license](https://github.com/fczbkk/event-bridge/blob/master/UNLICENSE). Feel free to use it in any way.
