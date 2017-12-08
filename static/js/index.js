/*It's for index.html.
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
  $("#zoomN").css("display", "none");
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
  $("#zoomN").css("display", "none");
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
  $("#zoomN").css("display", "none");
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
  $("#zoomN").css("display", "block");
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
  $("#zoomN").css("display", "block");
  scroll();
}

function getTagName() {
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_config",
    //url: "http://192.168.100.6:8000/_config",
    dataType: "json",
    //async: false,
    success: function(result) {
      var num = result.num_tags;
      for (var i = 0; i < num; i++) {
        $("#select").append(function() {
          return "<input id='tag" + i + "' type='checkbox' class='selecta'>" + result.tag_names[i] + "<br/>";
        });
      };
    },
    error: function(result) {
      //console.log("fuck");
    }
  });
}
getTagName();

function getPosition() {
  var positions;
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_positions",
    //url: "http://192.168.100.6:8000/_positions",
    dataType: "json",
    async: false,
    success: function(result) {
      positions = result;
      for (var i = 0; i < eval(positions).length; i++) {
        for (var j = 0; j < 2; j++) {
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

function getNum_tags() {
  var num;
  $.ajax ({
    type: "GET",
    url: "http://localhost:8000/_config",
    //url: "http://192.168.100.6:8000/_positions",
    dataType: "json",
    async: false,
    success: function(result) {
      num = result.num_tags;
    },
    error: function(result) {
      //console.log("fuck");
    }
  });
  return num;
}

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
dataURL1 = 0;
dataURL2 = 0;

function fixPositionF() {
  var pauseStatus = true;
  var c1 = $("#myCanvas1");
  var ctx = c1.get(0).getContext("2d");
  ctx.fillStyle = "#0000FF";
  var num = getNum_tags();
  function fixPosition() {
    var x, y;
    var positions = getPosition();
    x = new Array();
    y = new Array();
    x[49] = 0;
    y[49] = 0;
    for (var k = 0; k < num; k++) {
      x[k] = positions[k][0] - 12.5;
      y[k] = positions[k][1] - 12.5;
    };
    var myImage = new Image();
    myImage.src = "./img/locationMarker.png";
    ctx.globalCompositeOperation = "copy";
    ctx.clearRect(0, 0, 1260, 840);
    myImage.onload = function() {
      ctx.globalCompositeOperation = "source-over";
      for (var i = 0; i < num; i++) {
        (function() {
          if ($("#tag" + i).get(0).checked == true) {
            ctx.drawImage(myImage, x[i], y[i], 25, 25);
            ctx.fillText("Tag" + i, x[i] + 25, y[i]);
          } else if ($("#tag" + i) == false) {
            return false;
          };
        })();
      };
      dataURL1 = c1.get(0).toDataURL();
    };
    if (pauseStatus == false) {
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
  var a,b,c,d;
  a = [];
  b = [];
  c = [];
  d = [];
  var num = getNum_tags();
  var positions = getPosition();
  c2 = $("#myCanvas2");
  for (var j = 0; j < num; j++) {
    c[j] = positions[j][0];
    d[j] = positions[j][1];
  };
  var ctx = c2.get(0).getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#F00";
  ctx.clearRect(0, 0, 1260, 840);
  $("#multiple").on ("click", function() {
    ctx.clearRect(0, 0, 1260, 840);
  });
  function point1() {
    var positions1 = getPosition()
    for (var i = 0; i < num; i++) {
      (function() {
        if ($("#tag" + i).get(0).checked == true) {
          a[i] = positions1[i][0];
          b[i] = positions1[i][1];
          ctx.beginPath();
          ctx.moveTo(c[i], d[i]);
          ctx.lineTo(a[i], b[i]);
          ctx.closePath();
          ctx.stroke();
        } else if ($("#tag" + i) == false) {
          return false;
        };
      })();
    };
  }
  function point2() {
    var positions2 = getPosition()
    for (var i = 0; i < num; i++) {
      (function() {
        if ($("#tag" + i).get(0).checked == true) {
          c[i] = positions2[i][0];
          d[i] = positions2[i][1];
          ctx.beginPath();
          ctx.moveTo(a[i], b[i]);
          ctx.lineTo(c[i], d[i]);
          ctx.closePath();
          ctx.stroke();
        } else if ($("#tag" + i) == false) {
          return false;
        };
      })();
    };
  }
  function delay() {
    var p1 = setTimeout(point1, 0);
    var p2 = setTimeout(point2, 1000);
    $("#trackB").click (function() {
      clearTimeout(p1);
      clearTimeout(p2);
    });
    dataURL2 = c2.get(0).toDataURL();
  }
  overwrite2 = setInterval(delay, 2000);
}

//stop cycle
function stopOverwrite1() {
  clearInterval(overwrite1);
}
function stopOverwrite2() {
  clearInterval(overwrite2);
}

window.onscroll = function() {
  var topScroll = document.documentElement.scrollTop||document.body.scrollTop;
  var select = $("#selectA");
  if (topScroll > 247) {
    select.css("position", "fixed");
    select.css("zIndex", "500px");
    if ($(window).width() >= 759) {
      select.css("top", "60px");
      select.css("right", "15px");
    } else {
      select.css("position", "static");
      if (topScroll > 447) {
        select.css("position", "fixed");
        select.css("top", "0px")
        select.css("right", "30px")
      };
    };
  } else {
    select.css("top", "0px")
    select.css("right", "0px")
    select.css("position", "static");
  }
};

function adjust() {
  var map1 = $("#map1");
  var select = $("#selectA");
  var w = $("#page-inner1").actual("width");
  var ws = $("#selectA").actual("width");
  w = w - ws - 45;
  map1.width(w);
}
window.onload = function() {
  adjust();
  window.onresize = adjust;
};

//Binding events.
(function() {
  $("#homeButton").click (function() {
    jumpHomeP();
  });
  $("#fixButton").click (function() {
    jumpFixP();
  });
  $("#positionsB").click (function() {
    jumpC1();
    fixPositionF();
  });
  $("#trackB").click (function() {
    jumpC2();
    track();
  });
  $("#zoomB1").click (function() {
    zoomC1();
    init();
    $("#zoomN").html("100%");
  });
  $("#zoomB2").click (function() {
    zoomC2();
    init();
    $("#zoomN").html("100%");
  });
  var num = getNum_tags();
  $("#radio").on ("click", function() {
    for (var i = 0; i < num; i++) {
      $("#tag" + i).get(0).checked = true;
    };
  });
  $("#multiple").on ("click", function() {
    for (var i = 0; i < num; i++) {
      $("#tag" + i).get(0).checked = false;
    };
  });
})();
