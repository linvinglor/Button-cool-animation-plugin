var boxes = document.getElementById('boxes');//父盒子
var boxList = boxes.children;//六个子盒子
var body = document.getElementsByTagName('body')[0];//body
var size=boxList[0].offsetHeight;//子盒子的高度
var bgc = document.getElementById('bgc');//用于显示背景颜色的盒子


for (i=0;i<boxList.length;i++) {
    //给每一个子盒子注册鼠标移动事件
   boxList[i].onmousemove=function (e) {
    //按照公式计算出borderRadius的八个参数(四个值);
    e = event||window.event;
    var x = size * .3 * .7 + .7 * e.offsetX;
    var y = size * .3 * .7 + .7 * e.offsetY;
    var x1 = x/size*100;
    var x2 = (size-x)/size*100;
    var y3 = y/size*100;
    var y4 = (size-y)/size*100;
    //给当前子盒子添加边框
    this.style.border= "14px solid rgba(255, 255, 255, .5)";
    //根据鼠标坐标改变当前子盒子边框弧度百分比
    this.style.borderRadius = (x1+"%")+" "+(x2+"%")+" "+(x2+"%")+" "+(x1+"%")+"/"+" "+(y3+"%")+" "+(y3+"%")+" "+(y4+"%")+" "+(y4+"%"); 
 }
    //鼠标移入,背景颜色改变
 boxList[i].onmouseover =function(){
    bgc.style.backgroundColor = this.style.backgroundColor;
    bgc.style.opacity=0.13;

 }
    //鼠标移出,边框缓动宽缓动到0,边框弧度缓动到50%
 boxList[i].onmouseout = function(){
    animationSlow(this,{
        borderRadius:size/2,
        borderWidth:0
    },35)
 }
}