import { notepaperList } from './notelist';

export default function FabricUtil() {
  this.width = window.innerWidth;
  this.height = window.innerHeight;
  this.canvas = new fabric.Canvas('canvas', {
    width: this.width,
    height: this.height,
    // backgroundColor: '#D6F8FF'
  });
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  this.ctx = this.canvas.getContext('2d');
  this.zoom = 1;
  this.minZoom = 1;
  this.maxZoom = 4;
  this.maxShow = 100;
  this.gridLength = 20;
  this.baseUrl = 'https://wish-wall-1255423800.cos.ap-guangzhou.myqcloud.com/';
  this.paperList = notepaperList;
  this.content = '请保佑我的女儿抵抗力提高，扁桃体不要再生病了，不要感冒、不要咳嗽，不要 再生所有的病，身体永远健康！！！请保佑老公赚很多钱，生活无忧！！！诚心 祈愿！！！很多钱，生活无忧！！！诚心 祈愿！！！诚心 祈愿';
  // this.content = '恭喜发财！！'
  this.minLeft = 120;
  this.minTop = 120;
  this.maxLfet = this.width / this.zoom - 80;
  this.maxTop = this.height / this.zoom - 100;
  this.diffLeft = this.maxLfet - this.minLeft;
  this.diffTop = this.maxTop - this.minTop;

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
    this.draw();
    this.canvasEvent();
  },
  draw() {
    // this.drawGrid();
    for (let i = 0, len = this.maxShow; i < len; i++) {
      var index = this.random(0, 11);
      this.drawImage(index);
      // this.drawRect();
    }
    // this.drawImage(0);
    this.canvas.zoomToPoint({ x: 0, y: 0 }, this.zoom);
  },
  drawGrid() {
    let self = this;
    let bg = new fabric.Rect({
      left: this.width / this.zoom / 2,
      top: this.height / this.zoom / 2,
      width: this.width / this.zoom,
      height: this.height / this.zoom,
      stroke: 'pink',
      strokeWidth: 10,
      fill: '',
      hasControls: false,
      evented: false
    });
    // bg.fill = new fabric.Pattern({ source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAASElEQVQ4y2NkYGD4z0A6+M3AwMBKrGJWBgYGZiibEQ0zIInDaCaoelYyHYcX/GeitomjBo4aOGrgQBj4b7RwGFwGsjAwMDAAAD2/BjgezgsZAAAAAElFTkSuQmCC' },
    //   function () {
    //     bg.dirty = true;
    //     self.canvas.requestRenderAll();
    //   });
    self.canvas.add(bg);
  },
  drawLine(x1, y1, x2, y2, color) {
    let line = new fabric.Line([x1, y1, x2, y2], {
      fill: 'red',
      stroke: 'red'
    });
    this.canvas.add(line);
  },
  drawRect() {
    let pos = this.positionRandom();
    let rect = new fabric.Rect({
      left: pos.left,
      top: pos.top,
      fill: 'blue',
      width: 10,
      height: 10
    });
    this.canvas.add(rect);
  },
  drawImage(index) {
    let self = this;
    let content, arr = [];
    let params = self.paperList[index];
    let pos = this.positionRandom();
    for (let i = 0; i < this.content.length; i += params.substrLen) {
      arr.push(this.content.substr(i, params.substrLen))
    }
    content = arr.join('\n');

    // let text = new fabric.Text(content, {
    //   fontSize: 16,
    //   fontFamily: 'Arial',
    //   lineHeight: params.lineHeight || 1.5,
    //   top: params.contentTop,
    //   textAlign: 'left',
    //   originX: 'center',
    //   originY: 'center',
    //   angle: params.angle
    // });
    // let name = new fabric.Text('来自柔佛的许瑞鸿瑞鸿', {
    //   fontSize: 16,
    //   fontFamily: 'Times New Roman',
    //   top: params.nameTop,
    //   stroke: '#3e64ff',
    //   originX: 'center',
    //   originY: 'center'
    // });
    // let time = new fabric.Text('2019.10.24 23:15', {
    //   fontSize: 16,
    //   lineHeight: 2,
    //   top: params.nameTop + 25,
    //   originX: 'center',
    //   originY: 'center'
    // });
    // let group = new fabric.Group([text, name, time], {
    //   left: pos.left,
    //   top: pos.top,
    //   hasControls: false,
    //   objectCaching: false
    //   // hasBorders: false
    // }).scale(params.groupScale || 0.6);
    // self.canvas.add(group);
    // return;

    fabric.Image.fromURL(self.baseUrl + params.img, function (img) {
      img.scale(params.scale).set('perPixelTargetFind', true);
      let text = new fabric.Text(content, {
        fontSize: 16,
        fontFamily: 'Arial',
        lineHeight: params.lineHeight || 1.5,
        top: params.contentTop,
        textAlign: 'left',
        originX: 'center',
        originY: 'center',
        angle: params.angle,
      }).scale(params.textScale || 1);
      let name = new fabric.Text('来自柔佛的许瑞鸿瑞鸿', {
        fontSize: 16,
        fontFamily: 'Times New Roman',
        top: params.nameTop,
        stroke: '#3e64ff',
        originX: 'center',
        originY: 'center'
      }).scale(params.textScale || 1);
      let time = new fabric.Text('2019.10.24 23:15', {
        fontSize: 16,
        lineHeight: 2,
        top: params.nameTop + 8,
        originX: 'center',
        originY: 'center'
      }).scale(params.textScale || 1);
      let group = new fabric.Group([img, text, name, time], {
        left: pos.left,
        top: pos.top,
        hasControls: false,
        objectCaching: false,
        // evented: false
        // hasBorders: false
      }).scale(2 || params.groupScale || 0.6);
      self.canvas.add(group);
    })
  },
  positionRandom() {
    let left = this.minLeft + this.random(1, this.diffLeft);
    let top = this.minTop + this.random(1, this.diffTop);
    return { left, top }
  },
  random(frm, to) {
    return Math.floor((Math.random() * to) + frm);
  },
  canvasEvent() {
    let self = this, timeout = null;

    self.canvas.on('mouse:wheel', function (opt) {
      if (!timeout) {
        let delta = opt.e.deltaY > 0 ? 10 : -10;
        let pointer = self.canvas.getPointer(opt.e);
        let zoom = self.canvas.getZoom();
        zoom = zoom - delta / 50;
        if (zoom > self.maxZoom) zoom = self.maxZoom;
        if (zoom < self.minZoom) zoom = self.minZoom;
        self.zoom = zoom;
        self.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
        self.limitRange(this);
      }
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        timeout = null;
      }, 0);
    });

    self.canvas.on('mouse:down', function (opt) {
      let evt = opt.e;
      if (opt.target) {
        return;
      }
      if (evt.altKey === true || true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    self.canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        let e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        self.limitRange(this);
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        // console.log(self.canvas.width, self.canvas.height, this.lastPosX, this.lastPosY, this.viewportTransform)
      }
    });
    self.canvas.on('mouse:up', function (opt) {
      this.isDragging = false;
      this.selection = true;
    });
  },
  limitRange(that) {
    // return
    let width = this.width;
    let height = this.height;
    let zoom = this.zoom;
    let viewport = that.viewportTransform;
    // console.log(zoom, viewport)
    if (zoom < 1) {
      if (viewport[4] > width - width * zoom) {
        viewport[4] = width - width * zoom
      } else if (viewport[4] < 0) {
        viewport[4] = 0;
      }
      if (viewport[5] > height - height * zoom) {
        viewport[5] = height - height * zoom
      } else if (viewport[5] < 0) {
        viewport[5] = 0;
      }
    } else {
      if (viewport[4] >= 0) {
        viewport[4] = 0;
      } else if (viewport[4] < width - width * zoom) {
        viewport[4] = width - width * zoom;
      }
      if (viewport[5] >= 0) {
        viewport[5] = 0;
      } else if (viewport[5] < height - height * zoom) {
        viewport[5] = height - height * zoom;
      }
    }
  }
}