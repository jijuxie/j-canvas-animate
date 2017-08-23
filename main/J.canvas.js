//简单的2D封装 by jijuxie
/**
 *
 * Canvas类 如果只是简单的画张图可以使用这个类
 * @param elID canvas元素的id
 * @param width canvas 想要的初始化宽度
 * @param height canvas 想要的初始化高度
 * @param unitPic
 * @constructor
 */
function Canvas(elID, width, height, unitPic) {
    var theEl = document.getElementById(elID);
    if (theEl.getContext) {
        this.C = theEl.getContext('2d');
        //绘制单位用于调节自适应的时候使用
        this.unit = +unitPic;
        this.width = +width * this.unit;
        this.height = +height * this.unit;
        this.fontStyle = {};
        this.fontStyle.fontCssStyle = '10px sans-serif';
        this.C.font = '10px sans-serif';
        this.fontStyle.textAlign = 'start';
        this.C.textAlign = 'start';
        this.fontStyle.textBaseline = 'alphabetic';
        this.C.textBaseline = 'alphabetic';
        this.strokeStyle = {color: '#000000', width: 1 * this.unit, lineCap: 'butt', lineJoin: 'miter', miterLimit: 10};
        this.fillStyle = {color: '#000000'};
        this.shadowStyle = {color: '#000000', blur: 0, X: 0, Y: 0};
        this.C.strokeStyle = this.strokeStyle.color;
        this.C.lineWidth = this.strokeStyle.width;
        this.C.fillStyle = this.fillStyle.color;
        this.C.lineCap = this.strokeStyle.lineCap;
        this.C.lineJoin = this.strokeStyle.lineJoin;
        this.C.miterLimit = this.strokeStyle.miterLimit;
        this.befor = {point: [0, 0], deg: 0, scale: [1, 1]};
        this.replaceRuleStyle = 'source-over';
        this.alphaStyle = 1;
        theEl.width = this.width;
        theEl.height = this.height;
    } else {
        throw '您的浏览器不支持canvas或者没有指向canvas元素';
    }
}
/**
 * 检查是否可用
 */
Canvas.prototype.check = function () {
    if (!this.C) {
        throw '您的浏览器不支持canvas或者没有指向canvas元素,无法使用对应api'
    }
};
/**
 * 重置画笔信息
 * @param color
 * @param width
 */
Canvas.prototype.reStrokeStyle = function (color, width) {
    this.check();
    width = width || null;
    color = color || null;
    if (width != null) {
        this.strokeStyle.width = +width * this.unit;
    }
    if (color != null) {
        this.strokeStyle.color = color;
    }
    this.C.lineWidth = this.strokeStyle.width;
    this.C.strokeStyle = this.strokeStyle.color;

};
/**
 * 重置线条信息
 * @param lineCap
 * @param lineJoin
 * @param miterLimit
 */
Canvas.prototype.reLineStyle = function (lineCap, lineJoin, miterLimit) {
    this.check();
    lineCap = lineCap || this.strokeStyle.lineCap;
    if (lineCap == 'butt' || lineCap == 'round' || lineCap == 'square') {
        this.strokeStyle.lineCap = lineCap;
    }
    lineJoin = lineJoin || this.strokeStyle.lineJoin;
    if (lineJoin == 'miter' || lineJoin == 'round' || lineJoin == 'bevel') {
        this.strokeStyle.lineJoin = lineJoin;
    }
    miterLimit = miterLimit || 0;
    if (miterLimit > 0) {
        this.strokeStyle.miterLimit = miterLimit;
    }
    this.C.lineCap = this.strokeStyle.lineCap;
    this.C.lineJoin = this.strokeStyle.lineJoin;
    this.C.miterLimit = this.strokeStyle.miterLimit;
};
/**
 * 重置阴影信息
 * @param color
 * @param blur
 * @param X
 * @param Y
 */
Canvas.prototype.reShadow = function (color, blur, X, Y) {
    this.check();
    color = color || null;
    if (color != null) {
        this.shadowStyle.color = color;
    }
    blur = blur || null;
    if (blur != null) {
        this.shadowStyle.blur = +blur * this.unit;
    }
    X = X || null;
    Y = Y || null;
    if (X != null) {
        this.shadowStyle.X = +X * this.unit;
    }
    if (Y != null) {
        this.shadowStyle.Y = +Y * this.unit;
    }
    this.C.shadowOffsetX = this.shadowStyle.X;
    this.C.shadowOffsetY = this.shadowStyle.Y;
    this.C.shadowBlur = this.shadowStyle.blur;
    this.C.shadowColor = this.shadowStyle.color;
};
/**
 * 清除阴影信息
 */
