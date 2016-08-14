//window.onload=function(){
	//console.log("aaa");
	//页面加载完成后才获取元素
    var container=document.getElementById("carouse_container");
    var list=document.getElementById("carouse_list");
    var buttons=document.getElementById("carouse_buttons");
    var spans=buttons.getElementsByTagName("span");
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    var index=1;//显示第几张图
    var timer;//存放定时器

    var animated=false;//存放图片是否在移动,



    function showButton(){
    			for(var i=0;i<spans.length;i++){
    				if(spans[i].className=='on'){
    					spans[i].className='';
    				}

    			}

    			spans[index-1].className="on";

    		}
    			
 		//通过改变left的值来切换图片
    		function animate(offset){
    			animated=true;
    			
    			var newLeft=parseInt(list.style.left)+offset;
    			//console.log(newLeft);

    			// list.style.left=parseInt(list.style.left)+offset+'px';//没有设置动画之前直接赋值
    			// if(newLeft>-1000){
    			// 	//animated=false;
    			// 	list.style.left=-5000+'px';
    			// }
    			// if(newLeft<-5000){
    			// 	//animated=false;
    			// 	list.style.left=-1000+'px';
    			// }

    			var time=500;//位移总时间
    			var interval=10;//位移间隔时间
    			var speed=offset/(time/interval);//每次位移量=偏移量/位移的次数
    			//每次偏移量要是一个整数，否则图片显示有偏移

    			function go(){
    				//speed小于0，向左移动
    				if( (speed<0 && parseInt(list.style.left)>newLeft)||(speed>0 &&parseInt(list.style.left)<newLeft)){
    					list.style.left=parseInt(list.style.left)+speed+'px';
    					setTimeout(go,interval);
    				}else{
    					animated=false;
    					//边界检测
		    			if(newLeft>-1000){
		    				list.style.left=-5000+'px';
		    			}
		    			if(newLeft<-5000){
		    				list.style.left=-1000+'px';
		    			}
    				}
    			}
    			go();//调用go函数
    		}

    		//点击右箭头
    		next.onclick=function(){
    			if (animated) {
                    return;
                }

    			if(index==5){
    				index=1;
    			}else{
    				index+=1;
    			}
    			
    			showButton();
    			// if(!animated){
    			// 	animate(-600);
    			// }
    			animate(-1000);
    			
    		}
    		//点击左箭头
    		prev.onclick=function(){
    			if (animated) {
                    return;
                }
    			if(index==1){
    				index=5;
    			}else{
    				index-=1;
    			}
    			
    			showButton();
    			animate(1000);
    		}
    		//	点击小圆点
    		for(var i=0;i<spans.length;i++){
    			spans[i].onclick=function(){
    				if (animated) {
                    return;
                	}
    				if(this.className=='on'){
    					return;//点击同样的小圆点，不重新操作
    				}
    				var myIndex=parseInt(this.getAttribute("index"));//获取自定义属性和DOM本身属性
    				var offset=-1000*(myIndex-index);
    				animate(offset);
    				index=myIndex;
    				showButton();
    			}
    		}
    		//自动播放
    		function play(){
    			timer=setInterval(function(){
    				next.onclick();
    			},2000);
    			console.log("play");
    		}
    		//
    		function stop(){
    			clearInterval(timer);
    			console.log("clear");
    		}
    		container.onmouseover=stop();
    		container.onmoueout=play();
//}