# j-canvas-animate
##完全自制不保证其兼容性，性能，和bug的量

##文件夹规划
./-------------------------

-------|demo:实例文件目录

-------|main：两个库的所在

./-------------------------
##绘画库为J.canvas.js
###api：
Canvas类：
```js
//四个参数分别对应已经存在的canvas的id，希望画布的宽度（最终会乘以单位得到最终宽度）
//希望画布的高度（最终会乘以单位得到最终高度，单位（一般为1，但是希望其自适应时应当
// 根据屏幕大小设置此值（可能不太对因为没有对应好X方向和Y方向分别对应的））
var theCanvas=new Canvas(elID, width, height, unitPic);
```
Canvas类内部方法：
check();
```js
//已经声明了实例theCanvas
/**
* 检测canvas是否可用
* return true （可用） false （不可用）
*/
theCanvas.check();
```
reStrokeStyle（color, width）
```js
//已经声明了实例theCanvas
/**
* 重置笔画颜色和宽度
*/
theCanvas.reStrokeStyle('#f0f',5);
```
reLineStyle（lineCap, lineJoin, miterLimit）
```js
/**
* 重置线条顶点与焦点信息
* 可能参数
* （butt，round，square）
* （miter，round，bevel）
* {number}
*/
theCanvas.reLineStyle('butt','miter',10)
```
reShadow(color, blur, X, Y)
```js
/**
 * 重置阴影信息
 * @param color 颜色值
 * @param blur 模糊值
 * @param X X轴偏移
 * @param Y Y轴偏移
 */
theCanvas.reShadow('#f0f',10,10)
```
clearShadow();
```js
/**
 * 清除阴影信息
 */
theCanvas.reShadow('#f0f',10,10)
```
reFillStyle(color);
   ```js
   /**
    * 重置填充信息
    * @param color
    */
   theCanvas.reFillStyle('#f0f')
   ```
   reFontStyle(fontCssStyle, textAlign, textBaseline);
   ```js
   /**
    * 设置文本格式
    * @param fontCssStyle
    * @param textAlign
    * @param textBaseline
    */
   theCanvas.reFontStyle('10px 微软雅黑','left','top');
   ```
  clearFontStyle();
   ```js
   /**
    * 初始化文字格式
    */
   theCanvas.clearFontStyle();
   ```  
drawLine(d1, d2);
```js
/**
 * 绘制一条线
 * @param  d1 起始点
 * @param d2 终点
 */
theCanvas.drawLine([100,100],[200,200]);
```
   
