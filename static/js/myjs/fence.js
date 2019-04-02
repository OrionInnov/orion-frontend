
var CanvasExt = {
  drawRect:function(canvasId,penColor,strokeWidth){
    var that = this;
    var width = 0;
    var height = 0;
    that.penColor = penColor;
    that.penWidth = strokeWidth;

    var canvas = document.getElementById(canvasId);
    //canvas 的矩形框
    var canvasRect;
    //矩形框的左上角坐标
    var canvasLeft;
    var canvasTop;

    var layerIndex = 0;
    var layerName = "layer";
    var x = 0;
    var y = 0;

    //鼠标点击按下事件，画图准备
    canvas.onmousedown = function(e) {
      canvasRect = canvas.getBoundingClientRect();
      //矩形框的左上角坐标
      canvasLeft = canvasRect.left;
      canvasTop = canvasRect.top;
      //设置画笔颜色和宽度
      var color = that.penColor;
      var penWidth = that.penWidth;
      $("#"+canvasId).clearCanvas();

      x = e.clientX-canvasLeft;
      y = e.clientY-canvasTop;

      $("#"+canvasId).addLayer({
        type: 'rectangle',
        strokeStyle: color,
        strokeWidth: penWidth,
        name:"point",
        fromCenter: false,
        x: x, y: y,
        width: 1,
        height: 1
      });

      $("#"+canvasId).drawLayers();
      $("#"+canvasId).saveCanvas();
      //鼠标移动事件，画图
      canvas.onmousemove = function(e) {
        $("#"+canvasId).removeLayer(layerName).drawLayers();
        $("#"+canvasId).removeLayer("point").drawLayers();
        layerIndex++;
        layerName = "layer" + layerIndex;
        width = e.clientX-canvasLeft-x;
        height = e.clientY-canvasTop-y;
        that.x = x;
        that.y = y;

        $("#"+canvasId).addLayer({
          type: 'rectangle',
          strokeStyle: color,
          strokeWidth: penWidth,
          name:layerName,
          fromCenter: false,
          x: x, y: y,
          width: width,
          height: height
        });

        $("#"+canvasId).drawLayers();
        that.enble = true;

      }
    };

    canvas.onmouseup = function(e) {
      var color = that.penColor;
      var penWidth = that.penWidth;
      $("#"+canvasId).removeLayer("point").drawLayers();
      canvas.onmousemove = null;
      width = e.clientX-canvasLeft-x;
      height = e.clientY-canvasTop-y;

      $("#"+canvasId).addLayer({
        type: 'rectangle',
        strokeStyle: color,
        strokeWidth: penWidth,
        name: layerName,
        fromCenter: false,
        x: x, y: y,
        width: width,
        height: height
      });

      $("#"+canvasId).drawLayers();
      $("#"+canvasId).saveCanvas();
      that.width = (width === 0) ? that.width : width;
      that.height = (height === 0) ? that.height : height;
    }
  }
};

drawPen();
function drawPen() {
  var color = "blue";
  var width = 3;
  CanvasExt.drawRect("myCanvas4",color,width);
  document.onmouseup = function(e) {
    //console.log(CanvasExt.x);
    //console.log(CanvasExt.y);
  }
}
