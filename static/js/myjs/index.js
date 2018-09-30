/**
 * @fileoverview Description of file, its uses and information about its
 * dependencies.
 */

var overwrite1, overwrite2;
(function() {
  var winw = parseInt($(window).width());
  $('.headPadding .box').css({'padding-left': 0, 'padding-right': 0, 'margin-left': 0});
  var navLi = $(".headPadding");
  navLi.mouseover(function () {
    $(this).find("a").addClass("current");
    $(this).find(".box").stop().slideDown(200);
  });
  navLi.mouseleave(function () {
    $(this).find("a").removeClass("current");
    $(this).find(".box").stop().slideUp(0);
  })
})();

function pageDefine() {
  $("#homeButton").addClass("active-menu");
  $("#page-wrapper").css("display", "block");
  $("#page-fixP").css("display", "none");
  $("#page-rollC").css("display", "none");
  $("#zoomN").css("display", "none");
  $("#page-set").css("display", "none");
  disableFixbutton();
}

pageDefine();

function jumpSetP() {
  $("#nav1").css("display", "none");
  $("#nav2").css("display", "none");
  $("#page-set").css("display", "block");
  $("#page-wrapper").css("display", "none");
  $("#page-fixP").css("display", "none");
  $("#page-rollC").css("display", "none");
  disableFixbutton();
}

function leaveSetP() {
  $("#nav1").css("display", "block");
  $("#nav2").css("display", "block");
  $("#page-set").css("display", "none");
  $("#page-wrapper").css("display", "block");
  $("#page-fixP").css("display", "none");
  $("#page-rollC").css("display", "none");
}

function jumpHomeP() {
  $("#homeButton").addClass("active-menu");
  $("#fixButton").removeClass("active-menu");
  $("#rollButton").removeClass("active-menu");
  $("#page-wrapper").css("display", "block");
  $("#page-fixP").css("display", "none");
  $("#page-rollC").css("display", "none");
  stopOverwrite1();
  stopOverwrite2();
  disableFixbutton();
}

function jumpFixP() {
  $("#homeButton").removeClass("active-menu");
  $("#fixButton").addClass("active-menu");
  $("#rollButton").removeClass("active-menu");
  $("#page-wrapper").css("display", "none");
  $("#page-fixP").css("display", "block");
  $("#page-rollC").css("display", "none");
  $("#page-set").css("display", "none");
  enbleFixbutton();
}

function jumpRollC() {
  $("#homeButton").removeClass("active-menu");
  $("#fixButton").removeClass("active-menu");
  $("#rollButton").addClass("active-menu");
  $("#page-wrapper").css("display", "none");
  $("#page-fixP").css("display", "none");
  $("#page-rollC").css("display", "block");
  disableFixbutton();
}

function enbleFixbutton() {
  $('#dropdownMenu2').css("display", "block");
  $('#dropdownMenu2a').css("display", "none");
}

function disableFixbutton() {
  $('#dropdownMenu2').css("display", "none");
  $('#dropdownMenu2a').css("display", "block");
}

//FixPosition and track switch.
function canvasDefine() {
  $("#myCanvas0").css("display", "block");
  $("#myCanvas1").css("display", "none");
  $("#myCanvas2").css("display", "none");
  $("#myCanvas3").css("display", "none");
  $("#canvas0").css("display", "none");
  $("#canvas1").css("display", "none");
  $("#canvas2").css("display", "none");
}

canvasDefine();

function jumpC(c1, c2, c3) {
  $("#myCanvas0").css("display", "block");
  $(c1).css("display", "block");
  $(c2).css("display", "none");
  $(c3).css("display", "none");
  $("#zoomN").css("display", "none");
  stopOverwrite1();
  stopOverwrite2();
}

function zoomC(c1, c2) {
  $("#myCanvas0").css("display", "none");
  $("#myCanvas1").css("display", "none");
  $("#myCanvas2").css("display", "none");
  $("#myCanvas3").css("display", "none");
  $("#canvas0").css("display", "block");
  $(c1).css("display", "block");
  $(c2).css("display", "none");
  $("#zoomN").css("display", "block");
}

function loadFile(file) {
  $("#fileName").html(file.name);
}

