(function() {
  var myImgs,
      clouds = document.getElementById('clouds'),
      audio = document.getElementById('audio'),
      wrapper = document.getElementById('wrapper'),
      len,
      domRect = document.body.getBoundingClientRect(),
      W = domRect.width,
      H = domRect.height,
      hW = W/2, // The variable need in order not perform calculations in a loop
      hH = H/2,
      /* The animation max step. Variable need to multilayer shape is not torn when driving.
         Value is experimentally */
      step = 12,
      destination_x = hW, // Start position
      destination_y = hH;

  audio.addEventListener("canplay", function() {
    audio.play();
  });

  function setTranslate(el, x, y) {
    el.style.transform = 'translate3d(' + x +'px, ' + y + 'px, 0)';
  }

  function getTranslation(obj) {
    if (!getComputedStyle(obj)) {
      return;
    }

    var style = getComputedStyle(obj),
      transform = style.transform,
      translation = transform.match(/^matrix\((.+)\)$/),
      translationArr;

    if (translation) {
      translationArr = translation[1].split(', ');
      return {
        x: ~~ translationArr[4],
        y: ~~ translationArr[5]
      }
    }

    return {
      x: 0,
      y: 0
    }
  }

  function loadImage(elem, ln, fn) {
    var fragment = document.createDocumentFragment(),
      count = 0,
      img = {},
      onImgLoad = function () {
        this.style.marginLeft = '-' + (this.offsetWidth) / 2 + 'px';
        this.style.marginTop = '-' + (this.offsetHeight) / 2 + 'px';
        setTranslate(this, hW, hH);
        count += 1;
        (count === ln && typeof fn === 'function') ? fn() : null;
      };
    for (var i = 0; i < ln; i += 1) {
      img[i] = new Image();
      img[i].classList.add('layer');
      fragment.appendChild(img[i]);
      img[i].onload = onImgLoad;
      img[i].src = 'img/slide' + (i+1) + '.png';
    }
    elem.appendChild(fragment);
    myImgs = wrapper.querySelectorAll('.layer');
    len = ln;
  }

  function doStep() {
    var dx, dy, tg;
    // Don't do the calculations if the coordinates are the same
    if (destination_x !== current_x && destination_y !== current_y) {
      for (var i = 0; i < len; i += 1) {
        var current_x = getTranslation(myImgs[i]).x,
            current_y = getTranslation(myImgs[i]).y;

        // If this is not the top layer
        if (i !== len - 1) {
          setTranslate(myImgs[i], getTranslation(myImgs[i+1]).x, getTranslation(myImgs[i+1]).y); // using coordinates higher layer
        } else { // The top layer
          dx = Math.abs(current_x - destination_x); // absolute value of the difference between the coordinates
          dy = Math.abs(current_y - destination_y);
          tg = dx/dy;
          // Factor that regulates the movement of the shortest paths in the presence of maximum step movement. Analogue velocity.

          // Iterate variants of moving the mouse to the ratio of the maximum step
          if (dx <= step && dy <= step) {
            current_x = destination_x;
            current_y = destination_y;
          }
          if (dx > step && dy <= step) {
            // define the coordinate increases or decreases
            current_x += (current_x < destination_x) ? step : -step;
            current_y += (current_y < destination_y) ? step/tg : -step/tg;
          }
          if (dx <= step && dy > step) {
            current_x += (current_x < destination_x) ? step*tg : -step*tg;
            current_y += (current_y < destination_y) ? step : -step;
          }
          if (dx > step && dy > step) {
            if (dx > dy) {
              current_x += (current_x < destination_x) ? step : -step;
              current_y += (current_y < destination_y) ? step/tg : -step/tg;
            } else if (dx < dy) {
              current_x += (current_x < destination_x) ? step*tg : -step*tg;
              current_y += (current_y < destination_y) ? step:-step;
            } else {
              current_x += (current_x < destination_x) ? step : -step;
              current_y += (current_y < destination_y) ? step : -step;
            }
          }
          setTranslate(myImgs[i], current_x, current_y);
        }
      }
    }
      /* Repeated using a function call to complete the movement,
         it means that all layers should be arranged strictly one above the other */
      requestAnimationFrame(doStep);
  }

  // Get the coordinates of the cursor after the move
  function mousePos(e) {
    destination_x = e.pageX;
    destination_y = e.pageY;
  }

  function init() {
    document.body.classList.remove('load');

    // Remove an invisible block, add an event listener and start animation
    setTimeout(function() {
      clouds.parentNode.removeChild(clouds);
      doStep();
      document.addEventListener('mousemove', mousePos, false);
    }, 14000);
  }

  loadImage(wrapper, 43, init);
})();
