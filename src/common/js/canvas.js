export default function canvasEvent() {
  // return;
  this.canvas = document.getElementById('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.gridLength = 20;
  this.scale = 0.5;

  this.drawGrid(this.width / this.scale, this.height / this.scale, this.scale);
  this.bindEvent();
}

canvasEvent.prototype = {
  drawGrid(width, height, scale) {
    this.ctx.clearRect(0, 0, this.lastWidth, this.lastHeight);
    this.ctx.scale(scale, scale);
    this.lastWidth = width
    this.lastHeight = height
    for (var i = 0, len = Math.ceil(width / this.gridLength); i <= len; i++) {
      var attrs = {
        x1: i * this.gridLength - 0.5,
        y1: 0,
        x2: i * this.gridLength - 0.5,
        y2: height,
        color: '#ddd'
      };
      this.drawLine(attrs.x1, attrs.y1, attrs.x2, attrs.y2, attrs.color);
    }

    for (var i = 0, len = Math.ceil(height / this.gridLength); i <= len; i++) {
      var attrs = {
        x1: 0,
        y1: i * this.gridLength - 0.5,
        x2: width,
        y2: i * this.gridLength - 0.5,
        color: '#ddd'
      };
      this.drawLine(attrs.x1, attrs.y1, attrs.x2, attrs.y2, attrs.color);
    }
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
    var img = document.getElementById('img');
    this.ctx.drawImage(img, 0, 0, 100, 100);
    this.ctx.fillText("Hello world", 20, 50);
    // img.onload = function(){
    //   this.ctx.drawImage(img, 0, 0);
    // }
    // img.src = '../../assets/heart-1.png';
  },
  zoom(num) {
    this.scale *= num;
    console.log(this.scale)
    if (this.scale < 0.1 || this.scale > 3) {
      this.scale /= num;
      return;
    }
    this.drawGrid(this.width / this.scale, this.height / this.scale, num);
  },
  bindEvent() {
    const self = this;
    let timeout = null;
    //绑定鼠标滑轮事件
    if (document.addEventListener) {
      // 兼容 FireFox
      document.addEventListener('DOMMouseScroll', scrollZoom, false);
    }
    window.onmousewheel = document.onmousewheel = scrollZoom;

    function scrollZoom(e) {
      if (!timeout) {
        e = e || window.event;
        //e.detail用来兼容 FireFox
        e.wheelDelta > 0 || e.detail > 0 ? self.zoom(1.2) : self.zoom(0.8);
      }
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
      }, 100);
    }
  }
}

