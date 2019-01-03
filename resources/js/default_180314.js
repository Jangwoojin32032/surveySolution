$(function(){
	
	var $body = $("body");
	var $wrap = $("#wrap");
	var $container = $("#container");
	
	
	
	if($container.outerWidth() >  1083){ 
		$body.removeClass("mobile tablet").addClass("web");
	} 
	else if($container.outerWidth() >  743){ 
		$body.removeClass("web mobile").addClass("tablet");
	} 
	else {
		$body.removeClass("web tablet").addClass("mobile");
	};

	$(window).resize(function(){
		if($container.outerWidth() >  1083){ 
			$body.removeClass("mobile tablet").addClass("web");
		} 
		else if($container.outerWidth() >  743){ 
			$body.removeClass("web mobile").addClass("tablet");
		} 
		else {
			$body.removeClass("web tablet").addClass("mobile");
		};
	});
	$(window).scroll(function() {
		if( $("body").hasClass("web") ) {
			if( $("#container").offset().top - $(window).scrollTop() <= -42 ) {
				$("#container").addClass("fixed");
			} else {
				$("#container").removeClass("fixed");
			}
		};
	});
	
	/*var gnbCrt1 = $("#gnb>li:nth-child(" + (gnbDep1) + ")");
	var gnbCrt2 = $("#gnb>li:nth-child(" + (gnbDep1) + ") ul li:nth-child(" + (gnbDep2) + ") a");
	if(gnbCrt1) gnbCrt1.addClass("on");
	if(gnbCrt2) gnbCrt2.addClass("on");*/
	
	
	/**header**/
	//w
	$("#gnb").hover(function(){
		$("nav").stop().animate({ 'height':'100px',opacity:1},500, 'easeOutExpo');
	});
	$("header").mouseleave(function(){
		$("nav").stop().animate({ 'height':'56px',opacity:1},500, 'easeOutExpo');
	});
	//m
	$("#btn_menu").click(function(){
		$("#btn_close, #nav_bg").fadeIn(300);
		$("header nav").addClass("open");
	});
	$("#btn_close,#nav_bg").click(function(){
		$("#btn_close, #nav_bg").fadeOut(300);
		$("header nav").removeClass("open");
		$("#gnb>li").removeClass("on").next("ul").slideUp(200);
		if(gnbCrt1) gnbCrt1.addClass("on");
	});
	$("#gnb>li>a").click(function(){
		if($body.hasClass("web")) {
		} else {
			$(this).parents("li").toggleClass("on").next("ul").slideToggle(200);
			$("#gnb>li>a").not(this).parents("li").removeClass("on").next("ul").slideUp(200);
			return false;
		}
	});
	
	
	
	 function ckt(var1,var2,var3){
			var inputText = "." + var1;
			var labelText = "." + var2;
			var divMotion = "." + var3;
			$(labelText).click(function(){
				$(inputText).focus();
			});
			$(inputText).focus(function(){
				$( labelText+','+divMotion ).addClass( 'on' );
			});
			$(inputText).blur(function(){
				var qwe = $(inputText).val().trim().length;  
				if( qwe > 0 ){
					$( labelText+','+divMotion ).addClass( 'on' );	
				}else if( qwe == 0 ){	
					$( labelText+','+divMotion ).removeClass( 'on' );	
					$(inputText).val('');
				} 
			});
		};
		
		$('input').each(function(index,value){
			var a = "inputText" + (index+1);
			var b = "labelText" + (index+1);
			var c = "divMotion" + (index+1);	
			ckt(a,b,c);
		});  
	
		
		
		
		
		

		/* $('.tabList dd:first-child div>div:nth-child(2)').attr('class','on'); */
		$('[class^=tabago]').hide();
		/* $('[class^=tabago]').eq(0).show(); */
		$('.tabList dd').click(function(){
			var liIndex = $(this).index();
			$('[class^=tabago]').hide();
			$('[class^=tabago]').eq(liIndex).show();
			  
			var tabLiIndex = liIndex + 1 ;
			$('.tabList dd:nth-child('+ tabLiIndex +') div>div:nth-child(2)').attr('class','on');
			$('.tabList dd:not(:nth-child('+ tabLiIndex +')) div>div:nth-child(2)').attr('class','');
		});
		
		
		
		
		
		/* 레이아웃 */
		var con = $('.layout');
		$(document).mouseup(function(e){
			if(con.has(e.target).length==0) {
				con.hide();
				$('body').css('overflow','auto');
			}
		});
		$('.cancel').click(function(){
			con.hide();
			$('body').css('overflow','auto');
		});
		
		
		
		
		$('.tabMenu li:first-child a:first-child').attr('class','qwe');
		$('[class^=tabgo]').hide();
		$('[class^=tabgo]').eq(0).show();
		
		$('.tabMenu li').click(function(){
			var liIndex = $(this).index();
			$('[class^=tabgo]').hide();
			$('[class^=tabgo]').eq(liIndex).show();
			  
			var tabLiIndex = liIndex + 1 ;
			$('.tabMenu li:nth-child('+ tabLiIndex +') a:first-child').attr('class','qwe');
			$('.tabMenu li:not(:nth-child('+ tabLiIndex +')) a:first-child').attr('class','');
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		


});