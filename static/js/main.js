/**
 * @fileoverview Description of file, its uses and information about its
 * dependencies.
 */

var canvasZoom = document.getElementById("canvas");

var img1,//图片对象
  imgIsLoaded,//图片是否加载完成;
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
  drawImage0();
  drawImage1();
  drawImage2();
}

function windowToCanvas(canvasZoom,x,y) {
  var bbox = canvasZoom.getBoundingClientRect();
  return {
    x: x - bbox.left - (bbox.width - canvasZoom.offsetWidth) / 2,
    y: y - bbox.top - (bbox.height - canvasZoom.offsetHeight) / 2
  };
}

function int0() {
  var canvas0 = document.getElementById("canvas0");
  var context0 = canvas0.getContext("2d");
  return context0;
};
loadImg0();
function int1() {
  var canvas1 = document.getElementById("canvas1");
  var context1 = canvas1.getContext("2d");
  return context1;
};
loadImg1();
function int2() {
  var canvas2 = document.getElementById("canvas2");
  var context2 = canvas2.getContext("2d");
  return context2;
};
loadImg2();

function loadImg0() {
  img0 = new Image();
  img0.onload = function() {
    imgIsLoaded = true;
    drawImage0();
  };
  img0.src = dataURL0;
}
function loadImg1() {
  img1 = new Image();
  img1.onload = function() {
    imgIsLoaded = true;
    drawImage1();
  };
  img1.src = dataURL1;
}
function loadImg2() {
  img2 = new Image();
  img2.onload = function() {
    imgIsLoaded = true;
    drawImage2();
  };
  img2.src = dataURL2;
}

function scroll() {
  document.documentElement.style.overflow = "auto";
}

function drawImage0() {
  var context0 = int0();
  context0.clearRect(0, 0, canvasZoom.offsetWidth, canvasZoom.offsetWidth);
  context0.drawImage(img0, 0, 0, img0.width, img0.height, imgX, imgY, img0.width*imgScale, img0.height*imgScale);
}
function drawImage1() {
  var context1 = int1();
  context1.clearRect(0, 0, canvasZoom.offsetWidth, canvasZoom.offsetWidth);
  context1.drawImage(img1, 0, 0, img1.width, img1.height, imgX, imgY, img1.width*imgScale, img1.height*imgScale);
}
function drawImage2() {
  var context2 = int2();
  context2.clearRect(0, 0, canvasZoom.offsetWidth, canvasZoom.offsetWidth);
  context2.drawImage(img2, 0, 0, img2.width, img2.height, imgX, imgY, img2.width*imgScale, img2.height*imgScale);
}

canvasZoom.onmousedown = function(event) {
  scroll();
  var pos = windowToCanvas(canvasZoom, event.clientX, event.clientY);
  canvasZoom.onmousemove = function(event) {
    canvasZoom.style.cursor = "move";
    var pos0 = windowToCanvas(canvasZoom, event.clientX, event.clientY);
    var x = pos0.x - pos.x;
    var y = pos0.y - pos.y;
    pos = pos0;
    imgX += x;
    imgY += y;
    img1.src = dataURL1;
    img2.src = dataURL2;
    drawImage0();
    drawImage1();
    drawImage2();
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
  var pos = windowToCanvas(canvasZoom, event.clientX, event.clientY);
  event.wheelDelta = event.wheelDelta?event.wheelDelta:(event.deltaY*(-40));
  var imgScale0 = imgScale;
  var zoomNum = 100;
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
    };
    imgX = imgX * imgScale / imgScale0 - pos.x * (imgScale / imgScale0 - 1);
    imgY = imgY * imgScale / imgScale0 - pos.y * (imgScale / imgScale0 - 1);
  }else {
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
    };
    imgX = imgX * imgScale / imgScale0 - pos.x * (imgScale / imgScale0 - 1);
    imgY = imgY * imgScale / imgScale0 - pos.y * (imgScale / imgScale0 - 1);
  };
  img1.src = dataURL1;
  img2.src = dataURL2;
  drawImage0();
  drawImage1();
  drawImage2();
};
