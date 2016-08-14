	function getByClassName(obj,cls){
		var elements=obj.getElementsByTagName("*");
		var results=[];
		for(var i=0;i<elements.lenght;i++){
			if(elements[i].className==cls){
				results.push(elements[i]);
			}
		}
		return results;
	}

	function hasClass(obj,cls){
		return obj.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"));
	}
	function removeClass(obj,cls){
		if(hasClass(obj,cls)){
			var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)");
			obj.className=obj.className.replace(reg,"");
		}
	}
	function addClass(obj,cls){
		if(!hasClass(obj,cls)){
			obj.className+=" "+cls;
		}
	}

	window.onload=function(){
		window.onscroll=function(){
			var top=document.documentElement.scrollTop||document.body.scrollTop;//获取滚动条距离顶部的值
			var anchors=document.getElementById("anchor").getElementsByTagName("a");

			//var boxs=getByClassName(document.getElementById("bigclass"),"box");
			//var boxs=document.getElementById("bigclass").getElementsByClassName("box");
			var boxs=document.getElementsByClassName("box");//为了获取顶部的box,遍历了整个dom
			var header=document.getElementById("class0");
			//boxs.unshift(header);//getElementsByClassName返回只是一个伪数组，HTMLCollection,只有x.length和x.[]这两个能用
			//console.log(boxs);
			var currentId="";
			for(var i=0;i<boxs.length;i++){
				var _box=boxs[i];
				var boxTop=_box.offsetTop;
				if(top>boxTop-200){//top>boxTop-200
					currentId=_box.id;
				}else{
					break;//省效率
				}
			}
			if(currentId){
				//为anchor加上一个类
				for(var j=0;j<anchors.length;j++){
					var _anchor=anchors[j];
					var href=_anchor.href.split("#");
					if(href[href.length-1]!=currentId){
						//_anchor.removeClass("anchor_current");
						removeClass(_anchor,"anchor_current")
					}else{
						//_anchor.addClass("anchor_current");
						addClass(_anchor,"anchor_current")
					}

				}
			}

		}
	}