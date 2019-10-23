export default function FabricUtil() {
  this.canvas = new fabric.Canvas('canvas', {
    width: window.innerWidth,
    height: window.innerHeight
  });
  fabric.Object.prototype.transparentCorners = false;
  this.ctx = this.canvas.getContext('2d');
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.imgElement = document.getElementById('img');

  this.init();
}

FabricUtil.prototype = {
  init() {
    const self = this;
    this.imgElement.onload = function() {
      self.draw(this.width / this.scale, this.height / this.scale, this.scale);
    }
    this.canvasEvent();
  },
  draw() {
    this.drawRect();
    this.drawImage();
  },
  drawLine(x1, y1, x2, y2, color) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  },
  drawRect() {
    this.ctx.fillRect(25, 25, 100, 100);
    this.ctx.clearRect(45, 45, 60, 60);
    this.ctx.strokeRect(50, 50, 50, 50);
    this.ctx.fillText("Hello world", 10, 50);
  },
  drawImage() {
    // var img = document.getElementById('img');
    // this.ctx.drawImage(img, 0, 0, 100, 100);
    // this.ctx.fillText("Hello world", 20, 50);

    var imgInstance = new fabric.Image(this.imgElement, {
      left: 100,
      top: 100,
      hasControls: false,
      hasBorders: false
    }).scale(0.3);
    this.canvas.add(imgInstance);

    // this.canvas.add(
    //   new fabric.Rect({
    //     width: 200, height: 200,
    //     left: 100, top: 100,
    //     fill: 'green',
    //     hasControls: false,
    //     hasBorders: false
    //   }));
  },
  canvasEvent() {
    var self = this, timeout = null;
    self.canvas.on('mouse:over', function (e) {
      if (!e.target) {
        return;
      }
      e.target.set('fill', 'red');
      self.canvas.renderAll();
    });

    self.canvas.on('mouse:out', function (e) {
      if (!e.target) {
        return;
      }
      e.target.set('fill', 'green');
      self.canvas.renderAll();
    });

    self.canvas.on('mouse:wheel', function (opt) {
      if (!opt.e.target) {
        return;
      }
      if (!timeout) {
        var delta = opt.e.deltaY > 0 ? 10 : -10;
        var pointer = self.canvas.getPointer(opt.e);
        var zoom = self.canvas.getZoom();
        zoom = zoom + delta / 200;
        if (zoom > 2) zoom = 2;
        if (zoom < 0.05) zoom = 0.05;
        self.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      }
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
      }, 0);
    });

    self.canvas.on('mouse:down', function(opt) {
      var evt = opt.e;
      if (evt.altKey === true || true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    self.canvas.on('mouse:move', function(opt) {
      if (this.isDragging) {
        var e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    self.canvas.on('mouse:up', function(opt) {
      this.isDragging = false;
      this.selection = true;
    });
  }
}