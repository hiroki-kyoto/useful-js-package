/*******************
1.�������ʵ�ֵ�Ч
����ͼƬ�İ�ɫ����
�鿴��ͬʱͨ������
ͼƬ���ع��̣��ﵽ
�Ϻõ��Ӿ�ƽ���ȡ�
2.�������õ���:
jquery-1.8.0��ܡ�
3.������ģ��oop��
���е��ࡣ��ʵ����
һ����Ϲ���������
4.���Ҫʹ�ñ�����
ʵ����ص�Ч������
���ر����򸽴���ͼ
Ƭ�������Լ�������
��ͼƬ��
5.��$_chao������ͼ
Ƭ��className����
ͼƬ��tagName:img.
6.���磺
$_chao('img')
		.Method
	.bindEvent();
���磺
$_chao('.slide')
		.Method
	.bindEvent();

���ߣ���
ʱ�䣺2012-11-27
*******************/
var $_chao = function(str){
	//���������Ա��
	this.objArray = $(str);
	var the = this;
	//���徲̬��Ա��
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
	//���干���Ա������
	if(!$_chao.Method){
		$_chao.Method = [];
	}	//��������ջ
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
	}//����µķ���
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
	}//ɾ��һ�����з���
	//Ϊ������ջ�����궯���󶨷�����
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
	//���ͼƬ�仯Ч��������
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
//������method ȡ��prototype,
//��Ϊ�˱���js�ĸ��Ӽ̳й�ϵ,
//��ʵ��Ҳ��Ϊ�˱����µ�js��
//����̨ʱ��ԭ��ȥ���ķ���
//��һ��ʵ����
$_chao('img').Method.bindEvent();
