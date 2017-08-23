/**
 * 继承
 * @param subType
 * @param superType
 */
function inP(subType, superType) {
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype;
}
/**
 * 简单的2d 动画库封装 如果想要绘制一般帧动画，那么可以使用这个类
 * @param elID
 * @param width
 * @param height
 * @param unitPic
 * @constructor
 */
function JCanim(elID, width, height, unitPic) {
    Canvas.call(this, elID, width, height, unitPic);
    //储存所以的东西
    this.i = 0;
    this.things = [];
    //承载某个动画定时器
    this.ani = {};
    //承载所有的图片实例
    this.imgs = {};
    //承载应该有的图片名字
    this.imgsNames = [];
}
/**
 * 动画类继承canvas类
 */
inP(JCanim, Canvas);
/**
 * 简单thing类
 * @param type
 * @param option

 * @constructor
 */
function Thing(type, option) {
    this.is = type || 'line';
    this.options = option || {};
    this.penOptions = {};
    this.potOptions = {};
    this.textOptions = {};
    this.shadowOptions = {};
    this.deg = 0;
    this.center = [0, 0];
    //一般也不会用斜切就索性不写了
    this.scale = [1, 1];
    this.act = [0, 0];
}


/**
 * 设置笔触属性
 * @param {Object} penOptions
 */
Thing.prototype.setPenOption = function (penOptions) {
    var that = this;
    (function () {
        for (var key in penOptions) {
            that.penOptions[key] = penOptions[key];
        }
    })();

};
/**
 * 设置填充属性
 * @param {Object} potOptions
 */
Thing.prototype.setPotOptions = function (potOptions) {
    var that = this;
    (function () {
        for (var key in potOptions) {
            that.potOptions[key] = potOptions[key];
        }
    })();

};
/**
 * 设置文字属性
 * @param {Object} textOptions
 */
Thing.prototype.setTextOptions = function (textOptions) {
    var that = this;
    (function () {
        for (var key in textOptions) {
            that.textOptions[key] = textOptions[key];
        }
    })();

};

/**
 * 设置阴影属性
 * @param {Object} shadowOptions
 */
Thing.prototype.setShadowOptions = function (shadowOptions) {
    var that = this;
    (function () {
        for (var key in shadowOptions) {
            that.shadowOptions[key] = shadowOptions[key];
        }
    })();
};
/**
 * 旋转动对应角度
 * @param PI
 */
Thing.prototype.toRotate = function (PI) {
    this.deg += PI;
};
/**
 * 设置中心点
 * @param point
 */
Thing.prototype.setCenter = function (point) {
    this.center = point;
};
/**
 * 缩放某个比例
 * @param scale
 */
Thing.prototype.toScale = function (scale) {
    this.scale[0] *= scale[0];
    this.scale[1] *= scale[1];
    // this.center[0] *= scale[0];
    // this.center[1] *= scale[1];
};
/**
 * 位移某段距离[1,1]
 * @param act
 */
Thing.prototype.toAct = function (act) {
    //同时中心点发生变化?
    // this.center[0] += act[0];
    // this.center[1] += act[1];
    this.act[0] += act[0];
    this.act[1] += act[1];

};
/**
 * 预加载图片
 * @param imgUrl
 * @param name
 */
JCanim.prototype.callImg = function (imgUrl, name) {
    var theImg = new Image();
    var that = this;
    this.imgsNames.push(name);
    var theNameIndex = this.imgsNames.length - 1;
    theImg.src = imgUrl;
    if (theImg.complete) {
        this.imgs[name] = theImg;
    } else {
        theImg.onload = function () {
            that.imgs[name] = theImg;
        };
        theImg.onerror = function () {
            that.imgs.splice(theNameIndex, 1);
            console.error(name + '图片加载失败');
        }
    }
};
/**
 * 清楚所有的元素
 */
JCanim.prototype.clearAllThing = function () {
    this.things = [];
};
/**
 * 加载多数的图片
 * @param {Object} imgs
 */
JCanim.prototype.callImgs = function (imgs) {
    var that = this;
    (function () {
        for (var key in imgs) {
            that.callImg(imgs[key], key)
        }
    })()
};
/**
 * 检测所有图片是否加载完
 * @returns {boolean}
 */
JCanim.prototype.imgsIsOk = function () {
    var theOK = true;
    var that = this;
    (function () {
        for (var i = 0; i < that.imgsNames.length; i++) {
            if (!that.imgs[that.imgsNames[i]]) {
                theOK = false;
            }
        }
    })();
    return theOK;
};
/**
 * 使用所有图片加载检测回掉
 * @param {Function}callBack
 */
JCanim.prototype.imgsCallBack = function (callBack) {
    var that = this;
    var theInterval = setInterval(function () {
        if (that.imgsIsOk()) {
            callBack();
            clearInterval(theInterval);
        }
    }, 200)

};

