/*It's for index.jsp.
 *
 *
 *
 *
 */
//Page switch.
var home = $("#page-wrapper");
var fixP = $("#page-fixP");
var rollC = $("#page-rollC");
var homeB = $("#homeButton");
var fixB = $("#fixButton");
var rollB = $("#rollButton");
homeB.addClass("active-menu");
home.css("display", "block");
fixP.css("display", "none");
rollC.css("display", "none");

function jumpHomeP() {
  homeB.addClass("active-menu");
  fixB.removeClass("active-menu");
  rollB.removeClass("active-menu");
  home.css("display", "block");
  fixP.css("display", "none");
  rollC.css("display", "none");
}
function jumpFixP() {
  homeB.removeClass("active-menu");
  fixB.addClass("active-menu");
  rollB.removeClass("active-menu");
  home.css("display", "none");
  fixP.css("display", "block");
  rollC.css("display", "none");
}
function jumpRollC() {
  homeB.removeClass("active-menu");
  fixB.removeClass("active-menu");
  rollB.addClass("active-menu");
  home.css("display", "none");
  fixP.css("display", "none");
  rollC.css("display", "block");
}

//FixPosition and track switch.
var c0 = $("#myCanvas0");
var c1 = $("#myCanvas1");
var c2 = $("#myCanvas2");
var ca0 = $("#canvas0");
var ca1 = $("#canvas1");
var ca2 = $("#canvas2");
var overwrite1, overwrite2;
c0.css("display", "block");
c1.css("display", "none");
c2.css("display", "none");
ca0.css("display", "none");
ca1.css("display", "none");
ca2.css("display", "none");
function jumpC1() {
  c0.css("display", "block");
  c1.css("display", "block");
  c2.css("display", "none");
  scroll();
  stopOverwrite1();
  stopOverwrite2();
  //document.write(dataURL0);
}
function jumpC2() {
  c0.css("display", "block");
  c1.css("display", "none");
  c2.css("display", "block");
  scroll();
  stopOverwrite1();
  stopOverwrite2();
  //document.write(dataURL1);
}
function zoomC1() {
  c0.css("display", "none");
  c1.css("display", "none");
  c2.css("display", "none");
  ca0.css("display", "block");
  ca1.css("display", "block");
  ca2.css("display", "none");
  scroll();
}
function zoomC2() {
  c0.css("display", "none");
  c1.css("display", "none");
  c2.css("display", "none");
  ca0.css("display", "block");
  ca1.css("display", "none");
  ca2.css("display", "block");
  scroll();
}

function getPosition() {
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_positions",
    dataType:"json",
    //async: false,
    success: function(result){
      positionX1 = result[0][0];
      positionY1 = result[0][1];
      positionX2 = result[1][0];
      positionY2 = result[1][1];
      positionX3 = result[2][0];
      positionY3 = result[2][1];
      positionX4 = result[3][0];
      positionY4 = result[3][1];
      positionX5 = result[4][0];
      positionY5 = result[4][1];
      positionX6 = result[5][0];
      positionY6 = result[5][1];
      positionX7 = result[6][0];
      positionY7 = result[6][1];
      positionX8 = result[7][0];
      positionY8 = result[7][1];
      positionX9 = result[8][0];
      positionY9 = result[8][1];
      positionX10 = result[9][0];
      positionY10 = result[9][1];
      positionX1 = parseFloat(positionX1);
      positionY1 = parseFloat(positionY1);
      positionX2 = parseFloat(positionX2);
      positionY2 = parseFloat(positionY2);
      positionX3 = parseFloat(positionX3);
      positionY3 = parseFloat(positionY3);
      positionX4 = parseFloat(positionX4);
      positionY4 = parseFloat(positionY4);
      positionX5 = parseFloat(positionX5);
      positionY5 = parseFloat(positionY5);
      positionX6 = parseFloat(positionX6);
      positionY6 = parseFloat(positionY6);
      positionX7 = parseFloat(positionX7);
      positionY7 = parseFloat(positionY7);
      positionX8 = parseFloat(positionX8);
      positionY8 = parseFloat(positionY8);
      positionX9 = parseFloat(positionX9);
      positionY9 = parseFloat(positionY9);
      positionX10 = parseFloat(positionX10);
      positionY10 = parseFloat(positionY10);
    },
    error: function(result) {
      console.log("fuck");
    }
  });
};
var positionX1, positionY1;

