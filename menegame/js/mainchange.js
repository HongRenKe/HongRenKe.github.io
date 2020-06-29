// 用於loading
var load = 0//start 0
//計時器-讀取時間
var timer = setInterval(() => {
    if(load >= 100)
    {
    clearInterval(timer);
    load = 100;  
    } 
    else 
    {
    load++;
    $('#progress').html(load +'%');
    // console.log(load);
    }
    }, 20)
//各個設定
//蟲蟲數
var bugnum = 1;//6
//螻蛄數
var bugmc =1;
//抓到數
var bugnumc = 0;
//螻蛄抓數
var bugmcc =0;
//是否捕捉過螻蛄
var mcc=0;
//是否捕捉過雞母蟲
var gmc=0;
//暫停
var pause= 0;
//關卡
var level=1;
//分數
var score=0;
//遊戲時間
var gtime=120;
//設定是在遊戲內還是遊戲外
var gameplaying=0;

var bugtype=2; 
var page=1;
var bugcheck=[mcc,gmc];
var bugname=['<螻蛄>','<雞母蟲>'];
var bugcontain=['直翅目螻蛄科，體長 3.0 ~ 3.5 公分，體色褐色，翅膀長短不一，最大特徵為前腳發達，具齒狀尖刺，有如釘耙。','獨角仙幼蟲～'];
onload= () => {
        setTimeout(() => {
         $('#loading').remove();
        },22*100)
        menu();
        $('#collecttitle').text('收藏('+page+'/'+bugtype+')');
        
    }
//page change
var bugcheckf=()=>{
    bugcheck=[mcc,gmc]
    for(i=0;i<bugtype;i++){
        if(page==i+1 &bugcheck[i]==1){
            $('#cpicture').attr('style','background-image: url(./img/'+i+'.png);');
            $('#ctitle').text(bugname[i]);
            $('#ccontain').text(bugcontain[i]);
            }
        else if(page==1&bugcheck[0]==1 ){
            $('#cpicture').attr('style','background-image: url(./img/'+0+'.png);');
            $('#ctitle').text(bugname[0]);
            $('#ccontain').text(bugcontain[0]);

        }
        else{
        $('#cpicture').attr('style','background-image: url(./img/問號黑.png);');
            $('#ctitle').text('<????>');
            $('#ccontain').text('?????');
            }

    }
}
   
$(document).on('click','#cnext',() =>{  
        if(page==bugtype){
            page=1;   
        }
        else{
            page++;
        }
    $('#collecttitle').text('收藏('+page+'/'+bugtype+')');
    bugcheckf(); 
    
    })
$(document).on('click','#cprev',() =>{  
    if(page==1){
        page=bugtype;   
    }
    else{
        page--;
    }
    $('#collecttitle').text('收藏('+page+'/'+bugtype+')');
    bugcheckf(); 
    })




//建立menu
var menu=()=>{
    var menuback=$('<div></div>').addClass('menuback').attr('id','menu');
    var toppic=$('<div></div>').text('DeBug').addClass('gname');
    var start=$('<button></button>').text('開始').addClass('menubtn').attr('id','startbtn'); 
    var collect=$('<button></button>').text('收藏').addClass('menubtn').attr({'id':'collectbtn','data-toggle':'modal','data-target':'#collect','herf':'"#collect"','onclick':'buttona()'});
    var about=$('<button></button>').text('關於').addClass('menubtn').attr({'id':'aboutbtn','data-toggle':'modal','data-target':'#about','herf':'"#about"','onclick':'buttona()'});

    $('#gview').append(menuback);
    $('#menu').append(toppic,start,collect,about);

}





//遊戲開始
$(document).on('click','#startbtn',() =>{
    buttona(); 
    gamestartI();
  })
