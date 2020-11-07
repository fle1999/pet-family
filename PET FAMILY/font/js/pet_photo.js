/*全局变量定义部分*/
var imgobj = [
	{
		src:"../img/pet_photo/1.gif",
		name:"1"
	},
	{
		src:"../img/pet_photo/2.gif",
		name:"2"
	},
	{
		src:"../img/pet_photo/3.jpg",
		name:"3"
	},
	{
		src:"../img/pet_photo/4.jpg",
		name:"4"
	},
	{
		src:"../img/pet_photo/5.gif",
		name:"5"
	},
	{
		src:"../img/pet_photo/6.jpg",
		name:"6"
	},
	{
		src:"../img/pet_photo/7.jpg",
		name:"7"
	},
	{
		src:"../img/pet_photo/8.jpg",
		name:"8"
	},
	{
		src:"../img/pet_photo/9.jpg",
		name:"9"
	}
]
var count = 0;
/*函数定义部分*/
window.onload = function(){
	imgChange();
	//获取button
	var changebtn = document.getElementsByClassName("changebtn")[0];
	changebtn.onclick = function(){
		imgChange();        
	}
}
function imgChange(){
    //定义数组对象长度
    var img_len = imgobj.length,
        a = document.getElementsByClassName("img"),
        a_len = a.length;
    for(var i = 0; i < a_len; i++,count++){
        a[i].style.backgroundImage = "url("+imgobj[Math.round((Math.random(count))*(img_len -1))].src+")";
        a[i].index = i;
        a[i].onclick = function(){
            var bgSrc = getCss(this,'background-image');
            preview(bgSrc.slice(bgSrc.indexOf('(') + 2,bgSrc.lastIndexOf(')') - 1),600);
        }
    }    
}
function preview(src, time) {
    var img = document.createElement('img'), imgMask = document.createElement('div');
    imgMask.style.cssText += 'position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:9999;';
    img.style.cssText += 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:auto;height:auto;border-radius:5px;';
    imgMask.id = 'previewMask';
    img.src = src;
    imgMask.appendChild(img);
    var mask = document.getElementById('previewMask');
    if(!mask){
        document.body.appendChild(imgMask);
        ani.fadeIn(imgMask, time);
    }else{
        document.body.replaceChild(imgMask,mask);
        ani.fadeIn(imgMask, time);
    }
    imgMask.addEventListener('click', function (e) {
        var el = e.target.tagName.toLowerCase().indexOf('img') > -1 ? e.target.parentElement : e.target;
        ani.fadeOut(el, time);
    }, false)
}
function getCss(el, prop) {
    var getStyle = el.currentStyle ? function (prop) {
        var propName = el.currentStyle[prop];
        if (propName.indexOf('height') > -1 && propName.search(/px/i) > -1) {
            var rect = el.getBoundingClientRect;
            return rect.bottom - rect.top - parseInt(getStyle('padding-bottom')) - parseInt(getStyle('padding-top')) + 'px';
        }
    } : function (prop) {
        return window.getComputedStyle(el, null)[prop];
    };
    return getStyle(prop);
};
var ani = (function () {
    var animation = {};
    function TimerManager() {
        this.timers = [];
        this.args = [];
        this.isTimerRun = false;
    }
    TimerManager.makeTimerManage = function (element) {
        if (
            !element.TimerManage ||
            element.TimerManage.constructor !== TimerManager
        ) {
            element.TimerManage = new TimerManager();
        }
    };
    TimerManager.prototype.add = function (timer, args) {
        this.timers.push(timer);
        this.args.push(args);
        this.timerRun();
    };
    TimerManager.prototype.timerRun = function () {
        if (!this.isTimerRun) {
            var timer = this.timers.shift(),
                args = this.args.shift();
            if (timer && args) {
                this.isTimerRun = true;
                timer(args[0], args[1]);
            }
        }
    };
    TimerManager.prototype.next = function () {
        this.isTimerRun = false;
        this.timerRun();
    };
    function slideUp(element, time) {
        if (element.offsetHeight > 0) {
            var totalHeight = element.offsetHeight;
            var currentHeight = totalHeight;
            var reduceValue = totalHeight / (time / 10);
            element.style.transition = "height " + time + " ms";
            element.style.overflow = "hidden";
            var timer = setInterval(function () {
                currentHeight -= reduceValue;
                element.style.height = currentHeight + "px";
                if (currentHeight <= 0) {
                    clearInterval(timer);
                    element.style.display = "none";
                    element.style.height = totalHeight + "px";
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (element.TimerManage &&element.TimerManage.constructor === TimerManager) {
					element.TimerManage.next();
            }
        }
    }
    function slideDown(element, time) {
        if (element.offsetHeight <= 0) {
            element.style.display = "block";
            element.style.transition = "height" + time + " ms";
            element.style.overflow = "hidden";
            var totalHeight = element.offsetHeight;
            var currentHeight = 0;
            element.style.height = "0px";
            var addValue = totalHeight / (time / 10);
            var timer = setInterval(function () {
                currentHeight += addValue;
                element.style.height = currentHeight + "px";
                if (currentHeight >= totalHeight) {
                    clearInterval(timer);
                    element.style.height = totalHeight + "px";
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    function fadeIn(element, time) {
        element.style.transition = "opacity" + time + " ms";
        if (!getCss(element, 'opactiy') || !parseInt(getCss(element, 'opactiy')) <= 0) {
            element.style.display = "none";
            let curAlpha = 0;
            element.style.opacity = 0;
            let addAlpha = 1 * 100 / (time / 10);
            var timer = setInterval(function () {
                curAlpha += addAlpha;
                element.style.display = "block";
                element.style.opacity = (curAlpha / 100).toFixed(2);
                if (curAlpha >= 100) {
                    clearInterval(timer);
                    element.style.opacity = 1;
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    function fadeOut(element, time) {
        element.style.transition = "opacity" + time + " ms";
        if (!getCss(element, 'opactiy') || !parseInt(getCss(element, 'opactiy')) >= 1) {
            let curAlpha = 100;
            element.style.opacity = 1;
            element.style.display = "block";
            let reduceAlpha = 1 * 100 / (time / 10);
            var timer = setInterval(function () {
                curAlpha -= reduceAlpha;
                element.style.opacity = (curAlpha / 100).toFixed(2);
                if (curAlpha <= 0) {
                    clearInterval(timer);
                    element.style.opacity = 0;
                    element.style.display = "none";
                    if (
                        element.TimerManage &&
                        element.TimerManage.constructor === TimerManager
                    ) {
                        element.TimerManage.next();
                    }
                }
            }, 10);
        } else {
            if (
                element.TimerManage &&
                element.TimerManage.constructor === TimerManager
            ) {
                element.TimerManage.next();
            }
        }
    }
    animation.slideUp = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(slideUp, arguments);
        return this;
    };
    animation.slideDown = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(slideDown, arguments);
        return this;
    };
    animation.fadeIn = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(fadeIn, arguments);
        return this;
    };
    animation.fadeOut = function (element) {
        TimerManager.makeTimerManage(element);
        element.TimerManage.add(fadeOut, arguments);
        return this;
    };
    return animation;
})();
