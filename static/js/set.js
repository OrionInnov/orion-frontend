var configSet;
function getTagNameset() {
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_config",
    //url: "http://192.168.100.6:8000/_config",
    dataType: "json",
    //async: false,
    success: function(result) {
      configSet = result;
      var num = result.num_tags;
      for (var i = 0; i < num; i++) {
        $("#selectI").append(function() {
          return "<option id='tag" + i + "' value='" + result.tag_names[i] + "' class='selecta'>" + result.tag_names[i] + "</option>";
        });
      };
    },
    error: function(result) {
      //console.log("fuck");
    }
  });
}
getTagNameset();
function changeTagName() {
  $("#confirmN").on ("click", function() {
    var tagName = $("#selectI").val();
    var name  = $("#nameT").val();
    for (var i = 0; i < configSet.tag_names.length; i++) {
      if (configSet.tag_names[i] == tagName) {
        configSet.tag_names[i] = name;
        //configSet = JSON.stringify(configSet);
        //configSet = JSON.parse(configSet);
        console.log(configSet);
        $.ajax ({
          type: "POST",
          url: "http://localhost:8000/set_config",
          //url: "http://192.168.100.6:8000/_config",
          dataType: "json",
          //async: false,
          data: JSON.stringify(configSet),
          success: function(result) {
            console.log("niu bi");
          },
          error: function(result) {
            console.log("cao");
          }
        });
      };
    };
  });
}
changeTagName();
function drawBackground1() {
  var myBackground = new Image();
  myBackground.src = "./uploads/position.jpg"
  var c0 = $("#canvasSet");
  var ctx0 = c0.get(0).getContext("2d");
  myBackground.onload = function() {
    ctx0.drawImage(myBackground, 0, 0, 1260, 840);
  };
}
drawBackground1();
function drawPoint() {
  var c1 = $("#canvasPoint");
  var ctx = c1.get(0).getContext("2d");
  var x1, y1, x2, y2, xa1, ya1, xa2, ya2;
  ctx.strokeStyle = "#F00";
  ctx.fillStyle = "#F00";
  ctx.lineWidth = 3;
  c1.get(0).onmousedown = function(event) {
    ctx.clearRect(0, 0, 1260, 840);
    var pos = windowToCanvas(c1, event.clientX, event.clientY);
    var x = pos.x;
    var y = pos.y;
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
    ctx.fillText("(x,y)", x + 20, y - 20);
  };
  $("#confirmF").get(0).onmousedown = function() {
    if (x1 == x2 || y1 == y2 || xa1 == xa2 || ya1 == ya2) {
      alert("错误：参照点坐标值相同，无法校准坐标！");
      return false;
    };
    var xScale = (x2 - x1)/(xa2 - xa1);
    var yScale = (y2 - y1)/(ya2 - ya1);
    var x0 = x1 - xa1 * xScale;
    var y0 = y1 - ya1 * yScale;
    console.log(xScale);
    console.log(yScale);
    console.log(x0);
    console.log(y0);//这4个值我要用到Global variables才能获取，还有如果提交到服务器，可以在Refresh后不用重新提交。
  };
}
drawPoint();
function windowToCanvas(canvas,x,y) {
  var bbox = canvas.get(0).getBoundingClientRect();
  return {
    x:x - bbox.left - (bbox.width - canvas.get(0).offsetWidth) / 2,
    y:y - bbox.top - (bbox.height - canvas.get(0).offsetHeight) / 2
  };
}