//game start 
var gamestartI =()=>{
    face ="front";
    characterpicture =$('<img>').addClass('characterpicture').attr({'id':'characterp','src':'./img/' +face + '.png'});
    characterposition=[0,0]; 
    gameplaying=1;
    gtime=120;
    level=1;
    bugnum = 1;
    bugmc =1;
    bugnumc = 0;
    score=0;    
    clearmenu();
    gameview();
    characterpI();
    bugpositionset();
    bugvolum();
    
    $('#levelv').html('Level: ' +level);

} 
//遊戲時間
var gtimer = setInterval(() => {
        if(gameplaying==1){
            if(pause==0){
                if(gtime<=0){
                gtime = 0;  
                $('#gtimev').attr('style','color:#E91E63;');
                $('#gtimev').html('time: '+gtime+' s');
              
                if($('#timeupback').length==0){
                    timeup();
                    pause= 1;
                    for(i=0;i<bugnum;i++){
                        $('#mcsound'+i).remove();
                    }
                }  
            }
            else if(gtime<11){
                
                gtime--;
                $('#gtimev').attr('style','color:#E91E63;');
                $('#gtimev').html('time: '+gtime+' s');
                var timewarning = $('<audio></audio>').addClass('timewarning').attr({'src':'./audio/時間不多.mp3','loop':'true','autoplay':'true','id':'timewarning'});
                $('#gtimev').append(timewarning);
                $('#timewarning').prop("volume", 0.3);
                console.log(gtime);
            }
            else{
                gtime--;
                $('#gtimev').html('time: '+gtime+' s');
                console.log(gtime);
            }
            }
        }
       
}, 1000)

//timeup
var timeup=()=>{
    var timeupback=$('<div></div>').addClass('pausemback').attr('id','timeupback');
    $('#gmain').append(timeupback);
    var timeuptext=$('<div></div>').text('Time Up ~').addClass('tname');
    var timeupscore=$('<div></div>').text('Score: '+score+'分').addClass('tscore');
    var trestart=$('<button></button>').text('重新').addClass('timebtn').attr({'id':'trestart','onclick':'buttona()'});
    var texit=$('<button></button>').text('離開').addClass('timebtn').attr({'id':'texit','onclick':'buttona()'});
    $('#timeupback').append(timeuptext,timeupscore,trestart,texit);
}

//重新
$(document).on('click','#trestart',() =>{  
    
        gameplaying=0;
        
        $('#gmain').remove();
        pause=0;
        gameplaying=0;
        clearplayground();
        gamestartI(); 
    
})
//離開遊戲
$(document).on('click','#texit',() =>{  
    var cexit=confirm('確定要結束遊戲？');
	if (cexit==true){
        gameplaying=0;
        gtime=120;
        $('#gmain').remove();
        pause=0;
        menu();	
  
	}
    
})


//menu按鈕音效
var buttona=()=>{
    var buttonaa = new Audio('./audio/按鈕音-12.mp3');
    buttonaa.play();
    buttonaa.currentTime=0;
}

//清除menu
var clearmenu=()=>{
    $('#menu').remove();
}


//地圖大小
var arraysize=6;
var position = new Array(arraysize);
for( i=0 ; i<arraysize ; i++ ){
     position[i] = new Array(arraysize);
     for(j=0;j<arraysize;j++){
         position[i][j]=0;
     }
}
//建立場地
var playground=(id)=>{
   
    for(i=0;i<arraysize ; i++ ){
    var gameline=$('<div></div>').addClass('gameline gl'+arraysize).attr('id','gline'+i);
    $(id).append(gameline);
        for(j=0;j<arraysize ; j++ ){
            var gameblock=$('<div></div>').addClass('gameblock gb'+arraysize).attr({'id':'gblock'+i+j,'style':' background-image: url(./img/草地塊.png);'}); 
            $('#gline'+i).append(gameblock);
        }
    }
  
}

//遊戲介面
var gameview = () =>{
    
    var gamemain = $('<div></div>').addClass('gamemain').attr('id','gmain');
    $('#gview').append(gamemain);
    var gamebar = $('<div></div>').addClass('gamebar').attr('id','gbar');
    var gameplayground=$('<div></div>').addClass('gameplayground').attr('id','gplayground');
    var ggameblock=$('<div></div>').addClass('ggameblock').attr('id','ggblock');
    $('#gmain').append(gamebar,gameplayground);
    $('#gplayground').append(ggameblock);
    playground('#ggblock');
    gamebarformat();
}



//遊戲bar

