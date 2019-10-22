export function SvgEvent() {
  var defaultOptions = {
    domID: 'svgDemo',
    imgurl: 'bg.jpg'
  };
  this.options = defaultOptions;
  this.gridSvg = document.getElementById("grid");
  this.winWidth = window.innerWidth;  //设置svg整体的宽和高
  this.winHeight = window.innerHeight;
  this.gridLength = 20; //定义网格的大小
  this.scale = 1;
  this.init();
}

SvgEvent.prototype = {
  init() {
    this.draw = SVG(this.options.domID).size(this.winWidth, this.winHeight);
    // this.drawGroup = this.draw.group();
    // this.groupZoom = this.drawGroup.panZoom();

    //绘制网格
    this.drawGrid(this.winWidth, this.winHeight);
    this.bindEvent();
  },
  drawGrid(width, height) {
    for (var i = 0, len = Math.ceil(width / this.gridLength); i <= len; i++) {
      var attrs = {
        x1: i * this.gridLength,
        y1: 0,
        x2: i * this.gridLength,
        y2: height,
        stroke: { color: '#ddd' }
      };
      this.draw.line(attrs.x1, attrs.y1, attrs.x2, attrs.y2).stroke(attrs.stroke);
    }

    for (var i = 0, len = Math.ceil(height / this.gridLength); i <= len; i++) {
      var attrs = {
        x1: 0,
        y1: i * this.gridLength,
        x2: width,
        y2: i * this.gridLength,
        stroke: { color: '#ddd' }
      };
      this.draw.line(attrs.x1, attrs.y1, attrs.x2, attrs.y2).stroke(attrs.stroke);
    }
    this.draw.circle(100) // 圆直径
    .fill("green") 
    .move(130, 20);
  },
  zoom(num, self) {
    self.scale *= num;
    self.draw.attr("transform", "scale(" + self.scale + ")");
    self.drawGrid(self.winWidth * (1 / self.scale), self.winHeight * (1 / self.scale));
  },
  /**
  * 滑轮滚动处理事件，向上滚放大
  * {Object} e 事件对象
  */
  scrollZoom(e) {
    const self = this;
    e = e || window.event;
    //e.detail用来兼容 FireFox
    e.wheelDelta > 0 || e.detail > 0 ? self.zoom(1.1) : self.zoom(0.9);
  },
  bindEvent() {
    const self = this;
    //绑定鼠标滑轮事件
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', function(e) {
        e = e || window.event;
        //e.detail用来兼容 FireFox
        e.wheelDelta > 0 || e.detail > 0 ? self.zoom(1.1, self) : self.zoom(0.9, self);
      }, false);
    }
    window.onmousewheel = document.onmousewheel = function(e) {
      e = e || window.event;
      //e.detail用来兼容 FireFox
      e.wheelDelta > 0 || e.detail > 0 ? self.zoom(1.1, self) : self.zoom(0.9, self);
    };
  },

}