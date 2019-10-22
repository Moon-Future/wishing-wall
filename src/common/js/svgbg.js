export function drawBg() {
  var svg = document.getElementById("svg-bg");
  var svgPanel = document.getElementById("svgPanel");
  var gridSvg = document.getElementById("grid");
  var width = window.innerWidth;  //设置svg整体的宽和高
  var height = window.innerHeight;
  var gridLength = 20; //定义网格的大小
  var scale = 1;

  svg.setAttribute("width", width);
  svg.setAttribute("height", height);

  //绘制网格
  drawGrid(gridSvg, width, height, gridLength);

  /**
   * 绘制网格     
   * @param {Object} svgBackground 绘制网格对象
   * @param {Int} winWidth 区域宽度
   * @param {Int} winHeigth 区域高度
   * @param {Int} gridLength 网格大小
   */
  function drawGrid(svgBackground, winWidth, winHeight, gridLength) {
    var childs = gridSvg.childNodes;
    //删除之前的网格节点，便于重绘
    for (var i = childs.length - 1; i >= 0; i--) {
      svgBackground.removeChild(childs.item(i));
    }
    for (var i = 0, len = Math.ceil(winWidth / gridLength); i <= len; i++) {
      var attrs = {
        x1: i * gridLength,
        y1: 0,
        x2: i * gridLength,
        y2: winHeight,
        stroke: "#ddd"
      };
      var line = resetSVG("line", attrs);
      svgBackground.appendChild(line);
    };
    for (var i = 0, len = Math.ceil(winHeight / gridLength); i <= len; i++) {
      var attrs = {
        x1: 0,
        y1: i * gridLength,
        x2: winWidth,
        y2: i * gridLength,
        stroke: "#ddd"
      };
      var line = resetSVG("line", attrs);
      svgBackground.appendChild(line);
    };
  }

  /**
   * js创建svg元素        
   * @param {String} tag svg的标签名
   * @param {Object} svg元素的属性
   */
  function resetSVG(tag, attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
      element.setAttribute(k, attrs[k]);
    }
    return element;
  }

  /**
   * svg放缩
   * {Float} num 放缩的倍数
   */
  function zoom(num) {
    scale *= num;
    svgPanel.setAttribute("transform", "scale(" + scale + ")");
    drawGrid(gridSvg,width*(1/scale),height*(1/scale),gridLength);
  }

  //绑定鼠标滑轮事件
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollZoom, false);
  }
  window.onmousewheel = document.onmousewheel = scrollZoom;

  /**
  * 滑轮滚动处理事件，向上滚放大
  * {Object} e 事件对象
  */
  function scrollZoom(e) {
    e = e || window.event;
    //e.detail用来兼容 FireFox
    e.wheelDelta > 0 || e.detail > 0 ? zoom(1.1) : zoom(0.9);
  }
};