var gamebarformat = () =>{
    var pausebtn=$('<button></button>').addClass('pausebtn').attr('id','pausebtn');
    var levelv=$('<div></div>').addClass('levelv').attr('id','levelv').text('Level: 0');
    var scorev=$('<div></div>').addClass('scorev').attr('id','scorev').text('Score: 0 分');
    var catchv=$('<div></div>').addClass('catchv').attr('id','catchv').text('0/0');
    var gtimev=$('<div></div>').addClass('gtimev').attr('id','gtimev').text('time: 0 s');
    var pause=$('<svg class="bi bi-pause-fill pause" viewBox="0 0 20 20"fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>').attr({'id':pause});
    
    $('#gbar').append(levelv,scorev,catchv,gtimev,pausebtn);
    $('#pausebtn').append(pause);
    $('#gtimev').html('time: '+gtime +' s');
    $('#catchv').html(bugnumc+'/' +bugnum);
    $('#levelv').html('Level: ' +level);
}



//暫停頁面
var pausemenu=()=>{
    var pausemback=$('<div></div>').addClass('pausemback').attr('id','pausemback');
    $('#gmain').append(pausemback);
    var pausem=$('<div></div>').addClass('pausem').attr('id','pausem');
    $('#pausemback').append(pausem);
    var pausew=$('<div></div>').text('Pause').addClass('gname');
    var presume=$('<button></button>').text('繼續').addClass('pmbtn').attr('id','presume'); 
    var prestart=$('<button></button>').text('重新').addClass('pmbtn').attr({'id':'prestart','onclick':'buttona()'});
    var pexit=$('<button></button>').text('離開').addClass('pmbtn').attr({'id':'pexit','onclick':'buttona()'});
    $('#pausem').append(pausew,presume,prestart,pexit);
}
//暫停按鈕
$(document).on('click','#pausebtn',() =>{
    // alert("暫停");
    buttona();
    pause=1;
    pausemenu();
}
)
//繼續遊戲
$(document).on('click','#presume',() =>{ 
    buttona();
    pause=0; 
    $('#pausemback').remove();
    
}
)
//重新開始遊戲
$(document).on('click','#prestart',() =>{  
    var crestart=confirm('確定要重新開始遊戲？');
	if (crestart==true){
        gameplaying=0;
        
        $('#gmain').remove();
        pause=0;
        gameplaying=0;
        clearplayground();
        gamestartI(); 

	}
    
})

//離開遊戲
$(document).on('click','#pexit',() =>{  
    var cexit=confirm('確定要結束遊戲？');
	if (cexit==true){
        gameplaying=0;
        gtime=120;
        $('#gmain').remove();
        pause=0;
        menu();	
  
	}
    
})

//人物面向
  var face ="front";
  var characterposition=[0,0];
  var characterpicture =$('<img>').addClass('characterpicture').attr({'id':'characterp','src':'./img/' +face + '.png'});
//人物位置初始化
function characterpI(){
    var character = $('<div></div>').addClass('characterfront').attr('id','character');
    $('#gblock'+characterposition[0]+characterposition[1]).append(character);
    
    $('#character').append(characterpicture);
}
//人物移動
var charactermove =(x,y) =>{
    var character = $('<div></div>').addClass('characterfront').attr('id','character');
    $('#character').remove();
    characterposition[0]=characterposition[0]+x;
    characterposition[1]=characterposition[1]+y;
    $('#gblock'+characterposition[0]+characterposition[1]).append(character);
    $('#character').append(characterpicture);
}
//判斷按鍵用
// document.onkeydown=(e)=>{  
//     var keyNum=window.event ? e.keyCode :e.which;console.log(keyNum);} 

//js跟用jquery 取出來的值好像不大一樣? 下面用jquery
$(document).keypress((e)=>{ 
    console.log(e.keyCode);
    console.log(face);
    }); 