function getPosition() {
  var positions;
  $.ajax({
    type: "GET",
    url: "http://localhost:8000/positions",
    dataType: "json",
    async: false,
    success: function (result) {
      positions = result;
      for (var i = 0; i < positions.length; i++) {
        positions[i][0] = calibrationC[0][0] * parseFloat(positions[i][0]);
        positions[i][1] = calibrationC[0][1] * parseFloat(positions[i][1]);
      }
    },
    error: function (result) {
    }
  });
  return positions;
}

getPosition();

function uploadImg() {
  var form = new FormData($("#f1")[0]);
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/upload",
    data: form,
    cache: false,
    processData: false,
    contentType: false,
    success: function (result) {
        var imgBase64 = JSON.parse(result)
        POSITION_IMG_URL = imgBase64.img;
        drawBackground();
        drawBackground1();
    },
    error: function (result) {
    }
  });
}

//Fix position.
var dataURL0 = 0, dataURL1 = 0, dataURL2 = 0;
var myIndex = 0;
var pauseStatus = 0;

function drawBackground() {
  var myBackground = new Image(),
      c0 = $("#myCanvas0");
  var ctx0 = c0.get(0).getContext("2d");
  myBackground.src = POSITION_IMG_URL;
  myBackground.onload = function () {
    ctx0.drawImage(myBackground, 0, 0, 840, 840);
    dataURL0 = c0.get(0).toDataURL();
  };
}

drawBackground();

function canvasInit() {
  var c1 = $("#myCanvas1"),
      c2 = $("#myCanvas2"),
      c3 = $("#myCanvas3");
  var ctx1 = c1.get(0).getContext("2d"),
      ctx2 = c2.get(0).getContext("2d"),
      ctx3 = c3.get(0).getContext("2d");
  ctx1.save();
  ctx2.save();
  ctx3.save();
  ctx1.translate(calibrationC[1][0], calibrationC[1][1]);
  ctx2.translate(calibrationC[1][0], calibrationC[1][1]);
  ctx3.translate(calibrationC[1][0], calibrationC[1][1]);
}

function canvasRestore() {
  var c1 = $("#myCanvas1"),
      c2 = $("#myCanvas2"),
      c3 = $("#myCanvas3");
  var ctx1 = c1.get(0).getContext("2d"),
      ctx2 = c2.get(0).getContext("2d"),
      ctx3 = c3.get(0).getContext("2d");
  ctx1.restore();
  ctx2.restore();
  ctx3.restore();
}

function fixPositionF() {
  pauseStatus = 1;

  function fixPosition() {
    var c1 = $("#myCanvas1"),
        num = configSet.tags.length,
        myImage = new Image(),
        positions = getPosition(),
        x = [],
        y = [];
    var ctx = c1.get(0).getContext("2d");
    for (var k = 0; k < num; k++) {
      x[k] = positions[k][0] - 10;
      y[k] = positions[k][1] - 10;
    }
    myImage.src = MARKER_IMG_URL;
    ctx.fillStyle = "#00F";
    ctx.globalCompositeOperation = "copy";
    ctx.clearRect(-calibrationC[1][0], -calibrationC[1][1], 840, 840);
    myImage.onload = function () {
      ctx.globalCompositeOperation = "source-over";
      for (var i = 0; i < num; i++) {
        if (!(isNaN(x[i]) || isNaN(y[i]))) {
          (function () {
            if ($("#tag" + i).get(0).checked == true) {
              ctx.save();
              ctx.translate(x[i], y[i]);
              ctx.drawImage(myImage, 0, 0, 20, 20);
              if (myIndex === 0) {
                ctx.fillText(configSet.tags[i].name, 20, 0);
              } else if (myIndex === 90 || myIndex === -270) {
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(configSet.tags[i].name, 0, 0);
              } else if (myIndex === 180 || myIndex === -180) {
                ctx.rotate(Math.PI)
                ctx.fillText(configSet.tags[i].name, 0, -20);
              } else if (myIndex === 270 || myIndex === -90) {
                ctx.rotate(Math.PI / 2)
                ctx.fillText(configSet.tags[i].name, 20, -20);
              } else {
                console.log("错误");
              }
              ctx.restore();
            }
          })();
        }
      }
      dataURL1 = c1.get(0).toDataURL();
    };
    if (pauseStatus === 0) {
      stopOverwrite1();
    }
  }

  $("#pauseB").click(function () {
    pauseStatus = 0;
  });
  overwrite1 = setInterval(fixPosition, 500);
}

