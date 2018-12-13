/*
** Create by 张晓坤 on 2018/4/30
*/

/** 1.匀速平移动画
* @param obj：要移动的元素
 * @param target：要移动的目标位置
* @return 无
*/
function animationMove (obj,target ) {
    //移动之前，如果元素已有定时器，则先清除
    clearInterval(obj.timeID);
    //移动动画:将定时器的id作为移动元素的属性
    obj.timeID=  setInterval(function (  ) {
        //1.获取元素当前位置
        var currentLeft = obj.offsetLeft;
        //2.判断元素是向左移动还是向右移动

        var isLeft;
        if(currentLeft < target){
            //向右移动
            currentLeft += 10;
            isLeft = false;
        }else{
            //向左移动
            currentLeft -= 10;
            isLeft = true;
        }

        //3.边界检测
        /*如果是向右移动，检测规则是：if (当前距离 < 目标距离) 继续右移，否则直接回到目标距离
        如果是向左移动，检测规则是：if (当前距离 > 目标距离) 继续左移，否则直接回到目标距离
        * 解决方案：可以在第二步判断元素左移还是右移的时候声明一个变量，如果为true则表示左移，false表示右移
        isLeft == false?currentLeft < target:currentLeft > target
        * 这个三目运算的含义，如果是右移，返回currentLeft < target 条件表达式的结果。否则返回currentLeft > target条件表达式的结果
         */
        if(isLeft == false?currentLeft < target:currentLeft > target){
            //4.设置盒子的位置（offset家族只能读取不能设置）
            obj.style.left = currentLeft + 'px';
        }else{
            obj.style.left =  target + 'px';
            //5.到达目的地之后移除定时器
            clearInterval(obj.timeID);
        }
    },50);
}

/** 2.缓动动画
 * @param obj：要移动的元素
 * @param attrs：要移动的目标位置
 * @param fn：回调函数
*/
function animationSlow (  obj,attrs,time,fn) {
    //1.先清除之前的定时器，以本次移动为准
    clearInterval(obj.timeID);
    //2.开始本次移动
    obj.timeID = setInterval(function (  ) {
        /*开关思想：当某种操作的结果只有两种状态，就可以使用布尔类型表示这两种状态isAllOk
        1.提出假设： 假设每一次移动isAllOk = true
        2.验证假设
        3.根据开关状态来实现需求
        */
        //一：提出假设.这一次移动之后所有属性都到达终点
        var isAllOk = true;
        //遍历对象属性值
        for (var key in attrs){
            //这里声明两个变量是为了下面的attr和target形参不用修改
            var attr = key;//属性名
            var target = attrs[key];//目标位置
            //2.1 先获取当前位置
            /*注意：window.computedStyle方式获取的属性值是字符串，需要转成number*/
            var current = parseInt( getStyle(obj, attr));
            //2.2 计算本次移动距离  = （目标位置 - 当前位置）/10
            var step =(target - current)/10;
            //2.3 取整： step>0:向上取整  step<0:向下取整
            step = step>0?Math.ceil(step):Math.floor(step);
            //2.4 开始移动
            current += step;
            obj.style[attr] = current + 'px';
            //2.5 终点检测
            //二：验证假设：只要有任何一个属性没有到达终点，假设被推翻
            if (current != target){
                isAllOk = false;
            }
        }

        //三：根据开关状态实现需求
        if (isAllOk){
            clearInterval(obj.timeID);
            //判断调用者有没有传递第三个参数
            if (typeof  fn == 'function'){//只有当fn是函数的时候才执行函数体代码
                fn();
            }
        }
    },time);
}


function getStyle(obj,attr){
    //能力检测
    if (window.getComputedStyle){//谷歌火狐浏览器
        var style = window.getComputedStyle(obj, null);
        /*注意点：这里只能用字符串语法去获取属性值*/
        //return style.attr;//这个代码意思是获取对象attr属性的值
        return style[attr];//这个代码意思是获取attr变量中存储的字符串对象的属性值

    }else{//IE8浏览器
        return obj.currentStyle[attr];
    }
}