//中文輸入跟英文輸入的值也不一樣
$(document).keypress((e)=>{ 
    // switch(e.keyCode) { 
    // case 97:  //A 左
     // return; 
    // case 115:  //S 下
    // alert('下');
    // return;  
    // case 119:  //W 上 
    // alert('上'); 
    // return; 
    // case 100:  //D 右 
    // alert('右'); 
    // return; 
    // } 
    //A 左
    if(pause==0){
    if(e.keyCode==97 & $('#ggblock').length != 0){
        // alert('左');
        if(face!= 'left'){
            face ='left';
            facec();
        }
        else if(characterposition[1]!=0 ){
            if(position[characterposition[0]][characterposition[1]-1]==0 ){
                charactermove(0,-1);
                bugvolum();
                // Walks();
            }
        }
        
        return;
    }
    //S 下
    else if(e.keyCode==115 & $('#ggblock').length != 0){
        // alert('下');
        if(face!= 'front'){
            face ='front';
            facec();
        }
        else if(characterposition[0]!=arraysize-1 ){
            if(position[characterposition[0]+1][characterposition[1]]==0 ){
                charactermove(1,0);
                bugvolum();
                 // Walks();
            }
        }
        return;
    }
    //W 上 
    else if(e.keyCode==119 & $('#ggblock').length != 0){
        // alert('上');
        if(face!= 'back'){
            face ='back';
            facec();
        }
        else if(characterposition[0]!=0 ){
            if(position[characterposition[0]-1][characterposition[1]]==0 ){
                charactermove(-1,0);
                bugvolum();
                 // Walks();
            }
        }
        return;
    }
    //D 右 
    else if(e.keyCode==100 & $('#ggblock').length != 0){
        // alert('右');
        if(face!= 'right'){
            face ='right';
            facec();
        }
        else if(characterposition[1]!=arraysize-1 ){
            if(position[characterposition[0]][characterposition[1]+1]==0 ){
                charactermove(0,1);
                bugvolum();
                 // Walks();
            }
        }
        return;
    }
    //enter  挖填洞

    else if(e.keyCode==13 & $('#ggblock').length != 0){
        // //左
        if(face=='left' & characterposition[1]!=0){
            if(position[characterposition[0]][characterposition[1]-1]==0){
                position[characterposition[0]][characterposition[1]-1]= 9;
                $('#gblock'+characterposition[0]+(characterposition[1]-1)).attr('style',' background-image: url(./img/草地塊洞.png);');
            }
        
            else if(position[characterposition[0]][characterposition[1]-1]==9){
                position[characterposition[0]][characterposition[1]-1]= 0;
                $('#gblock'+characterposition[0]+(characterposition[1]-1)).attr('style',' background-image: url(./img/草地塊.png);');
            }
        }
        // //右
        if(face=='right' & characterposition[1]!=(arraysize-1)  ){
            if(position[characterposition[0]][characterposition[1]+1]==0){
                position[characterposition[0]][characterposition[1]+1]= 9;
                $('#gblock'+characterposition[0]+(characterposition[1]+1)).attr('style',' background-image: url(./img/草地塊洞.png);');
            }

            else if(position[characterposition[0]][characterposition[1]+1]==9 ){
                position[characterposition[0]][characterposition[1]+1]= 0;
                $('#gblock'+characterposition[0]+(characterposition[1]+1)).attr('style',' background-image: url(./img/草地塊.png);');
            }

        }
        // 上
        if(face =='back' & characterposition[0]!= 0  ){
            if(position[(characterposition[0]-1)][characterposition[1]]== 0){
                console.log('上挖洞');
                $('#gblock'+(characterposition[0]-1)+characterposition[1]).attr('style','background-image: url(./img/草地塊洞.png);');
                position[characterposition[0]-1][characterposition[1]]= 9;
            }
            else if(position[(characterposition[0]-1)][characterposition[1]]== 9){
                console.log('上填洞');
                $('#gblock'+(characterposition[0]-1)+characterposition[1]).attr('style','background-image: url(./img/草地塊.png);');
                position[characterposition[0]-1][characterposition[1]]= 0;    
            }
        }
        
        //下
        if(face =='front' & characterposition[0] < (arraysize-1) ){
            if(position[(characterposition[0]+1)][characterposition[1]]== 0){ 
                console.log('下挖洞');
                $('#gblock'+(characterposition[0]+1)+characterposition[1]).attr('style','background-image: url(./img/草地塊洞.png);');
                position[characterposition[0]+1][characterposition[1]]= 9;
            }
            else if(position[(characterposition[0]+1)][characterposition[1]]== 9){ 
                console.log('下填洞');
                $('#gblock'+(characterposition[0]+1)+characterposition[1]).attr('style','background-image: url(./img/草地塊.png);');
                position[characterposition[0]+1][characterposition[1]]= 0;
            } 
              
       
    }
   
    
    bugmccheck();
        return;
    }
    else if(e.keyCode==39 & $('#levelbtn').length != 0){
        nextlevel();
    }
    }
    });
 //太吵了先不要