Canvas.prototype.clearShadow = function () {
    this.check();
    this.shadowStyle.X = 0;
    this.shadowStyle.Y = 0;
    this.shadowStyle.blur = 0;
    this.shadowStyle.color = '#000000';
    this.C.shadowOffsetX = this.shadowStyle.X;
    this.C.shadowOffsetY = this.shadowStyle.Y;
    this.C.shadowBlur = this.shadowStyle.blur;
    this.C.shadowColor = this.shadowStyle.color;
};
/**
 * 重置填充信息
 * @param color
 */
Canvas.prototype.reFillStyle = function (color) {
    this.check();
    color = color || null;
    if (color != null) {
        this.fillStyle.color = color;
    }
    this.C.fillStyle = this.fillStyle.color;
};

/**
 * 绘制一条线
 * @param  d1
 * @param d2
 */
Canvas.prototype.drawLine = function (d1, d2) {
    this.check();
    this.C.beginPath();
    this.C.moveTo(+d1[0] * this.unit, +d1[1] * this.unit);
    this.C.lineTo(+d2[0] * this.unit, +d2[1] * this.unit);
    this.C.closePath();
    this.C.stroke();
};
/**
 * 二次贝塞尔曲线
 * @param startPoint [array]
 * @param endPoint
 * @param controlPointer
 * @param openEndPath
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.draw2BSR = function (startPoint, endPoint, controlPointer, openEndPath, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.moveTo(startPoint[0] * this.unit, startPoint[1] * this.unit);
    this.C.quadraticCurveTo(controlPointer[0] * this.unit, controlPointer[1] * this.unit, endPoint[0] * this.unit, endPoint[1] * this.unit);
    if (openEndPath) {
        this.C.closePath();
    }
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }
};
/**
 * 绘制三次贝塞尔曲线
 * @param startPoint
 * @param endPoint
 * @param controlPointer1
 * @param controlPointer2
 * @param openEndPath
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.draw3BSR = function (startPoint, endPoint, controlPointer1, controlPointer2, openEndPath, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.moveTo(startPoint[0] * this.unit, startPoint[1] * this.unit);
    this.C.bezierCurveTo(controlPointer1[0] * this.unit, controlPointer1[1] * this.unit, controlPointer2[0] * this.unit, controlPointer2[1] * this.unit, endPoint[0] * this.unit, endPoint[1] * this.unit);
    if (openEndPath) {
        this.C.closePath();
    }
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }
};


/**
 * 绘制一个圆
 * @param x
 * @param y
 * @param r
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.drawCircle = function (x, y, r, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.arc(+x * this.unit, +y * this.unit, +r * this.unit, 0, 2 * Math.PI);
    this.C.closePath();
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }

};
/**
 * 会织一条圆弧
 * @param x
 * @param y
 * @param r
 * @param start
 * @param end
 * @param openEnd
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.drawArc = function (x, y, r, start, end, openEnd, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.arc(+x * this.unit, +y * this.unit, +r * this.unit, start * Math.PI, end * Math.PI);
    if (openEnd) {
        this.C.closePath();
    }
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }

};
/**
 * 绘制一个矩形
 * @param point
 * @param width
 * @param height
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.drawRect = function (point, width, height, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.rect(+point[0] * this.unit, +point[1] * this.unit, +width * this.unit, +height * this.unit);
    this.C.closePath();
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }
};
/**
 * 绘制三角形
 * @param d1
 * @param d2
 * @param d3
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.drawTriangle = function (d1, d2, d3, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.moveTo(+d1[0] * this.unit, +d1[1] * this.unit);
    this.C.lineTo(+d2[0] * this.unit, +d2[1] * this.unit);
    this.C.lineTo(+d3[0] * this.unit, +d3[1] * this.unit);
    this.C.lineTo(+d1[0] * this.unit, +d1[1] * this.unit);
    this.C.closePath();
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }
};
/**
 * 绘制四边形
 * @param d1
 * @param d2
 * @param d3
 * @param d4
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.drawSquare = function (d1, d2, d3, d4, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.moveTo(+d1[0] * this.unit, +d1[1] * this.unit);
    this.C.lineTo(+d2[0] * this.unit, +d2[1] * this.unit);
    this.C.lineTo(+d3[0] * this.unit, +d3[1] * this.unit);
    this.C.lineTo(+d4[0] * this.unit, +d4[1] * this.unit);
    this.C.lineTo(+d1[0] * this.unit, +d1[1] * this.unit);
    this.C.closePath();
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }

};
/**
 * 绘制多边形
 * @param points 格式[[1,2],[4,5],[6.7]]
 * @param openStroke
 * @param openFill
 */
