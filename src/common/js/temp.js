
(function () {
  var canvas = new fabric.Canvas('step4');
  var bg = new fabric.Rect({ width: 990, height: 990, stroke: 'pink', strokeWidth: 10, fill: 'red' });
  bg.fill = new fabric.Pattern({ source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAASElEQVQ4y2NkYGD4z0A6+M3AwMBKrGJWBgYGZiibEQ0zIInDaCaoelYyHYcX/GeitomjBo4aOGrgQBj4b7RwGFwGsjAwMDAAAD2/BjgezgsZAAAAAElFTkSuQmCC' },
    function () {
      bg.dirty = true; canvas.requestRenderAll()
    });
  canvas.add(bg)
  canvas.add(new fabric.Rect({ width: 50, height: 50, fill: 'blue', angle: 10 }))
  canvas.add(new fabric.Circle({ radius: 50, fill: 'red', top: 44, left: 80 }))
  canvas.add(new fabric.Ellipse({ rx: 50, ry: 10, fill: 'yellow', top: 80, left: 35 }))
  canvas.add(new fabric.Rect({ width: 50, height: 50, fill: 'purple', angle: -19, top: 70, left: 70 }))
  canvas.add(new fabric.Circle({ radius: 50, fill: 'green', top: 110, left: 30 }))
  canvas.add(new fabric.Ellipse({ rx: 50, ry: 10, fill: 'orange', top: 12, left: 100, angle: 30 }))
  canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var pointer = canvas.getPointer(opt.e);
    var zoom = canvas.getZoom();
    zoom = zoom + delta / 200;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    console.log(zoom)
    if (zoom < 0.4) {
      this.viewportTransform[4] = 200 - 1000 * zoom / 2;
      this.viewportTransform[5] = 200 - 1000 * zoom / 2;
    } else {
      if (this.viewportTransform[4] >= 0) {
        this.viewportTransform[4] = 0;
      } else if (this.viewportTransform[4] < canvas.getWidth() - 1000 * zoom) {
        this.viewportTransform[4] = canvas.getWidth() - 1000 * zoom;
      }
      if (this.viewportTransform[5] >= 0) {
        this.viewportTransform[5] = 0;
      } else if (this.viewportTransform[5] < canvas.getHeight() - 1000 * zoom) {
        this.viewportTransform[5] = canvas.getHeight() - 1000 * zoom;
      }
    }
  });
  canvas.on('mouse:down', function (opt) {
    var evt = opt.e;
    if (evt.altKey === true) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    }
  });
  canvas.on('mouse:move', function (opt) {
    if (this.isDragging) {
      var e = opt.e;
      var zoom = canvas.getZoom();
      if (zoom < 0.4) {
        this.viewportTransform[4] = 200 - 1000 * zoom / 2;
        this.viewportTransform[5] = 200 - 1000 * zoom / 2;
      } else {
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        if (this.viewportTransform[4] >= 0) {
          this.viewportTransform[4] = 0;
        } else if (this.viewportTransform[4] < canvas.getWidth() - 1000 * zoom) {
          this.viewportTransform[4] = canvas.getWidth() - 1000 * zoom;
        }
        if (this.viewportTransform[5] >= 0) {
          this.viewportTransform[5] = 0;
        } else if (this.viewportTransform[5] < canvas.getHeight() - 1000 * zoom) {
          this.viewportTransform[5] = canvas.getHeight() - 1000 * zoom;
        }
      }
      this.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  });
  canvas.on('mouse:up', function (opt) {
    this.isDragging = false;
    this.selection = true;
  });
})()