// var walks = new Audio("./audio/walks.mp3");
// function Walks(){
//     walks.play();
//     walks.currentTime=0;
//     }


var facec=()=>{ 
    
        $('#character').removeClass().addClass('character'+face)
        $('#characterp').attr('src', './img/' +face + '.png')
}
var  boxpx = new Array(arraysize);
var  boxpy = new Array(arraysize);
//螻蛄設定
var bugpositionset=()=>{
    boxpx = RandomArray(0,5,100);
    boxpy = RandomArray(0,5,100);
        for(i=0;i<bugnum;i++){
            bugposition[boxpx[i]][boxpy[i]]=1;
            if(i<4){
                var mcsound = $('<audio></audio>').addClass('mcsound').attr({'src':'./audio/螻蛄.mp3','loop':'true','autoplay':'true','id':'mcsound'+i});
                $('#gblock'+boxpx[i]+boxpy[i]).append(mcsound);
            }

        }
    console.log(boxpx,boxpy);
    
}
//捕捉判定
var bugmccheck =()=>{
    var tmc=2000;
    for(i=0;i<bugnum;i++){
        if(position[boxpx[i]][boxpy[i]]==9 & bugposition[boxpx[i]][boxpy[i]]==1){
            if(i<4){ 
                score+=1;
                bugnumc+=1;
                bugmcc+=1;
                $('#scorev').html('Score: '+score +' 分');
                $('#catchv').html(bugnumc+'/' +bugnum);
                var mc = $('<img></img>').addClass('mc').attr({'src':'./img/螻蛄.png','id':'mc'+i});
                $('#gblock'+boxpx[i]+boxpy[i]).append(mc);
                $('#mc'+i).animate({'margin-top':'0%'},tmc);
                let x=boxpx[i];
                let y=boxpy[i];
                position[x][y]=10;
                setTimeout(() => {
                    $('#gblock'+x+y).empty();
                    bugposition[x][y]=0;
                    position[x][y]=9;
                    levelincreasebtn();
                },2000); 
                // $('audio').remove('#mcsound'+i);
                if(mcc==0){
                    mcc=1;
                    bugcheckf();
                }
            }
            else{ 
                score+=2;
                bugnumc+=1;
                $('#scorev').html('Score: '+score +' 分');
                $('#catchv').html(bugnumc+'/' +bugnum);
                var gm = $('<img></img>').addClass('gm').attr({'src':'./img/雞母蟲.png','id':'gm'+i});
                $('#gblock'+boxpx[i]+boxpy[i]).append(gm);
                $('#gm'+i).animate({'margin-top':'0%'},tmc);
                let x=boxpx[i];
                let y=boxpy[i];
                position[x][y]=10;
                setTimeout(() => {
                    $('#gblock'+x+y).empty();
                    bugposition[x][y]=0;
                    position[x][y]=9;
                    levelincreasebtn();
                   },2000); 
                   if(gmc==0){
                    gmc=1;
                    bugcheckf();
                }
                }
            
        };
    
    }

}
//關卡判定
var levelincreasebtn =()=>{
    if(bugmcc==bugmc){
        var levelbtn=$('<button></button>').text('下一關').addClass('levelbtn').attr({'id':'levelbtn','onclick':'buttona()'});
        $('#gplayground').append(levelbtn);
    }
}
//下一關
$(document).on('click','#levelbtn',() =>{  
  nextlevel();
})
//下一關
var nextlevel =()=>{
    level++;
    clearplayground();
    if(bugmc<4){
        bugmc++;
    }
    if(bugnum<=arraysize){
        bugnum++;
    }
    bugnumc=0;
    bugmcc=0;
    bugpositionset();
    bugvolum();
    $('#catchv').html(bugnumc+'/' +bugnum);
    $('#levelv').html('Level: ' +level);
    $('#levelbtn').remove();
}
//聲音設置
var bugvolum =()=>{
    for(i=0;i<bugnum;i++){
        if(distant(boxpx[i],boxpy[i]) == 0){
            $('#mcsound'+i).prop("volume", 1);
        }
        else if (distant(boxpx[i],boxpy[i]) ==1){
            $('#mcsound'+i).prop("volume", 0.57);
        }
        else if (distant(boxpx[i],boxpy[i]) ==2){
            $('#mcsound'+i).prop("volume", 0.23);  
        }
        else{
            $('#mcsound'+i).prop("volume", 0);
        }
    
    }
}
//遠近判斷
var distant=(x,y)=>{
   var distantcb=Math.abs(characterposition[0]-x)+Math.abs(characterposition[1]-y);
   console.log(distantcb);
   return distantcb;
}
//蟲蟲位置
var bugposition = new Array(arraysize);
for( i=0 ; i<arraysize ; i++ ){
     bugposition[i] = new Array(arraysize);
     for(j=0;j<arraysize;j++){
         bugposition[i][j]=0;
     }
}
//清除場地狀態
var clearplayground=()=>{
    for( i=0 ; i<arraysize ; i++ ){
        for(j=0;j<arraysize;j++){
            $('#gblock'+i+j).attr('style','background-image: url(./img/草地塊.png);');
            position[i][j]= 0;
        }
}
}