Canvas.prototype.drawPolygon = function (points, openStroke, openFill) {
    this.check();
    this.C.beginPath();
    this.C.moveTo(+points[0][0] * this.unit, +points[0][1] * this.unit);
    var that = this;
    (function () {
        for (var i = 1; i < points.length; i++) {
            that.C.lineTo(+points[i][0] * that.unit, +points[i][1] * that.unit);
        }
    })();

    this.C.lineTo(+points[0][0] * this.unit, +points[0][1] * this.unit);
    this.C.closePath();
    if (openStroke) {
        this.C.stroke();
    }
    if (openFill) {
        this.C.fill();
    }
};
/**
 * 设置文本格式
 * @param fontCssStyle
 * @param textAlign
 * @param textBaseline
 */
Canvas.prototype.reFontStyle = function (fontCssStyle, textAlign, textBaseline) {
    this.check();
    if (fontCssStyle) {
        this.fontStyle.fontCssStyle = fontCssStyle;
        this.C.font = fontCssStyle;
    }
    if (textAlign == 'left' || textAlign == 'center' || textAlign == 'right' || textAlign == 'start' || textAlign == 'end') {
        this.fontStyle.textAlign = textAlign;
        this.C.textAlign = textAlign;
    }
    if (textBaseline == 'top' || textBaseline == 'bottom' || textBaseline == 'middle' || textBaseline == 'alphabetic' || textBaseline == 'hanging' || textBaseline == 'ideographic') {
        this.fontStyle.textBaseline = textBaseline;
        this.C.textBaseline = textBaseline;
    }
};
/**
 * 重置文字格式
 */
Canvas.prototype.clearFontStyle = function () {
    this.check();
    this.fontStyle.fontCssStyle = '10px sans-serif';
    this.C.font = '10px sans-serif';
    this.fontStyle.textAlign = 'start';
    this.C.textAlign = 'start';
    this.fontStyle.textBaseline = 'alphabetic';
    this.C.textBaseline = 'alphabetic'
};
//绘制文本
/**
 * 绘制文本，要么返回文本的大小，要么返回false（false是没绘制成功）（但是文本大小也不代表绘制成功了）
 * @param text
 * @param point
 * @param maxWidth
 * @param openStroke
 * @param openFill
 * @returns {*}
 */
Canvas.prototype.drawText = function (text, point, maxWidth, openStroke, openFill) {
    this.check();
    text = text || null;
    if (typeof text == 'string') {
        if (openStroke) {
            if (maxWidth >= 1) {
                this.C.strokeText(text, point[0] * this.unit, point[1] * this.unit, maxWidth);
            } else {
                this.C.strokeText(text, point[0] * this.unit, point[1] * this.unit);
            }
        }
        if (openFill) {
            if (maxWidth >= 1) {
                this.C.fillText(text, point[0] * this.unit, point[1] * this.unit, maxWidth);
            } else {
                this.C.fillText(text, point[0] * this.unit, point[1] * this.unit);
            }
        }
        return this.C.measureText(text);
    } else {
        return false;
    }
};
/**
 * 在canvas里面放置一张图片
 * @param urlOrImg 图片地址
 * @param point 放置起始点
 * @param slidePoint 剪切起始点
 * @param slideWidth 剪切宽度
 * @param slideHeight 剪切高度
 * @param width 设置图片大小宽度
 * @param height 设置图片大小高度
 * @returns {*} 原始图片
 */