//Fix position.
var myBackground = new Image();
myBackground.src = "./img/position.jpg"
var c0 = $("#myCanvas0");
var ctx0 = c0.get(0).getContext("2d");
myBackground.onload = function() {
  ctx0.drawImage(myBackground, 0, 0, 1260, 840);
  dataURL0 = c0.get(0).toDataURL();
};
dataURL0 = c0.get(0).toDataURL();
dataURL1 = "data:image/png;base64,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0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQkSURBVHja7NUxAQAACMMwwL/ncSCCJ5HQp52kAIAzEgCAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQIAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAIAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAgDGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCAAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYowQAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAHxYAAAA//8DACeyBaXBKRvcAAAAAElFTkSuQmCC"
dataURL2 = "data:image/png;base64,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0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQkSURBVHja7NUxAQAACMMwwL/ncSCCJ5HQp52kAIAzEgCAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQIAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAIAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAgDGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCAAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYowQAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAHxYAAAA//8DACeyBaXBKRvcAAAAAElFTkSuQmCC"
function fixPositionF(){
  function fixPosition() {
    getPosition();
    x1 = positionX1 - 12.5;
    y1 = positionY1 - 12.5;
    x2 = positionX2 - 12.5;
    y2 = positionY2 - 12.5;
    x3 = positionX3 - 12.5;
    y3 = positionY3 - 12.5;
    x4 = positionX4 - 12.5;
    y4 = positionY4 - 12.5;
    x5 = positionX5 - 12.5;
    y5 = positionY5 - 12.5;
    x6 = positionX6 - 12.5;
    y6 = positionY6 - 12.5;
    x7 = positionX7 - 12.5;
    y7 = positionY7 - 12.5;
    x8 = positionX8 - 12.5;
    y8 = positionY8 - 12.5;
    x9 = positionX9 - 12.5;
    y9 = positionY9 - 12.5;
    x10 = positionX10 - 12.5;
    y10 = positionY10 - 12.5;
    var myImage = new Image();
    myImage.src = "./img/locationMarker.png"
    var c1 = $("#myCanvas1");
    var ctx = c1.get(0).getContext("2d");
    //ctx.globalCompositeOperation = "copy";
    myImage.onload = function() {
      ctx.drawImage(myImage, x1, y1, 25, 25);
      ctx.drawImage(myImage, x2, y2, 25, 25);
      ctx.drawImage(myImage, x3, y3, 25, 25);
      ctx.drawImage(myImage, x4, y4, 25, 25);
      ctx.drawImage(myImage, x5, y5, 25, 25);
      ctx.drawImage(myImage, x6, y6, 25, 25);
      ctx.drawImage(myImage, x7, y7, 25, 25);
      ctx.drawImage(myImage, x8, y8, 25, 25);
      ctx.drawImage(myImage, x9, y9, 25, 25);
      ctx.drawImage(myImage, x10, y10, 25, 25);
    };
    function canvasClear() {
  	  ctx.clearRect(0, 0, 1260, 840);
    }
  var clear = setTimeout(canvasClear, 1000);
  dataURL1 = c1.get(0).toDataURL();
  }
  overwrite1 = setInterval(fixPosition, 1000);
}

//Track.
function track() {
  getPosition();
  var a,b,c,d;
  a = positionX1;
  b = positionY1;
  c = positionX1;
  d = positionY1;
  c2 = $("#myCanvas2");
  var ctx = c2.get(0).getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#F00";
  function point1() {
    getPosition();
    a = positionX1;
    b = positionY1;
    ctx.beginPath();
    ctx.moveTo(c, d);
    ctx.lineTo(a, b);
    ctx.closePath();
    ctx.stroke();
  }
  function point2() {
    getPosition();
    c = positionX1;
    d = positionY1;
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.closePath();
    ctx.stroke();
  }
  function delay() {
    var p1 = setTimeout(point1, 500);
    var p2 = setTimeout(point2, 500);
    dataURL2 = c2.get(0).toDataURL();
  }
  overwrite2 = setInterval(delay, 1000);
}

//stop cycle
function stopOverwrite1() {
  clearInterval(overwrite1);
}
function stopOverwrite2() {
  clearInterval(overwrite2);
}