/*測試區的按鈕*/
    //按鈕清除menu
$('#cmbtn').click(() =>{
    alert("清除menu" );
    clearmenu();
})
  //按鈕建立menu，沒有menu時才建立
$('#bmbtn').click(() =>{
   
    if($('#menu').length == 0){
        alert("建立menu" );
        menu();
    }
    else{
        alert("menu已存在" );
    }
   
})
//全是洞
$('#bhbtn').click(() =>{
    alert("全是洞" );
    for( i=0 ; i<arraysize ; i++ ){
        for(j=0;j<arraysize;j++){
            $('#gblock'+i+j).attr('style','background-image: url(./img/草地塊洞.png);');
            position[i][j]= 9;
        }
   }
}
)

  //清除洞
$('#chbtn').click(() =>{
    alert("清除洞" );
    for( i=0 ; i<arraysize ; i++ ){
        for(j=0;j<arraysize;j++){
            $('#gblock'+i+j).attr('style','background-image: url(./img/草地塊.png);');
            position[i][j]= 0;
        }
   }
}
)
  
  //開叫聲+1隻
$('#mcsbtn').click(() =>{
    if($('#gmain').length!=0){
        alert("螻蛄叫+1個" );
        var mcsound = $('<audio></audio>').addClass('mcsound').attr({'src':'./audio/螻蛄.mp3','loop':'true','autoplay':'true','id':'mcsound'});
        $('#gmain').append(mcsound);
    }
    else{
        alert("遊戲開始後才有效" ); 
    }
   
}
)

//叫聲刪一個
$('#mcscbtn').click(() =>{
    alert("螻蛄叫刪除1個" );
    $('#mcsound').remove();
    for(i=0;i<bugnum;i++){
        $('#mcsound'+i).remove();
    }
}
)
//叫聲刪全部
$('#mcscabtn').click(() =>{
    alert("螻蛄叫全刪除" );
    $('audio').remove('#mcsound');
}
)
//time=120
$('#tpbtn').click(() =>{
   gtime=120;
}
)
//time=12
$('#tmbtn').click(() =>{
    gtime=12;
 }
 )
$('#bmcbtn').click(() =>{
    mcc=1;
    bugcheckf();
 }
 )
$('#bgmbtn').click(() =>{
    gmc=1;
    bugcheckf();
 }
 )


/** 
 * 隨機序列函式序
 * 參考自kChen老師
 * 0.1
*/
var RandomInt = (start, end) => {
    // 計算放大的倍數
    let n = end - start + 1
    // 放大
    r = Math.random() * n
    // 無條件捨去
    r = Math.floor(r)
    // 位移到 start
    r = r + start
    return r
}
var is_end=false;

/**
 * 產生從 start 到 end 的整數亂數，每次執行打亂 Times 次
 * @param {number} start 亂數起始數值
 * @param {number} end  亂數結束數值
 * @param {number} Times 打亂的次數
 * @returns {number} 一個從start到end的整數亂數
 */
var RandomArray = (start, end, Times)=>{
    var randomArray = []
    for (let i = 0; i <end + 1; i++) {
        randomArray.push(i)
    }
    for (let i = 0; i < Times; i++) {
        // 隨機取出[r] 並與[0]交換
        let r = RandomInt(start, end)
        let temp = randomArray[r]
        randomArray[r] = randomArray[0]
        randomArray[0] = temp
    }
    return  randomArray;
}