Canvas.prototype.drawImg = function (urlOrImg, point, slidePoint, slideWidth, slideHeight, width, height) {
    this.check();
    if (!urlOrImg) {
        throw '需要填写url';
    }

    point = point || [0, 0];

    var theImg = new Image();

    var that = this;

    if (typeof urlOrImg == 'string') {
        theImg.src = urlOrImg;
    } else {
        theImg = urlOrImg;
    }

    if (theImg.complete) {
        width = width || slideWidth || theImg.width;
        height = height || slideHeight || theImg.height;
        if (slidePoint && slideWidth && slideHeight) {
            this.C.drawImage(theImg, slidePoint[0] * this.unit, slidePoint[1] * this.unit, slideWidth * this.unit, slideHeight * this.unit, point[0] * this.unit, point[1] * this.unit, width * this.unit, height * this.unit);
        } else if (slidePoint || slideWidth || slideHeight) {
            console.warn('剪切图片参数不足');
            this.C.drawImage(theImg, point[0] * this.unit, point[1] * this.unit, width * this.unit, height * this.unit);
        } else {
            this.C.drawImage(theImg, point[0] * this.unit, point[1] * this.unit, width * this.unit, height * this.unit);
        }


    } else {
        theImg.onload = function () {
            width = width || slideWidth || theImg.width;
            height = height || slideHeight || theImg.height;
            if (slidePoint && slideWidth && slideHeight) {
                that.C.drawImage(theImg, slidePoint[0] * that.unit, slidePoint[1] * that.unit, slideWidth * that.unit, slideHeight * that.unit, point[0] * that.unit, point[1] * that.unit, width * that.unit, height * that.unit);
            } else if (slidePoint || slideWidth || slideHeight) {
                console.warn('剪切图片参数不足');
                that.C.drawImage(theImg, point[0], point[1], width, height);
            } else {
                that.C.drawImage(theImg, point[0], point[1], width, height);
            }
        };
        theImg.onerror = function () {
            console.error('图片加载失败');
        }
    }
    return theImg;
};

/**
 *获取imgdata
 * @param point
 * @param wight
 * @param height
 * @returns {ImageData}
 */
Canvas.prototype.getImgDate = function (point, wight, height) {
    this.check();
    return this.C.getImageData(point[0] * this.unit, point[1] * this.unit, wight * this.unit, height * this.unit);
};
/**
 *在canvas里放置imgdata的图片
 * @param imgData
 * @param Cpoint
 * @param point
 * @param width
 * @param height
 */
Canvas.prototype.putImageData = function (imgData, Cpoint, point, width, height) {
    this.check();
    Cpoint = Cpoint || [0, 0];
    if (point && width && height) {
        this.C.putImageData(imgData, Cpoint[0] * this.unit, Cpoint[1] * this.unit, point[0] * this.unit, point[1] * this.unit, width * this.unit, height * this.unit)
    } else {
        this.C.putImageData(imgData, Cpoint[0] * this.unit, Cpoint[1] * this.unit);
    }

};

/**
 * 线性渐变
 * @param {Array} point1 [1,1]
 * @param {Array} point2 [2,2]
 * @param {Array} action
 * @returns {CanvasGradient}
 */
Canvas.prototype.colorLinearGradient = function (point1, point2, action) {
    this.check();
    //初始化
    var theGrd = this.C.createLinearGradient(+point1[0] * this.unit, +point1[1] * this.unit, +point2[0] * this.unit, +point2[1] * this.unit);
    var that = this;
    (function () {
        for (var i = 0; i < action.length; i++) {

            theGrd.addColorStop(+action[i][0] * that.unit, action[i][1] * that.unit);

        }
    })();

    return theGrd;
};
/**
 * 放射状渐变
 * @param arc1
 * @param arc2
 * @param action
 * @returns {CanvasGradient}
 */
Canvas.prototype.colorRadialGradient = function (arc1, arc2, action) {
    this.check();
    //初始化
    var theGrd = this.C.createRadialGradient(+arc1[0] * this.unit, +arc1[1] * this.unit, +arc1[2] * this.unit, +arc2[0] * this.unit, +arc2[1] * this.unit, +arc2[2] * this.unit);
    var that = this;
    (function () {
        for (var i = 0; i < action.length; i++) {
            theGrd.addColorStop(+action[0] * that.unit, action[1] * that.unit);
        }
    })();
    return theGrd;
};


//限制绘图范围(交集)的一系列API
/**
 * 保存状态
 */
Canvas.prototype.save = function () {
    this.check();
    this.C.save();
};
/**
 * 交集
 */
Canvas.prototype.clip = function () {
    this.check();
    this.C.clip();
};
/**
 * 还原
 */
Canvas.prototype.restore = function () {
    this.check();
    this.C.restore();
};
/**
 * 重写放置规则
 * @param rule
 */
