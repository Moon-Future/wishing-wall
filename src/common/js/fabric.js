import { notepaperList } from './notelist';

export default function FabricUtil() {
  this.canvas = new fabric.Canvas('canvas', {
    width: window.innerWidth,
    height: window.innerHeight
  });
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  this.ctx = this.canvas.getContext('2d');
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.imgElement = document.getElementById('img');
  this.baseUrl = 'https://wish-wall-1255423800.cos.ap-guangzhou.myqcloud.com/';
  this.paperList = notepaperList;
  this.content = '请保佑我的女儿抵抗力提高，扁桃体不要再生病了，不要感冒、不要咳嗽，不要 再生所有的病，身体永远健康！！！请保佑老公赚很多钱，生活无忧！！！诚心 祈愿！！！很多钱，生活无忧！！！诚心 祈愿！！！诚心 祈愿';
  // this.content = '恭喜发财！！'

  this.init();
}

fabric.Canvas.prototype.getAbsoluteCoords = function (object) {
  return {
    left: object.left + this._offset.left,
    top: object.top + this._offset.top
  };
}

FabricUtil.prototype = {
  init() {
    const self = this;
    // this.imgElement.onload = function () {
    //   self.draw(this.width / this.scale, this.height / this.scale, this.scale);
    // }
    self.draw(this.width / this.scale, this.height / this.scale, this.scale);
    this.canvasEvent();
  },
  draw() {
    // this.drawRect();
    this.drawImage(6);
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
  drawImage(index) {
    let self = this;
    let content, arr = [];
    let params = self.paperList[index];
    console.log(this.content.length);
    for (let i = 0; i < this.content.length; i += params.substrLen) {
      arr.push(this.content.substr(i, params.substrLen))
    }
    content = arr.join('\n');

    fabric.Image.fromURL(self.baseUrl + params.img, function(img) {
      img.scale(params.scale);
      let text = new fabric.Text(content, {
        fontSize: 16,
        lineHeight: params.lineHeight || 1.5,
        top: params.contentTop,
        textAlign: 'left',
        originX: 'center',
        originY: 'center',
        angle: params.angle
      });
      let name = new fabric.Text('来自柔佛的许瑞鸿瑞鸿', {
        fontSize: 16,
        lineHeight: 2,
        top: params.nameTop,
        stroke: '#3e64ff',
        originX: 'center',
        originY: 'center'
      });
      let time = new fabric.Text('2019.10.24 23:15', {
        fontSize: 16,
        lineHeight: 2,
        top: params.nameTop + 25,
        originX: 'center',
        originY: 'center'
      });
      let group = new fabric.Group([ img, text, name, time ], {
        left: 200,
        top: 200,
        hasControls: false,
        hasBorders: false
      }).scale(params.groupScale || 0.6);
      self.canvas.add(group);
    })
    return;
    this.positionDom(imgInstance, this.createText());
    imgInstance.on('moving', function () {
      self.positionDom(imgInstance, self.createText())
    });
    imgInstance.on('scaling', function () {
      self.positionDom(imgInstance, self.createText())
    });
  },
  positionDom(obj, dom) {
    let absCoords = this.canvas.getAbsoluteCoords(obj);
    dom.style.left = (absCoords.left - 80 / 2) + 'px';
    dom.style.top = (absCoords.top - 80 / 2) + 'px';
  },
  createText() {
    // let p = document.createElement('p');
    // p.textContent = 'chenliang';
    // p.className = 'wish-word';
    // document.body.appendChild(p);
    let p = document.getElementById('wishWord');
    return p;
  },
  canvasEvent() {
    let self = this, timeout = null;
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
        let delta = opt.e.deltaY > 0 ? 10 : -10;
        let pointer = self.canvas.getPointer(opt.e);
        let zoom = self.canvas.getZoom();
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

    // self.canvas.on('mouse:down', function (opt) {
    //   let evt = opt.e;
    //   if (evt.altKey === true || true) {
    //     this.isDragging = true;
    //     this.selection = false;
    //     this.lastPosX = evt.clientX;
    //     this.lastPosY = evt.clientY;
    //   }
    // });
    // self.canvas.on('mouse:move', function (opt) {
    //   if (this.isDragging) {
    //     let e = opt.e;
    //     this.viewportTransform[4] += e.clientX - this.lastPosX;
    //     this.viewportTransform[5] += e.clientY - this.lastPosY;
    //     this.requestRenderAll();
    //     this.lastPosX = e.clientX;
    //     this.lastPosY = e.clientY;
    //   }
    // });
    // self.canvas.on('mouse:up', function (opt) {
    //   this.isDragging = false;
    //   this.selection = true;
    // });
  }
}