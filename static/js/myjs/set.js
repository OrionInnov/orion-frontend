/**
 * @fileoverview Description of file, its uses and information about its
 * dependencies.
 */

var configSet, calibrationC = [[NaN, NaN], [NaN, NaN]];
(function() {
  var canvasSizeWidth = "840", canvasSizeHeight = "840",
      canvasSize0 = document.getElementById("canvasSet");
      canvasSize1 = document.getElementById("canvasPoint"),
      canvasSize2 = document.getElementById("canvas"),
      canvasSize3 = document.getElementById("canvas0"),
      canvasSize4 = document.getElementById("canvas1"),
      canvasSize5 = document.getElementById("canvas2"),
      canvasSize6 = document.getElementById("myCanvas0"),
      canvasSize7 = document.getElementById("myCanvas1"),
      canvasSize8 = document.getElementById("myCanvas2"),
      canvasSize9 = document.getElementById("myCanvas3");
  canvasSize0.width = canvasSizeWidth;
  canvasSize0.height = canvasSizeHeight;
  canvasSize1.width = canvasSizeWidth;
  canvasSize1.height = canvasSizeHeight;
  canvasSize2.width = canvasSizeWidth;
  canvasSize2.height = canvasSizeHeight;
  canvasSize3.width = canvasSizeWidth;
  canvasSize3.height = canvasSizeHeight;
  canvasSize4.width = canvasSizeWidth;
  canvasSize4.height = canvasSizeHeight;
  canvasSize5.width = canvasSizeWidth;
  canvasSize5.height = canvasSizeHeight;
  canvasSize6.width = canvasSizeWidth;
  canvasSize6.height = canvasSizeHeight;
  canvasSize7.width = canvasSizeWidth;
  canvasSize7.height = canvasSizeHeight;
  canvasSize8.width = canvasSizeWidth;
  canvasSize8.height = canvasSizeHeight;
  canvasSize9.width = canvasSizeWidth;
  canvasSize9.height = canvasSizeHeight;
})();

function getTagNameset() {
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/getconf",
    //url: "http://192.168.100.6:8000/_config",
    dataType: "json",
    //async: false,
    success: function(result) {
      console.log(result);
      configSet = result;
      var tagNames = result.tags;
      calibrationC = configSet.system.calib;
      canvasInit();
      for (var i = 0; i < tagNames.length; i++) {
        $("#selectI").append(function() {
          return "<option value='" + tagNames[i].name + "' class='selecta'>" + tagNames[i].name + "</option>";
        });
        $("#selectAdd").append(function() {
          return "<input id='tag" + i + "' type='checkbox' class='selecta' style='white-space: nowrap'>" + tagNames[i].name + "<br/>";
        });
      }
    },
    error: function(result) {
      //console.log("");
    }
  });
}
getTagNameset();
function changeTagName() {
  $("#confirmN").on ("click", function() {
    //console.log(configSet);
    var tagNames = configSet.tags,
        tagName = $("#selectI").val(),
        name  = $("#nameT").val();
    for (var i = 0; i < tagNames.length; i++) {
      if (tagNames[i].name == tagName) {
        tagNames[i].name = name;
        $.ajax ({
          type: "POST",
          url: "http://localhost:8000/setconf",
            contentType:'application/json;charset=UTF-8',
          //url: "http://192.168.100.6:8000/_config",
          dataType: "json",
          //async: false,
          data: JSON.stringify(configSet),
          success: function() {
            console.log(configSet);
            $("#selectI").empty();
            $("#selectAdd").empty();
            for (var i = 0; i < tagNames.length; i++) {
              $("#selectI").append(function() {
                return "<option value='" + tagNames[i].name + "' class='selecta'>" + tagNames[i].name + "</option>";
              });
              $("#selectAdd").append(function() {
                return "<input id='tag" + i + "' type='checkbox' class='selecta'>" + tagNames[i].name + "<br/>";
              });
            }
            //console.log("");
          },
          error: function(result) {
            //console.log("");
          }
        });
      }
    }
  });
}
changeTagName();
function drawBackground1() {
  var c0 = $("#canvasSet");
  var ctx0 = c0.get(0).getContext("2d"),
      myBackground = new Image();
  myBackground.src = POSITION_IMG_URL;
  myBackground.onload = function() {
    ctx0.drawImage(myBackground, 0, 0, 840, 840);
  };
}
drawBackground1();
function drawPoint() {
  var c1 = $("#canvasPoint"),
      x1, y1, x2, y2, xa1, ya1, xa2, ya2;
  var ctx = c1.get(0).getContext("2d");
  ctx.strokeStyle = "#F00";
  ctx.fillStyle = "#F00";
  ctx.lineWidth = 3;
  c1.get(0).onmousedown = function(event) {
    ctx.clearRect(0, 0, 840, 840);
    var pos = windowToCanvasJq(c1, event.clientX, event.clientY);
    var x = pos.x,
        y = pos.y;
    $("#confirmP1").on ("click", function() {
      x1 = x;
      y1 = y;
      xa1 = $("#xA").val();
      ya1 = $("#yA").val();
    });
    $("#confirmP2").on ("click", function() {
      x2 = x;
      y2 = y;
      xa2 = $("#xA").val();
      ya2 = $("#yA").val();
    });
    ctx.beginPath();
    ctx.moveTo(x - 20, y);
    ctx.lineTo(x + 20, y);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - 20);
    ctx.lineTo(x, y + 20);
    ctx.closePath();
    ctx.stroke();
    ctx.font = "bold 16px Arial"
    if (calibrationC == undefined) {
      ctx.fillText("(x , y)", x + 20, y - 20);
    } else {
      var x00 = Math.round(((x - calibrationC[1][0]) / calibrationC[0][0]) * 1000) / 1000,
          y00 = Math.round(((y - calibrationC[1][1]) / calibrationC[0][1]) * 1000) / 1000;
      ctx.fillText("(" + x00 + " , " + y00 + ")", x + 20, y - 20);
    }
  };
  $("#confirmF").get(0).onmousedown = function() {
    if (x1 == x2 || y1 == y2 || xa1 == xa2 || ya1 == ya2) {
      if ($("#inputNameEn").html() == "输入姓名") {
        alert("错误：参照点坐标值相同，无法校准坐标！");
      } else {
        alert("Error：the coordinate value of reference points are equal!");
      }
      return false;
    }
    var xScale = (x2 - x1)/(xa2 - xa1),
        yScale = (y2 - y1)/(ya2 - ya1);
    var x0 = x1 - xa1 * xScale,
        y0 = y1 - ya1 * yScale;
    calibrationC = [[xScale, yScale], [x0, y0]];
    console.log(calibrationC[0][0]);
    console.log(calibrationC[0][1]);
    console.log(calibrationC[1][0]);
    console.log(calibrationC[1][1]);
    configSet.system.calib = calibrationC;
    $.ajax ({
      type: "POST",
      url: "http://localhost:8000/setconf",
      //url: "http://192.168.100.6:8000/_config",
      dataType: "json",
      //async: false,
      data: JSON.stringify(configSet),
      success: function(result) {
        canvasInit();
        //console.log("");
      },
      error: function(result) {
        //console.log("");
      }
    });
  };
}
drawPoint();
function windowToCanvasJq(canvas,x,y) {
  var bbox = canvas.get(0).getBoundingClientRect();
  return {
    x:x - bbox.left - (bbox.width - canvas.get(0).offsetWidth) / 2,
    y:y - bbox.top - (bbox.height - canvas.get(0).offsetHeight) / 2
  };
}