/**
 * 创建一条线
 * @param point1
 * @param point2
 * @returns {Thing}
 * @constructor
 */
JCanim.prototype.line = function (point1, point2) {
    var thing = new Thing('line', [point1, point2]);
    thing.setCenter([(point1[0] + point2[0]) / 2, (point1[1] + point2[1]) / 2]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);
    this.things.push(thing);
    this.things.push(thing);
    return thing;
};
/**
 * 创建二次贝塞尔曲线
 * @param startPoint
 * @param endPoint
 * @param controlPointer
 * @param openEndPath
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.line2BSR = function (startPoint, endPoint, controlPointer, openEndPath, openStroke, openFill) {


    var thing = new Thing('line2BSR', [startPoint, endPoint, controlPointer, openEndPath, openStroke, openFill]);
    thing.setCenter([(startPoint[0] + endPoint[0] + controlPointer[0]) / 3, (startPoint[1] + endPoint[1] + controlPointer[1]) / 3]);

    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);
    this.things.push(thing);
    return thing;
};
/**
 * 创建三次贝塞尔曲线
 * @param startPoint
 * @param endPoint
 * @param controlPointer1
 * @param controlPointer2
 * @param openEndPath
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.line3BSR = function (startPoint, endPoint, controlPointer1, controlPointer2, openEndPath, openStroke, openFill) {
    var thing = new Thing('line2BSR', [startPoint, endPoint, controlPointer1, controlPointer2, openEndPath, openStroke, openFill]);
    thing.setCenter([(startPoint[0] + endPoint[0] + controlPointer1[0] + controlPointer2[0]) / 3, (startPoint[1] + endPoint[1] + controlPointer1[1] + controlPointer2[1]) / 3]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一个圆
 * @param x
 * @param y
 * @param r
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.circle = function (x, y, r, openStroke, openFill) {
    var thing = new Thing('circle', [x, y, r, openStroke, openFill]);
    thing.setCenter([x, y]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一段弧
 * @param x
 * @param y
 * @param r
 * @param start
 * @param end
 * @param openEnd
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.arc = function (x, y, r, start, end, openEnd, openStroke, openFill) {

    var thing = new Thing('arc', [x, y, r, start, end, openEnd, openStroke, openFill]);
    thing.setCenter([x, y]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一个矩形
 * @param point
 * @param width
 * @param height
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.rect = function (point, width, height, openStroke, openFill) {
    var thing = new Thing('rect', [point, width, height, openStroke, openFill]);
    thing.setCenter([point[0] + width / 2, point[1] + height / 2]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一个三角形
 * @param d1
 * @param d2
 * @param d3
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.triangle = function (d1, d2, d3, openStroke, openFill) {
    var thing = new Thing('triangle', [d1, d2, d3, openStroke, openFill]);
    thing.setCenter([(d1[0] + d2[0] + d3[0]) / 3, (d1[1] + d2[1] + d3[1]) / 3]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一个四边形
 * @param d1
 * @param d2
 * @param d3
 * @param d4
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.square = function (d1, d2, d3, d4, openStroke, openFill) {
    var thing = new Thing('square', [d1, d2, d3, d4, openStroke, openFill]);
    thing.setCenter([(d1[0] + d2[0] + d3[0] + d4[0]) / 4, (d1[1] + d2[1] + d3[1] + d4[1]) / 4]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一个多边形
 * @param points
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.polygon = function (points, openStroke, openFill) {
    var thing = new Thing('polygon', [points, openStroke, openFill]);
    var centerX = 0;
    var centerY = 0;
    (function () {
        for (var i = 0; i < points.length; i++) {
            centerX += points[i][0];
            centerY += points[i][1];
        }

        centerX /= points.length;
        centerY /= points.length;
    })();
    thing.setCenter(centerX, centerY);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};
/**
 * 创建一个文字
 * @param text
 * @param point
 * @param maxWidth
 * @param openStroke
 * @param openFill
 * @returns {Thing}
 */
JCanim.prototype.text = function (text, point, maxWidth, openStroke, openFill) {
    var thing = new Thing('text', [text, point, maxWidth, openStroke, openFill]);
    var theWidth = this.C.measureText(text);
    thing.setCenter(point[0] + theWidth / 2, point[1]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);
    thing.setTextOptions(this.fontStyle);
    this.things.push(thing);
    return thing;
};
/**
 * 创建一个imgData
 * @param imgData
 * @param Cpoint
 * @param point
 * @param width
 * @param height
 * @returns {Thing}
 */
JCanim.prototype.imgData = function (imgData, Cpoint, point, width, height) {
    var thing = new Thing('imgDate', [imgData, Cpoint, point, width, height]);
    thing.setCenter(Cpoint[0] + width / 2, Cpoint[1] + height / 2);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);

    this.things.push(thing);
    return thing;
};

