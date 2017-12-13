var height_V = $("#center_div").height();
function add_menu(name,url,id,drop){
	$('#'+drop).css('visibility','hidden');
	$('#'+drop).parent().addClass('click-cur').siblings().removeClass('click-cur1').removeClass('click-cur');
	if($("#south_div #" + id + '_menu').length==0){
		$("#south_div").append('<div class="cur-item'+id+'" id="'+id+'_menu" parentMenuID="'+ $('#'+drop).parent().attr('id') +'">'+name+'<b class="close-tab" onclick="closeTab(this)">x</b></div>');
		menu_opacity(id);
		var content = '<iframe scrolling="no" id="centerIframe-'+id+'" frameborder="no" frameborder="0" marginwidth="0" marginheight="0"  src="'+url+'" style="width:100%;height:'+(height_V-5)+'px;"></iframe>';
		$("#center_div iframe").hide();
		$("#center_div").append(content);
	}else{
		$("#center_div iframe").hide();
		$("#centerIframe-" + id).show();
		menu_opacity(id);
	}
}

function menu_opacity(id){
	$("#south_div div").attr('class','item'); 
	$("#south_div #" + id +"_menu").attr('class','cur-item'); 
}

$(function(){
	height_V = $("#center_div").height();
	if(height_V < 700){
		height_V = 700;
	}
	$("#height_default").height(height_V);
	
	$('.nav-box li').hover(function(){
		$('.nav-box li.click-cur').removeClass('click-cur').addClass('click-cur1');	
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).find('div.dropbox').css('visibility','visible');
	},function(){
		var curLi = $('.nav-box li.cur');
		$('.nav-box li.click-cur1').removeClass('click-cur1').addClass('click-cur');
		$('.nav-box li').removeClass('cur');
		$(this).find('div.dropbox').css('visibility','hidden');
	});
	var body_height = $(document.body).height();
	
	$(window).resize(function(){
		var body_height_v = body_height-$(document.body).height();
		if(body_height_v > 0){
			$("#center_div").height($("#center_div").height()-body_height_v);
		}else if(body_height_v < 0){
			$("#center_div").height($("#center_div").height()-body_height_v);
			$("#center_div iframe").height($("#center_div").height());
		}
	});
});

$("#south_div").delegate("div","mouseover",function(){
    $("#center_div iframe").hide();
	var id = $(this).attr("id").split("_")[0];
	$("#centerIframe-" + id).show();
	menu_opacity(id);
	
	var parentMenuID = $(this).attr('parentMenuID');
	$('#'+parentMenuID).addClass('click-cur').siblings().removeClass('click-cur1').removeClass('click-cur');	
});
function closeTab(obj){
	var parentMenuID = $(obj).parent().prev().attr('parentMenuID');
	$('#'+parentMenuID).addClass('click-cur').siblings().removeClass('click-cur1').removeClass('click-cur');
	
	$(obj).parent().prev().attr('class','cur-item');
	$(obj).parent().remove();
	var parentID = $(obj).parent().attr('id').split("_")[0];
	$('#centerIframe-'+ parentID).prev().css('display', 'block');
	$('#centerIframe-'+ parentID).remove();
}