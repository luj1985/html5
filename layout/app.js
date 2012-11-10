function isFirefox() {
  return (navigator.userAgent.indexOf("Firefox") > -1);
}

function generateHTML(id) {
  var html = "<article>";
  html += "<h4>Node " + id + "</h4>";
  html += "Scroll to navigate next/previous article";
  html += "</article>";
  return html;
}

function initialize() {
  var container = document.getElementById('container');
  var layout = new Spiral(container);
  for (var i = 0; i < 15; i++) {
    var elem = document.createElement("div");
    elem.innerHTML = generateHTML(i);
    elem.setAttribute('class', "component");
    elem.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    container.appendChild(elem);
  }
  layout.registerQuery('.component');

  function mouseWheelHandler(evt) {
    if (evt.wheelDelta < 0 || evt.detail > 0) {
      layout.next();
    } else {
      layout.previous();
    }
    evt.preventDefault();
    return false;
  }

  var eventType = isFirefox() ? "DOMMouseScroll" : "mousewheel";
  container.addEventListener(eventType, mouseWheelHandler, false);
  container.addEventListener("touchend", mouseWheelHandler, false);
  window.addEventListener("resize", function(evt) { 
    layout.paintComponents();
  }, false);
}

window.addEventListener("load", initialize, false);
