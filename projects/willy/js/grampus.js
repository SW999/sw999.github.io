(function() {
  var myImgs,
      clouds = document.querySelector('#clouds'),
      audio = document.getElementById('audio'),
      len,
      W = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      H = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
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
    el.style['transform'] = 'translate3d(' + x +'px, ' + y + 'px, 0)';
  }

  function getTranslate(obj) {
    if(!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
      transform = style.transform,
      mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) {
      return {
        x: parseFloat(mat[0].split(', ')[12]),
        y: parseFloat(mat[1].split(', ')[13])
      }
    }
    mat = transform.match(/^matrix\((.+)\)$/);
    return {
      x: mat ? parseFloat(mat[0].split(', ')[4]) : 0,
      y: mat ? parseFloat(mat[1].split(', ')[5]) : 0
    }
  }

  function loadImage(elem, ln, fn) {
    var el = document.querySelector(elem),
      fragment = document.createDocumentFragment(),
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
    el.appendChild(fragment);
    myImgs = document.querySelectorAll('#wrapper .layer');
    len = ln;
  }

  function mover() {
    var dx, dy, tg;
    // Don't do the calculations if the coordinates are the same
    if (destination_x !== current_x && destination_y !== current_y) {
      for (var i = 0; i < len; i += 1) {
        var current_x = getTranslate(myImgs[i]).x,
            current_y = getTranslate(myImgs[i]).y;

        // If this is not the top layer
        if (i !== len - 1) {
          setTranslate(myImgs[i], getTranslate(myImgs[i+1]).x, getTranslate(myImgs[i+1]).y); // using coordinates higher layer
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
      requestAnimationFrame(mover);
  }

  // Get the coordinates of the cursor after the move
  function mousePos(e) {
    destination_x = e.pageX;
    destination_y = e.pageY;
  }

  function init() {
    document.body.setAttribute("style","width: " + W + "px; height: " + H + "px;"); // Remove the scroll bars
    document.body.classList.remove('load');
    //document.getElementById('audio').play();

    // Remove an invisible block, add an event listener and start animation
    var interval = setTimeout(function() {
      clouds.parentNode.removeChild(clouds);
      mover();
      document.addEventListener('mousemove', mousePos, false);
      clearTimeout(interval);
    }, 14000);
  }

  loadImage('#wrapper', 43, init);
})();
