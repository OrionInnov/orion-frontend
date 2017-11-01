var canvas,context;
var img,//图片对象
    imgIsLoaded,//图片是否加载完成;
    imgX=0,
    imgY=0,
    imgScale=1;

(function int(){
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    loadImg();
})();

function loadImg(){
    img=new Image();
    img.onload=function(){
        imgIsLoaded=true;
        drawImage();
    }
    img.src="./img/position.jpg";
}

function drawImage(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(img,0,0,img.width,img.height,imgX,imgY,img.width*imgScale,img.height*imgScale);
}

canvas.onmousedown=function(event){	
	document.documentElement.style.overflow = "scroll";
	var pos=windowToCanvas(canvas,event.clientX,event.clientY);
    canvas.onmousemove=function(event){
        canvas.style.cursor="move";
        var pos1=windowToCanvas(canvas,event.clientX,event.clientY);
        var x=pos1.x-pos.x;
        var y=pos1.y-pos.y;
        pos=pos1;
        imgX+=x;
        imgY+=y;
        drawImage();
    }
    canvas.onmouseup=function(){
        canvas.onmousemove=null;
        canvas.onmouseup=null;
        canvas.style.cursor="default";
    }
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
    drawImage();
}

function windowToCanvas(canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left - (bbox.width - canvas.width) / 2,
        y:y - bbox.top - (bbox.height - canvas.height) / 2
    };
}