document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  var disFix = $("#myCanvas1").css("display");
  var disTrack = $("#myCanvas2").css("display");
  if (event.keyCode === 32) {
    event.preventDefault();
  }
  if (disFix === "block") {
    if (e && e.keyCode === 32) {
      if (pauseStatus === 0) {
        jumpC("#myCanvas1", "#myCanvas2", "#myCanvas3");
        fixPositionF();
      } else if (pauseStatus === 1) {
        pauseStatus = 0;
      };
    }
  }
  if (disTrack === "block") {
    if (e && e.keyCode === 32) {
      if (pauseStatus === 0) {
        jumpC("#myCanvas2", "#myCanvas1", "#myCanvas3");
        track();
      } else if (pauseStatus === 1) {
        pauseStatus = 0;
      };
    }
  }
};

//Track.
function track() {
  pauseStatus = 1;
  var a = [],
      b = [],
      c = [],
      d = [],
      num = configSet.tags.length,
      positions = getPosition(),
      c2 = $("#myCanvas2");
  var ctx = c2.get(0).getContext("2d");
  for (var j = 0; j < num; j++) {
    c[j] = positions[j][0];
    d[j] = positions[j][1];
  }
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#F00";
  ctx.clearRect(-calibrationC[1][0], -calibrationC[1][1], 840, 840);
  $("#multiple").on("click", function () {
    ctx.clearRect(-calibrationC[1][0], -calibrationC[1][0], 840, 840);
  });

  function point1() {
    var positions1 = getPosition();
    for (var i = 0; i < num; i++) {
      (function () {
        if ($("#tag" + i).get(0).checked == true) {
          a[i] = positions1[i][0];
          b[i] = positions1[i][1];
          drawTrack(ctx, c[i], d[i], a[i], b[i], 2, "#F00");
        }
      })();
    }
  }

  function point2() {
    var positions2 = getPosition();
    for (var i = 0; i < num; i++) {
      (function () {
        if ($("#tag" + i).get(0).checked == true) {
          c[i] = positions2[i][0];
          d[i] = positions2[i][1];
          drawTrack(ctx, a[i], b[i], c[i], d[i], 2, "#F00");
        }
      })();
    }
  }

  function delay() {
    var p1 = setTimeout(point1, 0),
        p2 = setTimeout(point2, 1000);
    $("#trackB").click(function () {
      clearTimeout(p1);
      clearTimeout(p2);
    });
    dataURL2 = c2.get(0).toDataURL();
    if (pauseStatus === 0) {
      stopOverwrite2();
    }
  }
  $("#pauseB").click(function () {
    pauseStatus = 0;
  });
  overwrite2 = setInterval(delay, 2000);
}


//myRotate
function myRotate() {
  $("#myImg").css("transform", "rotate(" + myIndex + "deg)");
}

//historyTrack
function historyTrack() {
  var positionH = [],
      timedata = [$("#datetimeP1").val(), $("#datetimeP2").val()];
  $.ajax({
    type: "POST",
    url: "http://localhost:8000/history_track",
    dataType: "json",
    async: false,
    data: JSON.stringify(timedata),
    success: function (result) {
      positionH = result;
    },
    error: function (result) {
    }
  });
  var c = $("#myCanvas3");
  var ctx = c.get(0).getContext("2d");
  ctx.clearRect(-calibrationC[1][0], -calibrationC[1][1], 840, 840);

  function drawHistoryPosition() {
    var num = configSet.tags.length;
    for (var i = 0; i < num; i++) {
      (function () {
        if ($("#tag" + i).get(0).checked == true) {
          for (var j = 0; j < 8; j++) {
            drawTrack(ctx, positionH[i][j][0], positionH[i][j][1], positionH[i][j + 1][0], positionH[i][j + 1][1], 2, "#F00");
          }
          drawArrow(ctx, positionH[i][8][0], positionH[i][8][1], positionH[i][9][0], positionH[i][9][1], 30, 10, 2, "#F00");
        }
      })();
    }
  }
  var draw = setTimeout(drawHistoryPosition, 100);
}