draw2BSR(startPoint, endPoint, controlPointer, openEndPath, openStroke, openFill);
```js
/**
 * 二次贝塞尔曲线
 * @param startPoint [array] 起始点
 * @param endPoint 结束点
 * @param controlPointer 控制点
 * @param openEndPath 是否首尾闭合
 * @param openStroke 是否描边
 * @param openFill 是否填充颜色
 */
theCanvas.draw2BSR([100,100],[200,200],[150,0],1,1,1);
```
draw3BSR(startPoint, endPoint, controlPointer1, controlPointer2, openEndPath, openStroke, openFill);
```js
/**
 * 绘制三次贝塞尔曲线
 * @param startPoint 起始点
 * @param endPoint 结束点
 * @param controlPointer1 控制点1
 * @param controlPointer2 控制点2
 * @param openEndPath 是否首尾相连
 * @param openStroke 是否描边
 * @param openFill 是否填充颜色
 */
theCanvas.draw3BSR([100,100],[200,200],[150,0],[300,10],1,1,1);
```
drawCircle(x, y, r, openStroke, openFill);
```js
/**
 * 绘制一个圆
 * @param x 圆心的x
 * @param y 圆心的y
 * @param r 圆的半径
 * @param openStroke 是否描边
 * @param openFill 是否填充颜色
 */
theCanvas.drawCircle(100,100,100,1,1);
```
drawArc(x, y, r, start, end, openEnd, openStroke, openFill);
```js
/**
 * 绘制一条圆弧
 * @param x 圆弧的圆心 x
 * @param y 圆弧的圆心 y
 * @param r 圆弧的半径
 * @param start 开始角度 （π）
 * @param end 结束角度 （π）
 * @param openEnd 是否首尾相连
 * @param openStroke 是否描边
 * @param openFill 是否填充颜色
 */
theCanvas.drawCircle(100,100,100,1,2,1,1,1);
```
drawRect(point, width, height, openStroke, openFill);
```js
/**
 * 绘制一个矩形
 * @param point 起始点
 * @param width 矩形宽度
 * @param height 矩形高度
 * @param openStroke 是否描边
 * @param openFill 是否填充
 */
theCanvas.drawRect([100,100],100,100,1,1);
```
drawTriangle(d1, d2, d3, openStroke, openFill);
```js
/**
 * 绘制三角形
 * @param d1 三角形顶点1
 * @param d2 三角形顶点2
 * @param d3 三角形顶点3
 * @param openStroke 是否描边
 * @param openFill 是否填充
 */
theCanvas.drawTriangle([100,100],[200,200],[200,100],1,1);
```
drawSquare(d1, d2, d3, d4, openStroke, openFill);
```js
/**
 * 绘制四边形
 * @param d1 顶点1
 * @param d2 顶点2
 * @param d3 顶点3
 * @param d4 顶点4
 * @param openStroke 是否描边
 * @param openFill 是否填充
 */
theCanvas.drawSquare([100,100],[200,200],[200,100][300,700],1,1);
```
drawPolygon(points, openStroke, openFill);
```js
/**
 * 绘制多边形
 * @param points 格式[[1,2],[4,5],[6.7]]
 * @param openStroke 是否首位相连
 * @param openFill 是否填充
 */
theCanvas.drawSquare([[1,2],[4,5],[6.7]],1,1);
```
drawText(text, point, maxWidth, openStroke, openFill);
```js
/**
 * 绘制文本，要么返回文本的大小，要么返回false（false是没绘制成功）（但是文本大小也不代表绘制成功了）
 * @param text 文本内容
 * @param point 绘制起始点
 * @param maxWidth 最大宽度
 * @param openStroke 是否描边
 * @param openFill 是否填充
 * @returns {*}
 */
theCanvas.drawText('jijuxie',[0,0],100,1,1);
```
drawText(text, point, maxWidth, openStroke, openFill);
```js
/**
 * 在canvas里面放置一张图片
 * @param urlOrImg 图片地址
 * @param point 放置起始点
 * @param slidePoint 剪切起始点
 * @param slideWidth 剪切宽度
 * @param slideHeight 剪切高度
 * @param width 设置图片大小宽度
 * @param height 设置图片大小高度
 * @returns {*} 因为有异步存在所以 return只是个摆设
 */
theCanvas.drawImg('jijuxie.jpg',[0,0],[100,100],100,100,200,100);
```
getImgDate(text, point, maxWidth, openStroke, openFill);
```js
/**
 *截取canvas上某块图片获取imgdata
 * @param point 起始点
 * @param wight 宽度
 * @param height 高度
 * @returns {ImageData}
 */
theCanvas.getImgDate([0,0],1000,1000);
```
putImageData(text, point, maxWidth, openStroke, openFill);
```js
/**
 *在canvas里放置imgdata的图片
 * @param imgData
 * @param Cpoint 
 * @param point
 * @param width
 * @param height
 */
theCanvas.putImageData(theImgData,[100,100],[200,200],100,100);
```
colorLinearGradient(point1, point2, action);
```js
/**
 * 生成线性渐变，可以当颜色值用
 * @param {Array} point1 [1,1]
 * @param {Array} point2 [2,2]
 * @param {Array} action
 * @returns {CanvasGradient}
 */
theCanvas.colorLinearGradient([100,100],[200,200],[[0,'#ff0'],[0.5,'#ff0'],[1,'#fff']]);
```
colorRadialGradient(arc1, arc2, action);
```js
/**
 * 放射状渐变 可以当颜色值用
 * @param arc1
 * @param arc2
 * @param action
 * @returns {CanvasGradient}
 */
theCanvas.colorRadialGradient([100,100,20],[200,200,500],[[0,'#ff0'],[0.5,'#ff0'],[1,'#fff']]);
```
交集系列api
```js
//保存当前状态
theCanvas.save();
//前面的图形与下面的元素产生交集呈现画面
theCanvas.clip();
//还原之前的状态（停止交集）
theCanvas.save();

```
replaceRule(rule);
```js
/**
 * 重写放置规则（先来的和后来的元素如何排布）
 * @param rule
 * 可能的规则
 * rule == 'source-over' || rule == 'source-atop' || rule == 'source-in' || rule == 'source-atop' || rule == 'source-out' || 
 * rule == 'destination-over' || rule == 'destination-atop' || rule == 'destination-in' || rule == 'destination-out' || rule == 'lighter' || rule == 'copy' || rule == 'xor'
 */
theCanvas.replaceRule('source-over');
```
replaceRule(rule);
```js
/**
 * 重写放置规则（先来的和后来的元素如何排布）
 * @param rule
 * 可能的规则
 * rule == 'source-over' || rule == 'source-atop' || rule == 'source-in' || rule == 'source-atop' || rule == 'source-out' || 
 * rule == 'destination-over' || rule == 'destination-atop' || rule == 'destination-in' || rule == 'destination-out' || rule == 'lighter' || rule == 'copy' || rule == 'xor'
 */
theCanvas.replaceRule('source-over');
```

clearPlaceRule();
```js
/**
 * 初始化放置规则
 */
theCanvas.clearPlaceRule();
```
reAlpha();
```js
/**
 * //设置绘图的整体透明度
 * @param alpha
 */
theCanvas.reAlpha(0.5);
```
clearAlpha();
```js
/**
 * //还原绘图的透明度到整体状态
 */
theCanvas.clearAlpha();
```
reTrans(scaleX, scaleY, rotateX, rotateY, actX, actY);
```js
/**
 * //使用矩阵
 * @param scaleX
 * @param scaleY
 * @param rotateX
 * @param rotateY
 * @param actX
 * @param actY
 */
theCanvas.reTrans(2,2,1,1,100,100);
```
clearTrans(scaleX, scaleY, rotateX, rotateY, actX, actY);
```js
//清除矩阵
theCanvas.clearTrans();
```
clearTrans(scaleX, scaleY, rotateX, rotateY, actX, actY);
```js
//清除矩阵
theCanvas.clearTrans();
```



