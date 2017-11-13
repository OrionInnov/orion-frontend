/*It's for index.jsp.
 *
 *
 *
 *
 */
//Page switch.
var overwrite1, overwrite2;
function pageDefine() {
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
  return [home, fixP, rollC, homeB, fixB, rollB];
}
pageDefine();

function jumpHomeP() {
  var pageD = pageDefine();
  var home = pageD[0];
  var fixP = pageD[1];
  var rollC = pageD[2];
  var homeB = pageD[3];
  var fixB = pageD[4];
  var rollB = pageD[5];
  homeB.addClass("active-menu");
  fixB.removeClass("active-menu");
  rollB.removeClass("active-menu");
  home.css("display", "block");
  fixP.css("display", "none");
  rollC.css("display", "none");
}
function jumpFixP() {
  var pageD = pageDefine();
  var home = pageD[0];
  var fixP = pageD[1];
  var rollC = pageD[2];
  var homeB = pageD[3];
  var fixB = pageD[4];
  var rollB = pageD[5];
  homeB.removeClass("active-menu");
  fixB.addClass("active-menu");
  rollB.removeClass("active-menu");
  home.css("display", "none");
  fixP.css("display", "block");
  rollC.css("display", "none");
}
function jumpRollC() {
  var pageD = pageDefine();
  var home = pageD[0];
  var fixP = pageD[1];
  var rollC = pageD[2];
  var homeB = pageD[3];
  var fixB = pageD[4];
  var rollB = pageD[5];
  homeB.removeClass("active-menu");
  fixB.removeClass("active-menu");
  rollB.addClass("active-menu");
  home.css("display", "none");
  fixP.css("display", "none");
  rollC.css("display", "block");
}

//FixPosition and track switch.
function canvasDefine() {
  var c0 = $("#myCanvas0");
  var c1 = $("#myCanvas1");
  var c2 = $("#myCanvas2");
  var ca0 = $("#canvas0");
  var ca1 = $("#canvas1");
  var ca2 = $("#canvas2");
  c0.css("display", "block");
  c1.css("display", "none");
  c2.css("display", "none");
  ca0.css("display", "none");
  ca1.css("display", "none");
  ca2.css("display", "none");
  return [c0, c1, c2, ca0, ca1, ca2];
}
function jumpC1() {
  var canvasD = canvasDefine();
  var c0 = canvasD[0];
  var c1 = canvasD[1];
  var c2 = canvasD[2];
  c0.css("display", "block");
  c1.css("display", "block");
  c2.css("display", "none");
  scroll();
  stopOverwrite1();
  stopOverwrite2();
  //document.write(dataURL0);
}
function jumpC2() {
  var canvasD = canvasDefine();
  var c0 = canvasD[0];
  var c1 = canvasD[1];
  var c2 = canvasD[2];
  c0.css("display", "block");
  c1.css("display", "none");
  c2.css("display", "block");
  scroll();
  stopOverwrite1();
  stopOverwrite2();
  //document.write(dataURL1);
}
function zoomC1() {
  var canvasD = canvasDefine();
  var c0 = canvasD[0];
  var c1 = canvasD[1];
  var c2 = canvasD[2];
  var ca0 = canvasD[3];
  var ca1 = canvasD[4];
  var ca2 = canvasD[5];
  c0.css("display", "none");
  c1.css("display", "none");
  c2.css("display", "none");
  ca0.css("display", "block");
  ca1.css("display", "block");
  ca2.css("display", "none");
  scroll();
}
function zoomC2() {
  var canvasD = canvasDefine();
  var c0 = canvasD[0];
  var c1 = canvasD[1];
  var c2 = canvasD[2];
  var ca0 = canvasD[3];
  var ca1 = canvasD[4];
  var ca2 = canvasD[5];
  c0.css("display", "none");
  c1.css("display", "none");
  c2.css("display", "none");
  ca0.css("display", "block");
  ca1.css("display", "none");
  ca2.css("display", "block");
  scroll();
}