//stop cycle
function stopOverwrite1() {
  clearInterval(overwrite1);
}

function stopOverwrite2() {
  clearInterval(overwrite2);
}

//DrawTrack
function drawTrack(ctx, fromX, fromY, toX, toY, width, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(fromX, fromY, 5, 0, Math.PI * 2, false);
  ctx.arc(toX, toY, 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

//Draw arrows
function drawArrow(ctx, fromX, fromY, toX, toY, theta, headlen, width, color) {
  var theta = theta || 30,
      headlen = headlen || 10,
      width = width || 1,
      color = color || '#000',
      angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
      angle1 = (angle + theta) * Math.PI / 180,
      angle2 = (angle - theta) * Math.PI / 180,
      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);
  ctx.save();
  ctx.beginPath();
  var arrowX, arrowY;
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  arrowX = toX + topX;
  arrowY = toY + topY;
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(toX, toY);
  arrowX = toX + botX;
  arrowY = toY + botY;
  ctx.lineTo(arrowX, arrowY);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.restore();
}

//onscroll

window.onscroll = function () {
  var topScroll = document.documentElement.scrollTop || document.body.scrollTop,
      select = $("#selectA");
  if (topScroll > 222) {
    select.css("position", "fixed");
    select.css("zIndex", "500px");
    if ($(window).width() >= 759) {
      select.css("top", "80px");
      select.css("right", "15px");
    } else {
      select.css("position", "static");
      if (topScroll > 427) {
        select.css("position", "fixed");
        select.css("top", "0px");
        select.css("right", "30px");
      }
    }
  } else {
    select.css("top", "0px");
    select.css("right", "0px");
    select.css("position", "static");
  }
};
window.onload = function () {
  function adjust() {
    var map1 = $("#map1"),
        select = $("#selectA"),
        w = $("#page-inner1").actual("width"),
        ws = $("#selectA").actual("width");
    w = w - ws - 45;
    map1.width(w);
  }
  adjust();
  window.onresize = adjust;
};
//Binding events.
(function() {
  $("#orionEnglish").click(function () {
    $("#navHead1").html("PAGES");
    $("#navHead2").html("LBSOPTION");
    $("#navHead2a").html("LBSOPTION");
    $("#navHead3").html("CONFIG");
    $("#languageHead").html("Language");
    $("#navHead4").html("ABOUT");
    $("#introduceHead").html("Introduction");
    $("#contactHead").html("Contact");
    $("#navHead5").html("CONTACT");

    $("#preparationsHead").html("Preparations <small>Please confirm reference points.</small>");
    $("#confirmP1").html("<span class='glyphicon glyphicon-screenshot'><nobr class='open-sans'>First&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</nobr></span>");
    $("#confirmP2").html("<span class='glyphicon glyphicon-screenshot'><nobr class='open-sans'>Second</nobr></span>");
    $("#confirmF").html("<span class='glyphicon glyphicon-ok'><nobr class='open-sans'>Confirm</nobr></span>");
    $("#inputNameEn").html("<nobr class='open-sans'>Name</nobr>");
    $("#preparationsP").html("<nobr class='open-sans'>Map</nobr>");
    $("#confirmN").html("<span class='glyphicon glyphicon-ok'><nobr class='open-sans'>&nbsp&nbspBind&nbsp&nbsp</nobr></span>");
    $("#leaveS").html("<span class='glyphicon glyphicon-share-alt'><nobr class='open-sans'>Back</nobr></span>");
    $("#homeH").html("<h1 class='page-header'>Indoor Localization System<small>Please upload map or bind tags.</small></h1><ol class='breadcrumb borderRadiusHead'><li><a>Home</a></li>&nbsp<li class='active'>Preparations</li></ol>");
    $("#uploadB").html("Upload");
    if ($("#fileBackground").val() === "") {
      $("#fileName").html("no files");
    }
    $("#backgroundSubmit").html("Submit");
    $("#setB").html("Calibration");
    $("#nav1").html("<div class='navbar-header'><a class='navbar-brand'><strong>INDOORSYSTEM</strong></a></div>");
    $("#homeButton").html("Preparations");
    $("#fixButton").html("Fix position");
    $("#fixPH").html("<h1 class='page-header'>Fix position <small>Positioning tags.</small></h1><ol class='breadcrumb borderRadiusHead'><li><a>Home</a></li>&nbsp<li class='active'>Fix position</li></ol>");
    $("#positionsB").html("<span class='roboto'>Startposition</span>");
    $("#pauseB").html("<span class='roboto'>Pause</span>");
    $("#trackB").html("<span class='roboto'>Track</span>");
    $("#clockwise").html("<span class='roboto'>Clockwise</span>");
    $("#counterclockwise").html("<span class='roboto'>Counterclockwise</span>");
    $("#zoomB1").html("<span class='roboto'>Zoomposition</span>");
    $("#zoomB2").html("<span class='roboto'>Zoomtrack&nbsp</span>");
    $("#historyTrackB").html("<span class='glyphicon glyphicon-repeat'><nobr class='open-sans'>Historytrack</nobr></span>");
    $("#positionHead").html("Map<div id='zoomN' style='position: relative; float: right'></div>");
    $("#radio").html("<span class=''>ALL</span>");
    $("#multiple").html("<span class=''>CLR</span>");
    $("#between").html("<span class=''>Interval</span>");
  });
  $("#orionChinese").click(function () {
    $("#navHead1").html("功能页面");
    $("#navHead2").html("定位选项");
    $("#navHead2a").html("定位选项");
    $("#navHead3").html("配置选项");
    $("#languageHead").html("语言");
    $("#navHead4").html("关于奥新");
    $("#introduceHead").html("公司介绍");
    $("#contactHead").html("联系我们");
    $("#navHead5").html("联系我们");
    $("#preparationsHead").html("准备工作<small>请确定参照点</small>");
    $("#confirmP1").html("<span class='glyphicon glyphicon-screenshot'>第一点</span>");
    $("#confirmP2").html("<span class='glyphicon glyphicon-screenshot'>第二点</span>");
    $("#confirmF").html("<span class='glyphicon glyphicon-ok'>确定</span>");
    $("#inputNameEn").html("输入姓名");
    $("#preparationsP").html("地图");
    $("#confirmN").html("<span class='glyphicon glyphicon-ok'>绑定</span>");
    $("#leaveS").html("<span class='glyphicon glyphicon-share-alt'>返回</span>");
    $("#homeH").html("<h1 class='page-header'>室内定位系统<small>请上传地图或绑定标签</small></h1><ol class='breadcrumb borderRadiusHead'><li><a>首页</a></li>&nbsp<li class='active'>准备工作</li></ol>");
    $("#uploadB").html("上传");
    if ($("#fileBackground").val() === "") {
      $("#fileName").html("未上传文件");
    }
    $("#backgroundSubmit").html("提交");
    $("#setB").html("校准地图");
    $("#nav1").html("<div class='navbar-header'><a class='navbar-brand'><strong>室内定位系统</strong></a></div>");
    $("#homeButton").html("准备工作");
    $("#fixButton").html("定位");
    $("#fixPH").html("<h1 class='page-header'>定位<small>为多个标签定位.</small></h1><ol class='breadcrumb borderRadiusHead'><li><a>首页</a></li>&nbsp<li class='active'>定位</li></ol>");
    $("#positionsB").html("<span class='roboto'>开始定位</span>");
    $("#pauseB").html("<span class='roboto'>暂停</span>");
    $("#trackB").html("<span class='roboto'>显示轨迹</span>");
    $("#clockwise").html("<span class='roboto'>顺时针旋转</span>");
    $("#counterclockwise").html("<span class='roboto'>逆时针旋转</span>");
    $("#zoomB1").html("<span class='roboto'>定位缩放</span>");
    $("#zoomB2").html("<span class='roboto'>轨迹缩放</span>");
    $("#historyTrackB").html("<span class='glyphicon glyphicon-repeat'>历史轨迹</span>");
    $("#positionHead").html("地图<div id='zoomN' style='position: relative; float: right'></div>");
    $("#radio").html("<span class=''>全选</span>");
    $("#multiple").html("<span class=''>重置</span>");
    $("#between").html("<span class=''>区间选择</span>");
  });
  $("#setB").click(function () {
    jumpSetP();
    canvasRestore();
  });
  $("#backgroundSubmit").click(function () {
    if ($("#fileBackground").val() === "") {
      if ($("#uploadB").html() === "上传") {
        alert("请上传图片！");
      } else {
        alert("Please upload map!");
      }
      return false;
    } else {
      uploadImg();
      var file = $("#fileBackground");
      file.after(file.clone().val(""));
      file.remove();
      if ($("#uploadB").html() === "上传") {
        $("#fileName").html("未上传文件");
      } else {
        $("#fileName").html("no files");
      }
    }
  });
  $("#leaveS").click(function () {
    leaveSetP();
  });
  $("#homeButton").click(function () {
    jumpHomeP();
  });
  $("#fixButton").click(function () {
    jumpFixP();
    getCalibrationC();
  });
  $("#positionsB").click(function () {
    jumpC("#myCanvas1", "#myCanvas2", "#myCanvas3");
    fixPositionF();
  });
  $("#trackB").click(function () {
    jumpC("#myCanvas2", "#myCanvas1", "#myCanvas3");
    track();
  });
  $("#clockwise").click(function () {
    myIndex = myIndex + 90;
    if (myIndex === 360) {
      myIndex = 0;
    }
    myRotate();
  });
  $("#counterclockwise").click(function () {
    myIndex = myIndex - 90;
    if (myIndex === -360) {
      myIndex = 0;
    }
    myRotate();
  });
  $("#historyTrackB").click(function () {
    jumpC("#myCanvas3", "#myCanvas1", "#myCanvas2");
    historyTrack();
  });
  $("#zoomB1").click(function () {
    zoomC("#canvas1", "#canvas2");
    init();
    $("#zoomN").html("100%");
  });
  $("#zoomB2").click(function () {
    zoomC("#canvas2", "#canvas1");
    init();
    $("#zoomN").html("100%");
  });
  $("#radio").on("click", function () {
    for (var i = 0; i < configSet.tags.length; i++) {
      $("#tag" + i).get(0).checked = true;
    }
  });
  $("#multiple").on("click", function () {
    for (var i = 0; i < configSet.tags.length; i++) {
      $("#tag" + i).get(0).checked = false;
    }
  });
  $("#between").on("click", function () {
    var $n = function (o) {
      return document.getElementsByTagName(o);
    };
    var arr = [], n = $n("input").length;
    for (var i = 0; i < n; i++) {
      if ($n("input")[i].checked) {
        arr.push(i);
      }
    }
    if (arr.length >= 2) {
      arr = arr.sort(function (a, b) {
        return a - b
      });
      for (var j = arr[0]; j < arr[arr.length - 1]; j++) {
        $n("input")[j].checked = true;
      }
    }
  });
  function checkTag() {
    var checkID = [];
    $("input[name='tag']:checked").each(function (i) {
      checkID[i] = $(this).val();
    })
    var data = {
      data: JSON.stringify({
        'checkID': checkID
      }),
    };
    $.ajax({
      url: "http://localhost:8000/cal",
      type: 'POST',
      data: data,
      dataType: 'json',
      //contentType: 'application/json; charset=UTF-8',
    })
  }
  $("input[name='tag']").each(function (n) {
    $(this).on("click", function () {
      checkTag();
    })
  })
  $("#radio,#multiple,#between").on("click", function () {
    checkTag();
  })
})();

(function() {
  $("#datetimePicker1").datetimepicker({
    format: 'YYYY/MM/DD HH:mm'
  });
  $("#datetimePicker2").datetimepicker({
    format: 'YYYY/MM/DD HH:mm'
  });
  $("#datetimePicker1").on("dp.change", function (e) {
    $("#datetimePicker2").data("DateTimePicker").minDate(e.date);
    $("#datetimePicker1").data("DateTimePicker").maxDate(window.date);
  });
  $("#datetimePicker2").on("dp.change", function (e) {
    $("#datetimePicker1").data("DateTimePicker").maxDate(e.date);
    $("#datetimePicker2").data("DateTimePicker").maxDate(window.date);
  });
})();
