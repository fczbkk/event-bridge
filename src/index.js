function isArray (obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  } else {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
}


const noop = function () {};


export function add (object, event, callback = noop) {
  if (isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      
      add(object, event[i], callback);
    }
  } else {
    if (object.addEventListener) {
      object.addEventListener(event, callback);
    } else if (object.attachEvent) {
      object.attachEvent(`on${event}`, callback);
    }
  }
}


export function remove (object, event, callback = noop) {
  if (isArray(event)) {
    for (let i = 0; i < event.length; i++) {
      remove(object, event[i], callback);
    }
  } else {
    if (object.removeEventListener) {
      object.removeEventListener(event, callback);
    } else if (object.detachEvent) {
      object.detachEvent(`on${event}`, callback);
    }
  }
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
