function Spiral(container) {
  var components = [];

  this.registerComponent = function(component) {
    components.push(component);
    this.paintComponents();
  };

  this.registerQuery = function(query) {
    var selected = document.querySelectorAll(query);
    for (var i = 0; i < selected.length; i++) 
      this.registerComponent(selected[i]);
  };

  this.next = function() {
    var component = components.shift();
    components.push(component);
    this.paintComponents();
  };

  this.previous = function() {
    var component = components.pop();
    components.unshift(component);
    this.paintComponents();
  };

  this.paintComponents = function() {
    var containerSize = window.getComputedStyle(container);
    var left = 0;
    var top = 0;
    var height = parseInt(containerSize.height);
    var width = parseInt(containerSize.width);

    var portrait = {
      x0: width,
      y0: height,
      x1: left,
      y1: top,
      boundStyle: function(component, index) {
        boundStyle(component, this.x0, this.y0, this.x1, this.y1, index);
      }
    };

    var landscape = {
      x0: height,
      y0: width,
      x1: top,
      y1: left,
      boundStyle: function(component, index) {
        boundStyle(component, this.y0, this.x0, this.y1, this.x1, index);
      }
    };

    var rotation = (width > height) ? landscape : portrait;

    components.forEach(function(component, index){
      calculateStyle.apply(rotation, [index + 1, component]);
    });
  };

  function calculateStyle(index, component) {
    // calculate component size
    if (index % 2 == 0) {
      this.x0 = this.x0 / 2;
    } else {
      this.y0 = this.y0 / 2;
    }
    // calculate component absolute position
    if (index % 4 == 0) {
      this.y1 = this.y1 - this.y0;
    } else if ((index % 2 == 0) || (index % 4 == 3)) {
      this.y1 = this.y1 + this.y0;
    }

    if (index % 4 == 1 && index != 1) {
      this.x1 = this.x1 - this.x0;
    } else if ((index % 2 == 1 && index != 1) || (index % 4 == 0)) {
      this.x1 = this.x1 + this.x0;
    }

    this.boundStyle(component, index);
  }

  function boundStyle(component, width, height, left, top, index) {
    component.style.width = width + "px";
    component.style.height = height + "px";
    component.style.left = left + "px";
    component.style.top = top + "px";
    component.style.position = "absolute";
    component.style.display = "inline";
    component.style.zIndex = index;
    // index start from 1
    component.style.opacity = 1 - ((index - 1) * (1.0 / components.length))
  }
}

