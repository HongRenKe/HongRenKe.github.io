window.onload = function(){
    var previmg = document.getElementById("previmg");
    var nextimg = document.getElementById("nextimg");
    var spanimg = document.getElementById("spanimg");
    var imgimg = document.getElementById("imgimg");

    var arrUrl = ["images/arduinoLCD.jpg","images/arduinoLCD01.png","images/arduinoLCD02.jpg","images/arduinoLCD03.jpg"];


    var num = 0;
    // 初始化显示内容
    function fnTab(){//重复的代码要用函数包起来
        spanimg.innerHTML = num+1 +'/' + arrUrl.length;// 1/4，因为计数是从1开始，所以num要加1
        imgimg.src = arrUrl[num];//动态获取数组中图片，先加载第一张图片，因为num是0
   
    }
    fnTab();//调用函数，fnTab()代表执行函数里面的三行代码

    nextimg.onclick = function(){
        num ++;//num自增1
        if(num == arrUrl.length){//如果num的值超过数组的长度
            num = 0;//恢复到第一张图片（数组中是从0 开始数）
        }               
        fnTab();// 然后相应加载的内容进行变动
    }
    previmg.onclick = function(){
        num --;
        if(num == -1){
            num = arrUrl.length - 1;//如果图片已经在第一张，还点击上一张，那么让图片显示最后一张，即数组长度减1为数组最后一张图片
        }
        fnTab();
    }
}