function getPosition() {
  var positions, i, j;
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_positions",
    //url: "http://192.168.100.6:8000/_positions",
    dataType:"json",
    async: false,
    success: function(result){
      positions = result;
      for (i = 0; i < numTags; i++) {
        for (j = 0; j < 2; j++) {
          positions[i][j] = parseFloat(positions[i][j]);
        };
      };
    },
    error: function(result) {
      //console.log("fuck");
    }
  });
  return positions;
}
var numTags;//This Global variables is to request date only once.
function getNum_tags() {
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_config",
    //url: "http://192.168.100.6:8000/_positions",
    dataType:"json",
    async: false,
    success: function(result){
      numTags = result.num_tags;
      //console.log(numTags);
    },
    error: function(result) {
      //console.log("fuck");
    }
  });
  //console.log(numTags);
}
getNum_tags();

//Fix position.
var dataURL0;
function drawBackground() {
  var myBackground = new Image();
  myBackground.src = "./img/position.jpg"
  var c0 = $("#myCanvas0");
  var ctx0 = c0.get(0).getContext("2d");
  myBackground.onload = function() {
    ctx0.drawImage(myBackground, 0, 0, 1260, 840);
    dataURL0 = c0.get(0).toDataURL();
  };
}
drawBackground();
dataURL1 = "data:image/png;base64,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0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQkSURBVHja7NUxAQAACMMwwL/ncSCCJ5HQp52kAIAzEgCAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQIAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAIAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAgDGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCAAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYowQAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAHxYAAAA//8DACeyBaXBKRvcAAAAAElFTkSuQmCC"
dataURL2 = "data:image/png;base64,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0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAQkSURBVHja7NUxAQAACMMwwL/ncSCCJ5HQp52kAIAzEgCAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQKAMQIAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAxggAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAGCMAIAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAoAxAgDGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCADGCAAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYowQAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAYIwAgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECgDECAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIAMYIABgjABgjABgjABgjABgjABgjABgjABgjABgjABgjAHxYAAAA//8DACeyBaXBKRvcAAAAAElFTkSuQmCC"

function fixPositionF() {
  var pauseStatus = true;
  var c1 = $("#myCanvas1");
  var ctx = c1.get(0).getContext("2d");
  ctx.clearRect(0, 0, 1260, 840);
  function fixPosition() {
    var x, y, k, i, j;
    var positions = getPosition();
    //console.log(numTags);
    x = new Array();
    y = new Array();
    x[49] = 0;
    y[49] = 0;
    for (k = 0; k < numTags; k++) {
      x[k] = positions[k][0] - 12.5;
      y[k] = positions[k][1] - 12.5;
    };
    var myImage = new Image();
    myImage.src = "./img/locationMarker.png";
    //ctx.globalCompositeOperation = "copy";
    myImage.onload = function() {
      var i;
      for (i = 0; i < 10; i++) {
        ctx.drawImage(myImage, x[i], y[i], 25, 25);
      };
    };
    function canvasClear() {
      dataURL1 = c1.get(0).toDataURL();
      ctx.clearRect(0, 0, 1260, 840);
    }
    if (pauseStatus == true) {
      var clear = setTimeout(canvasClear, 950);
    } else {
      stopOverwrite1();
    };
  }
  $("#pauseB").click (function() {
    pauseStatus = false;
  });
  overwrite1 = setInterval(fixPosition, 1000);
}

//Track.
function track() {
  var positions = getPosition()
  var a,b,c,d;
  a = positions[0][0];
  b = positions[0][1];
  c = a
  d = b
  c2 = $("#myCanvas2");
  var ctx = c2.get(0).getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#F00";
  function point1() {
    var positions1 = getPosition()
    a = positions1[0][0];
    b = positions1[0][1];
    ctx.beginPath();
    ctx.moveTo(c, d);
    ctx.lineTo(a, b);
    ctx.closePath();
    ctx.stroke();
  }
  function point2() {
    var positions2 = getPosition()
    c = positions2[0][0];
    d = positions2[0][1];
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(c, d);
    ctx.closePath();
    ctx.stroke();
  }
  function delay() {
    var p1 = setTimeout(point1, 0);
    var p2 = setTimeout(point2, 1500);
    dataURL2 = c2.get(0).toDataURL();
  }
  overwrite2 = setInterval(delay, 3000);
}

//stop cycle
function stopOverwrite1() {
  clearInterval(overwrite1);
}
function stopOverwrite2() {
  clearInterval(overwrite2);
}
