/**
 * @fileoverview Description of file, its uses and information about its
 * dependencies.
 */

var canvasZoom = document.getElementById("canvas");

var img0 = new Image(),
    img1 = new Image(),
    img2 = new Image(),
    imgX = 0,
    imgY = 0,
    imgScale = 1;

function init() {
  imgX = 0;
  imgY = 0;
  imgScale = 1;
  img0.src = dataURL0;
  img1.src = dataURL1;
  img2.src = dataURL2;
  drawCanvas(img0, "canvas0");
  drawCanvas(img1, "canvas1");
  drawCanvas(img2, "canvas2");
}

function windowToCanvas(canvasZoom,x,y) {
  var bbox = canvasZoom.getBoundingClientRect();
  return {
    x: x - bbox.left - (bbox.width - canvasZoom.offsetWidth) / 2,
    y: y - bbox.top - (bbox.height - canvasZoom.offsetHeight) / 2
  };
}


(function() {
  img0.src = dataURL0;
  img1.src = dataURL1;
  img2.src = dataURL2;
  img0.onload = function() {
    drawCanvas(img0, "canvas0");
  };
  img1.onload = function() {
    drawCanvas(img1, "canvas1");
  };
  img2.onload = function() {
    drawCanvas(img2, "canvas2");
  };
})();

window.onmousedown = function() {
  document.documentElement.style.overflow = "auto";
};

function drawCanvas(img, canvasId) {
  var canvas = document.getElementById(canvasId);
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvasZoom.offsetWidth, canvasZoom.offsetWidth);
  context.drawImage(img, 0, 0, img.width, img.height, imgX, imgY, img.width*imgScale, img.height*imgScale);
}

canvasZoom.onmousedown = function(event) {
  var pos = windowToCanvas(canvasZoom, event.clientX, event.clientY);
  canvasZoom.onmousemove = function(event) {
    canvasZoom.style.cursor = "move";
    var pos0 = windowToCanvas(canvasZoom, event.clientX, event.clientY);
    var x = pos0.x - pos.x,
        y = pos0.y - pos.y;
    pos = pos0;
    imgX += x;
    imgY += y;
    img1.src = dataURL1;
    img2.src = dataURL2;
    drawCanvas(img0, "canvas0");
    drawCanvas(img1, "canvas1");
    drawCanvas(img2, "canvas2");
  };
  canvasZoom.onmouseup = function() {
    canvasZoom.onmousemove = null;
    canvasZoom.onmouseup = null;
    canvasZoom.style.cursor = "default";
  };
  //document.write(dataURL0);
};

canvasZoom.onmousewheel = canvasZoom.onwheel = function(event) {
  document.documentElement.style.overflow = "hidden";
  var pos = windowToCanvas(canvasZoom, event.clientX, event.clientY),
      imgScale0 = imgScale,
      zoomNum = 100;
  event.wheelDelta = event.wheelDelta?event.wheelDelta:(event.deltaY*(-40));
  if (event.wheelDelta > 0) {
    imgScale += 0.2;
    if (imgScale > 10.1) {
      imgScale = 10;
      zoomNum = Math.round(imgScale * 100);
      $("#zoomN").html(zoomNum + "%");
      return;
    } else {
      zoomNum = Math.round(imgScale * 100);
      $("#zoomN").html(zoomNum + "%");
    }
    imgX = imgX * imgScale / imgScale0 - pos.x * (imgScale / imgScale0 - 1);
    imgY = imgY * imgScale / imgScale0 - pos.y * (imgScale / imgScale0 - 1);
  } else {
    imgScale -= 0.2;
    $("#zoomN").html(imgScale);
    if (imgScale < 0.3) {
      imgScale = 0.4;
      zoomNum = Math.round(imgScale * 100);
      $("#zoomN").html(zoomNum + "%");
      return;
    } else {
      zoomNum = Math.round(imgScale * 100);
      $("#zoomN").html(zoomNum + "%");
    }
    imgX = imgX * imgScale / imgScale0 - pos.x * (imgScale / imgScale0 - 1);
    imgY = imgY * imgScale / imgScale0 - pos.y * (imgScale / imgScale0 - 1);
  }
  img1.src = dataURL1;
  img2.src = dataURL2;
  drawCanvas(img0, "canvas0");
  drawCanvas(img1, "canvas1");
  drawCanvas(img2, "canvas2");
};
