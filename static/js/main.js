//
//
//

var canvas = document.getElementById('canvas');
var canvas1,context1,canvas0,context0;
var img1,//图片对象
    imgIsLoaded,//图片是否加载完成;
    imgX=0,
    imgY=0,
    imgScale=1;
function init(){
  imgX=0;
  imgY=0;
  imgScale=1;
  img0.src = dataURL0;
  img1.src = dataURL1;
  img2.src = dataURL2;
  drawImage0();
  drawImage1();
  drawImage2();
}

(function int(){
    canvas0=document.getElementById('canvas0');
    context0=canvas0.getContext('2d');
    loadImg0();
})();
(function int(){
    canvas1=document.getElementById('canvas1');
    context1=canvas1.getContext('2d');
    loadImg1();
})();
(function int(){
    canvas2=document.getElementById('canvas2');
    context2=canvas2.getContext('2d');
    loadImg2();
})();

function loadImg0(){
    img0=new Image();
    img0.onload=function(){
        imgIsLoaded=true;
        drawImage0();
    }
    img0.src = dataURL0;
}
function loadImg1(){
    img1=new Image();
    img1.onload=function(){
        imgIsLoaded=true;
        drawImage1();
    }
    img1.src = dataURL1;
}
function loadImg2(){
    img2=new Image();
    img2.onload=function(){
        imgIsLoaded=true;
        drawImage2();
    }
    img2.src = dataURL2;
}


function drawImage0(){
	context0.clearRect(0,0,canvas.offsetWidth,canvas.offsetWidth);
	context0.drawImage(img0,0,0,img0.width,img0.height,imgX,imgY,img0.width*imgScale,img0.height*imgScale);
}
function drawImage1(){
    context1.clearRect(0,0,canvas.offsetWidth,canvas.offsetWidth);
    context1.drawImage(img1,0,0,img1.width,img1.height,imgX,imgY,img1.width*imgScale,img1.height*imgScale);
}
function drawImage2(){
    context2.clearRect(0,0,canvas.offsetWidth,canvas.offsetWidth);
    context2.drawImage(img2,0,0,img2.width,img2.height,imgX,imgY,img2.width*imgScale,img2.height*imgScale);
}

canvas.onmousedown=function(event){
	document.documentElement.style.overflow = "scroll";
	var pos=windowToCanvas(canvas,event.clientX,event.clientY);
    canvas.onmousemove=function(event){
        canvas.style.cursor="move";
        var pos0=windowToCanvas(canvas,event.clientX,event.clientY);
        var x=pos0.x-pos.x;
        var y=pos0.y-pos.y;
        pos=pos0;
        imgX+=x;
        imgY+=y;
        img0.src = dataURL0;
        img1.src = dataURL1;
        img2.src = dataURL2;
        drawImage0();
        drawImage1();
        drawImage2();
    }
    canvas.onmouseup=function(){
        canvas.onmousemove=null;
        canvas.onmouseup=null;
        canvas.style.cursor="default";
    }
    //document.write(dataURL0);
}
canvas.onmousewheel=canvas.onwheel=function(event){
	document.documentElement.style.overflow = "hidden";
	var pos=windowToCanvas(canvas,event.clientX,event.clientY);
    event.wheelDelta=event.wheelDelta?event.wheelDelta:(event.deltaY*(-40));
    if(event.wheelDelta>0){
        imgScale*=2;
        imgX=imgX*2-pos.x;
        imgY=imgY*2-pos.y;
    }else{
        imgScale/=2;
        imgX=imgX*0.5+pos.x*0.5;
        imgY=imgY*0.5+pos.y*0.5;
    }
    img0.src = dataURL0;
    img1.src = dataURL1;
    img2.src = dataURL2;
    drawImage0();
    drawImage1();
    drawImage2();
}

function windowToCanvas(canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left - (bbox.width - canvas.offsetWidth) / 2,
        y:y - bbox.top - (bbox.height - canvas.offsetHeight) / 2
    };
}
