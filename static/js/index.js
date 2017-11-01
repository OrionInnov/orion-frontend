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
};
function jumpFixP() {
  homeB.removeClass("active-menu");
  fixB.addClass("active-menu");
  rollB.removeClass("active-menu");
  home.css("display", "none");
  fixP.css("display", "block");
  rollC.css("display", "none");
};
function jumpRollC() {
  homeB.removeClass("active-menu");
  fixB.removeClass("active-menu");
  rollB.addClass("active-menu");
  home.css("display", "none");
  fixP.css("display", "none");
  rollC.css("display", "block");
};
//FixPosition and track switch.
var c1 = $("#myCanvas1");
var c2 = $("#myCanvas2"); 
c1.css("display", "block");
c2.css("display", "none");
function jumpC1() {
  c1.css("display", "block");
  c2.css("display", "none");
};
function jumpC2() {    
  c1.css("display", "none");
  c2.css("display", "block");    
};
//Fix position.
/*var myBackground = new Image();
myBackground.src = "./img/position.jpg"	
ctx.drawImage(myBackground, 0, 0, 900, 600);
*/
function fixPositionF(){
  function fixPosition() {
	var x,y;
  	x = $("#x").val() - 12.5;
  	y = $("#y").val() - 12.5;
  	var myImage = new Image();
  	myImage.src = "./img/locationMarker.png"
  	var c1 = $("#myCanvas1");
    var ctx = c1.get(0).getContext("2d");
  	ctx.globalCompositeOperation = "copy";
  	myImage.onload = function() {     
  	  ctx.drawImage(myImage, x, y, 25, 25); 	  
  	};
  function canvasClear() {
  	ctx.clearRect(x, y, 25, 25);
  };
  //var clear = setTimeout(canvasClear, 1500);
  };
  var overwrite1 = setInterval(fixPosition, 10);
};
//Track.
function track() {
  var a,b,c,d;
  a = $("#x").val();
  b = $("#y").val();
  c = $("#x").val();
  d = $("#y").val();
  var c2 = $("#myCanvas2");
  var ctx = c2.get(0).getContext("2d");
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#F00"
  function point1() {
    a = $("#x").val();
    b = $("#y").val();
    ctx.beginPath();
    ctx.moveTo(c, d);
    ctx.lineTo(a, b);
    ctx.closePath();
    ctx.stroke();
  };
  function point2() {
    c = $("#x").val();
  	d = $("#y").val();
  	ctx.beginPath();
  	ctx.moveTo(a, b);
  	ctx.lineTo(c, d);
  	ctx.closePath();
  	ctx.stroke();
  };
  function delay() {
  	var p1 = setTimeout(point1, 1000);
  	var p2 = setTimeout(point2, 1000);
  };
  var overwrite2 = setInterval(delay, 3000);
};