/**
 * 创建一个图片
 * @param urlOrImg
 * @param point
 * @param slidePoint
 * @param slideWidth
 * @param slideHeight
 * @param width
 * @param height
 * @returns {Thing}
 */
JCanim.prototype.img = function (urlOrImg, point, slidePoint, slideWidth, slideHeight, width, height) {
    var thing = new Thing('img', [urlOrImg, point, slidePoint, slideWidth, slideHeight, width, height]);
    thing.setCenter([point[0] + width / 2, point[1] + height / 2]);
    thing.setPenOption(this.strokeStyle);
    thing.setPotOptions(this.fillStyle);
    thing.setShadowOptions(this.shadowStyle);
    this.things.push(thing);
    return thing;
};

/**
 * 去绘制单张thing
 * @param {Thing} thing
 */
JCanim.prototype.toDraw = function (thing) {
    /**
     * 根据图形属性设置对应状态
     */
    if (thing) {
        //设置
        this.reStrokeStyle(thing.penOptions.color, thing.penOptions.width);
        this.reLineStyle(thing.penOptions.lineCap, thing.penOptions.lineJoin, thing.penOptions.miterLimit);
        this.reShadow(thing.shadowOptions.color, thing.shadowOptions.blur, thing.shadowOptions.X, thing.shadowOptions.Y);
        this.reFillStyle(thing.potOptions.color);
        if (!thing.textOptions == {}) {
            this.reFontStyle(thing.textOptions.fontCssStyle, thing.textOptions.textAlign, thing.textOptions.textBaseline);
        }
        //动作
        this.reTrans(1, 1, 0, 0, thing.act[0], thing.act[1]);
        this.rotate(thing.center, thing.deg);
        this.scale(thing.center, thing.scale[0], thing.scale[1]);
        /**
         * 绘制图形
         */
        if (thing.is == 'line') {
            this.drawLine(thing.options[0], thing.options[1]);
        } else if (thing.is == 'line2BSR') {
            this.draw2BSR(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4], thing.options[5]);
        } else if (thing.is == 'line3BSR') {
            this.draw3BSR(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4], thing.options[5], thing.options[6]);
        } else if (thing.is == 'circle') {
            this.drawCircle(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4]);
        } else if (thing.is == 'arc') {
            this.drawArc(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4], thing.options[5], thing.options[6], thing.options[7]);
        } else if (thing.is == 'rect') {
            this.drawRect(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4]);
        } else if (thing.is == 'triangle') {
            this.triangle(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4]);
        } else if (thing.is == 'square') {
            this.drawSquare(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4]);
        } else if (thing.is == 'polygon') {
            this.drawPolygon(thing.options[0], thing.options[1], thing.options[2]);
        } else if (thing.is == 'text') {
            this.drawText(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4]);
        } else if (thing.is == 'img') {
            this.drawImg(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4], thing.options[5], thing.options[6]);
        } else if (thing.is == 'imgData') {
            this.putImageData(thing.options[0], thing.options[1], thing.options[2], thing.options[3], thing.options[4]);
        }
    }


};
/**
 * 绘制所有的thing,并且清除对应的none
 */
JCanim.prototype.render = function () {
    var that = this;
    this.clearAll();
    (function () {
        for (var i = 0; i < that.things.length; i++) {
            if (that.things[i].is == 'none') {
                that.things.splice(i, 1);
            } else {
                that.toDraw(that.things[i]);
            }
        }
    })()
};
/**
 * 60帧运作
 * @param func
 * @param time
 * @param clear
 *  * @param overFunc
 */
JCanim.prototype.toDO60 = function (func, time, clear, overFunc) {
    var that = this;
    var times = parseInt((time * 1000) / 17);
    var theAni = setInterval(function () {
        times--;
        if (times) {
            func();
            that.render();
        } else {
            that.stopTheAni();
            if (clear) {
                that.clearAll();
            }
            overFunc();
        }

    }, 17);
    this.ani = theAni;
};
/**
 * 25帧运作
 * @param func
 * @param time
 * @param clear
 * @param overFunc
 */
JCanim.prototype.toDO25 = function (func, time, clear, overFunc) {
    var that = this;
    var times = parseInt((time * 1000) / 40);
    var theAni = setInterval(function () {
        times--;
        if (times) {
            func();
            that.render();
        } else {
            that.stopTheAni();
            if (clear) {
                that.clearAll();
            }
            overFunc();
        }

    }, 40);
    this.ani = theAni;
};
/**
 * 停止动画
 */
JCanim.prototype.stopTheAni = function () {
    if (this.ani) {
        clearInterval(this.ani);
    }
};