Canvas.prototype.replaceRule = function (rule) {
    this.check();
    rule = rule || this.replaceRuleStyle;
    if (rule == 'source-over' || rule == 'source-atop' || rule == 'source-in' || rule == 'source-atop' || rule == 'source-out' || rule == 'destination-over' || rule == 'destination-atop' || rule == 'destination-in' || rule == 'destination-out' || rule == 'lighter' || rule == 'copy' || rule == 'xor') {
        this.replaceRuleStyle = rule;
        this.C.globalCompositeOperation = rule;
    }
};
/**
 * 清除放置规则
 */
Canvas.prototype.clearPlaceRule = function () {
    this.check();
    this.replaceRuleStyle = 'source-over';
    this.C.globalCompositeOperation = this.replaceRuleStyle;
};

/**
 * //设置绘图的整体透明度
 * @param alpha
 */
Canvas.prototype.reAlpha = function (alpha) {
    this.check();
    alpha = alpha || -1;
    if (alpha >= 0 && alpha <= 1) {
        this.alphaStyle = alpha;
        this.C.globalAlpha = this.alphaStyle;
    }
};

/**
 * //还原绘图的透明度到整体状态
 */
Canvas.prototype.clearAlpha = function () {
    this.check();
    this.alphaStyle = 1;
    this.C.globalAlpha = this.alphaStyle;
};
//使用矩阵
Canvas.prototype.reTrans = function (scaleX, scaleY, rotateX, rotateY, actX, actY) {
    this.check();
    this.C.setTransform(+scaleX * this.unit, +rotateX * this.unit, +rotateY * this.unit, +scaleY * this.unit, +actX * this.unit, +actY * this.unit)
};
//清除矩阵
Canvas.prototype.clearTrans = function () {
    this.check();
    this.C.setTransform(1, 0, 0, 1, 0, 0);
};

/**
 * 相对某一点旋转
 * @param point 围绕的哪个点坐标
 * @param deg 角度如果是180度就写180；
 */
Canvas.prototype.rotate = function (point, deg) {
    this.check();
    this.befor.point = point;
    this.befor.deg = deg;
    this.C.translate(+point[0] * this.unit, +point[1] * this.unit);
    var angleUnit = Math.PI / 180;
    this.C.rotate(+deg * angleUnit);
    this.C.translate(-point[0] * this.unit, -point[1] * this.unit);

};
/**
 * 相对某一点缩放
 * @param point
 * @param scaleW
 * @param scaleH
 */
Canvas.prototype.scale = function (point, scaleW, scaleH) {
    this.check();
    this.befor.point = point;
    this.befor.scale = [scaleW, scaleH];
    this.C.translate(+point[0] * this.unit, +point[1] * this.unit);
    this.C.scale(scaleW, scaleH);
    this.C.translate(-point[0] * this.unit, -point[1] * this.unit);
};
/**
 * 清除之前的缩放状态
 */
Canvas.prototype.clearScale = function () {

    this.check();
    this.C.translate(+this.befor.point[0] * this.unit, +this.befor.point[1] * this.unit);
    this.C.scale(0, 0);
    this.C.translate(-this.befor.point[0] * this.unit, -this.befor.point[1] * this.unit);
    this.befor.point = [0, 0];
    this.befor.scale = [0, 0];
};
/**
 * 清楚之前的旋转规则
 */
Canvas.prototype.clearRote = function () {

    this.check();
    this.C.translate(+this.befor.point[0] * this.unit, +this.befor.point[1] * this.unit);
    var angleUnit = Math.PI / 180;
    this.C.rotate(-this.befor.deg * angleUnit);
    this.C.translate(-this.befor.point[0] * this.unit, -this.befor.point[1] * this.unit);
    this.befor.point = [0, 0];
    this.befor.deg = 0;
};

/**
 * 清除整个画布
 */
Canvas.prototype.clearAll = function () {
    this.check();
    this.clearAlpha();
    this.clearFontStyle();
    this.clear
    this.clearPlaceRule();
    this.clearRote();
    this.clearScale();
    this.clearShadow();
    this.clearTrans();
    this.C.clearRect(0, 0, this.width * this.unit, this.height * this.unit);
};
/**
 * 清除指定方块区域
 * @param x
 * @param y
 * @param width
 * @param height
 */

Canvas.prototype.clear = function (x, y, width, height) {
    this.check();
    this.C.clearRect(+x, +y, +width * this.unit, +height * this.unit);
};
