document.addEventListener('DOMContentLoaded', function (e) {
  (function (d) {
    var customEvent = function (e, eventName) {
        var swipeEvent = document.createEvent("CustomEvent");
        swipeEvent.initCustomEvent(eventName, true, true, e.target);
        e.target.dispatchEvent(swipeEvent);
        swipeEvent = null;

        return false;
      },
      eventStart = 'ontouchstart' in document.documentElement ? 'touchstart' : 'mousedown',
      nm = true,
      sp = {x: 0, y: 0},
      ep = {x: 0, y: 0},
      touch;

    if (eventStart === 'mousedown') {
      touch = {
        mousedown: function (e) {
          sp = {x: e.pageX, y: e.pageY}
        },
        mousemove: function (e) {
          nm = false;
          ep = {x: e.pageX, y: e.pageY}
        },
        mouseup: function (e) {
          if (nm) {
            customEvent(e, 'fastClick')
          } else {
            var x = ep.x - sp.x,
              y = ep.y - sp.y,
              xr = Math.abs(x),
              yr = Math.abs(y);

            if (xr > yr) {
              if (Math.max(xr) > 70) {
                customEvent(e, (x < 0 ? 'swipeLeft' : 'swipeRight'));
              }
            } else {
              if (Math.max(yr) > 70) {
                customEvent(e, (y < 0 ? 'swipeUp' : 'swipeDown'));
              }
            }
          }
          nm = true;
        }
      }
    } else {
      document.querySelector('html').classList.add('touch');
      touch = {
        touchstart: function (e) {
          sp = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        },
        touchmove: function (e) {
          nm = false;
          ep = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        },
        touchend: function (e) {
          if (nm) {
            customEvent(e, 'fastClick')
          } else {
            var x = ep.x - sp.x,
              y = ep.y - sp.y,
              xr = Math.abs(x),
              yr = Math.abs(y);

            if (xr > yr) {
              if (Math.max(xr) > 70) {
                customEvent(e, (x < 0 ? 'swipeLeft' : 'swipeRight'));
              }
            } else {
              if (Math.max(yr) > 70) {
                customEvent(e, (y < 0 ? 'swipeUp' : 'swipeDown'));
              }
            }
          }
          nm = true;
        },
        touchcancel: function (e) {
          nm = false;
        }
      }
    }
    for (var swipeEvent in touch) {
      d.addEventListener(swipeEvent, touch[swipeEvent], false);
    }
  })(document);
});
