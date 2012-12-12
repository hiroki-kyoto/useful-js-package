/*******************
1.本程序段实现的效
果是图片的暗色背景
查看，同时通过隐藏
图片加载过程，达到
较好的视觉平滑度。
2.本程序用的是:
jquery-1.8.0框架。
3.程序中模拟oop编
程中的类。其实就是
一个混合工厂函数。
4.如果要使用本程序
实现相关的效果，请
下载本程序附带的图
片。或者自己制作相
关图片。
5.在$_chao参数是图
片的className或者
图片的tagName:img.
6.例如：
$_chao('img')
		.Method
	.bindEvent();
再如：
$_chao('.slide')
		.Method
	.bindEvent();

作者：向超
时间：2012-11-27
*******************/
var $_chao = function(str){
	//定义独立成员：
	this.objArray = $(str);
	var the = this;
	//定义静态成员：
	if(!$_chao.MethodList){
		$_chao.MethodList = [];
	}
	if(!$_chao.toString){
		$_chao.toString = function(){
			return "[object class]";
		}
	}
	if(!$_chao.BindObjNum){
		$_chao.BindObjNum = 1;
	}
	else{$_chao.BindObjNum++;}
	//定义共享成员方法：
	if(!$_chao.Method){
		$_chao.Method = [];
	}	//创建方法栈
	if(!$_chao.addMethod){
		$_chao.addMethod = 
			function(methodName,functionBody){
				if(typeof(functionBody)
					!=='Function'){
					var msg = {
						'errorName': "type error: ",
						'detail': "In $_chao.addMethod,"+ 
					"the second function parameters should be function."
					};
					if(console){console.log(msg);}
					else {alert(msg);}
				}
				$_chao.Method[methodName.toString()]
					= functionBody;
		}
	}//添加新的方法
	if(!$_chao.deleteMethod){
		$_chao.deleteMethod =
			function(methodName){
			if(typeof($_chao.Method[methodName.toString()])=='undefined'){
				var msg = {
						'errorName': "type error: ",
						'detail': "In $_chao.Method,"+ 
					"no method named "+methodName.toString()+"found."+
							"--deleteMethod error!"
					};
					if(console){console.log(msg);}
					else {alert(msg);}
			}
			$_chao.Method[methodName] = null;
		}
	}//删除一个已有方法
	//为方法堆栈添加鼠标动作绑定方法：
	$_chao.Method['bindEvent'] = function(){
		for(var i=0;i<the.objArray.length;i++){
			(function(o){
				$(o).css('cursor', 'pointer');
				$(o).mouseover(function(){
					$(this).css('opacity', 0.95);
				});	
				$(o).mouseout(function(){
					$(this).css('opacity', 1);
				});	
				$(o).click(function(){
					var smallImage = $(this);
					var oldsrc = smallImage.attr('src');
					$_chao.Method.connectOrigin(smallImage, function(){
						$_chao.Method.outstandImg(function(){
							$_chao.Method.placeImage(oldsrc, function(){
							//$_chao.Method.allowSlide();
							});	
						});
					});
				});
			})(the.objArray[i])
		}
			return $_chao.Method;
	}
	//BindEvent Method end.
	//添加图片变化效果方法：
	$_chao.Method['connectOrigin'] = function(obj, func){
		if($(obj).attr('isloaded')==='1'){ setTimeout(func, 10); return;}
		$(obj).attr('isloaded', '1');
		$('<img src="' + $(obj).attr('src').replace('.jpg','o.jpg') +
			'" style="display:none;" id='+ $(obj).attr('src') +' />')
			.appendTo($('#storage'));
		setTimeout(func, 10);
	}
	//method_1 ended.
	$_chao.Method['outstandImg'] = function(func){
		// show the state of showing center picture:
		$('body').attr('onshow', '1');
		$('<div style="background-color:#000000;opacity:0.8;" id="cover"></div>')
			.appendTo($('body'));
		$('#cover').css('height', $(document).height())
			.css('width', $(document).width())
		.css('position', 'absolute')
			.css('z-index', 1)
		.css('top','0px');
		$('<img src="./pictures/close.png" id="close" />').appendTo($('#cover'));
		$('<img id="stage" src="./pictures/lazyload.gif" />').appendTo($('body'));
		$('#stage').css('top', $(document).scrollTop());
		$('#stage').css('position', 'absolute')
			.css('z-index', 2)
			.css('left', (parseInt($('#cover').width())-parseInt($('#stage').width()))*0.5+'px');
		$('#close').css('position', 'absolute')
			.css('top', $(document).scrollTop())
				.css('cursor', 'pointer')
					.css('right', '0px')
				.click(function(){
					$(this).remove();
					$('#cover').remove();
					$('body').attr('onshow', '0');
					//hide the picture
					$('#stage').remove();
					$('#back').remove();
					//$('#left').remove();
					//$('#right').remove();
				});
		$(document).scroll(function(){
			if($('body').attr('onshow')==='1'){
				$('#close').css('top', $(this).scrollTop());
			}
		});
		setTimeout(func, 10);
	}
	//method_2 ended.
	$_chao.Method['placeImage'] = function(src, func){
		$('<img id="back" style="display:none;" src="'+ src.replace('.jpg', 'o.jpg') +'" />').appendTo($('body'));
		$('#back').load(function(){
			$('#stage').fadeOut(function(){
				$('#stage').css('left', (parseInt($('#cover').width())-parseInt($('#back').width()))*0.5+'px');
				$('#stage').attr('src', $('#back').attr('src'));
				$('#stage').css('border', '#ffffff 5px solid');
				$('#stage').fadeIn(function(){
					setTimeout(func, 100);
				});
			});
		});
	}
	//method_3 ended.
	$_chao.Method['allowSlide'] = function(){
		$('<img id="left" src="./pictures/left.png" style="display:none;" />'
			+'<img id="right" src="./pictures/right.png" style="display:none;" />')
		.appendTo($('body'));
		var leftCss = {
				'position':'relative',
				'top' : $('#stage').css('top'),
				'float' : 'left',
				'z-index' : 2,
				'left': $('#stage').css('left'),
				'display' : 'block'
		}
		var rightCss = {
				'position':'absolute',
				'top' : $('#stage').css('top'),
				'float' : 'right',
				'z-index' : 2,
				'right': $('#stage').css('left'),
				'display' : 'block'
		}
		$('#stage').mouseover(function(){
			$('#left').css(leftCss);
			$('#right').css(rightCss);
		});
		$('#stage').mouseout(function(){
			$('#left').css('display', 'none');
			$('#right').css('display', 'none');
		});
		$('#left').mouseover(function(){
			$(this).attr('src', './pictures/left1.png');
		});
		$('#left').mouseout(function(){
			$(this).attr('src', './pictures/left.png');
		});
		$('#right').mouseover(function(){
			$(this).attr('src', './pictures/right1.png');
		});
		$('#right').mouseout(function(){
			$(this).attr('src', './pictures/right.png');
		});
	}
	return $_chao;
}
//这里用method 取代prototype,
//是为了避免js的复杂继承关系,
//事实上也是为了避免新的js规
//范出台时将原型去掉的风险
//做一个实例：
$_chao('img').Method.bindEvent();
