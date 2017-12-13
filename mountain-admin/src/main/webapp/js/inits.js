function openEast(url){
	$('#east_iframe').attr('src', url);
	$('.easyui-layout').layout('expand','east');
}
$('#tt').datagrid({	
	onDblClickRow: function(index,rowData){	
		if($("#dblClick").val()=="false"){
			return;
		}
        var pri_key = $("#pri_key").val();
        var menu_name_v = $("#menu_name_v").val();
        $.each(rowData,function(k,v){
			if(k == menu_name_v){
				$("#id_name").val(v);
			}
		});
    	$.each(rowData,function(k,v){
			if(k == pri_key){
				var url = $("#url").val()+"view.dhtml?id_key=" + v;
				var id = v;
				if($("#llsj_"+id).attr("src") == null || $("#llsj_"+id).attr("src") == ""){
					$("#ssjg").hide();
				    $("#tjsj").hide();
					$("#xgsj").hide();
					$("#llsj").show();
					$("#menus_divs").append('<li class="oper-btn" id="llsj_'+id+'_menu"><i class="oper-view-btn"></i><span>浏览【'+$("#id_name").val()+'】</span></li>');
					menu_opacity("llsj_" + id + "_menu");
					var no_yes = "no";
					if($("#scrol_val").val() != null && $("#scrol_val").val() != "" && $("#scrol_val").val() == "yes"){
						no_yes = "yes";
					}
					var content = '<iframe scrolling="'+no_yes+'" id="llsj_'+id+'" frameborder="no" frameborder="0" marginwidth="0" marginheight="0"  src="'+$("#url").val()+'view.dhtml?id_key='+id+'" style="width:100%;height:'+$('#llsj').height()+'px;"></iframe>';
					$("#llsj iframe").hide();
					$("#llsj").append(content);
				}else{
					$("#ssjg").hide();
				    $("#tjsj").hide();
					$("#xgsj").hide();
					$("#llsj").show();
					$("#xgsj").hide();
					$("#llsj iframe").hide();
					$("#llsj_"+id).show();
					menu_opacity("llsj_" + id + "_menu");
				}
			}
		});
	},onRowContextMenu: function(e, rowIndex, rowData){
		if(rowIndex >= 0){
			$('#tt').datagrid('selectRow',rowIndex);
			var pri_key = $("#pri_key").val();
			var menu_name_v = $("#menu_name_v").val();
			
			$.each(rowData,function(k,v){
				if(k == pri_key){
					$("#id_key").val(v);
				}
				if(k == menu_name_v){
					$("#id_name").val(v);
				}
			});
			$('#mm').menu('show', {
			    left: e.pageX,
			    top: e.pageY
			});
		}else{
			$('#mm').menu('show', {
			    left: e.pageX,
			    top: e.pageY
			});
		}
	}
});
$(function(){
	$('#search_button').click(function(){
		if($("#ssjg").is(":visible")){
			if( typeof preSubmitValidator === 'function' ){
                if(preSubmitValidator()) return ;
			}
			var dg = $('#tt');
		    var queryParams =dg.datagrid('options').queryParams; 
		    params_str(queryParams);
		    dg.datagrid('options').queryParams = queryParams;  
		    dg.datagrid('reload'); 
		}
	});
	
	$('#search_clear_button').click(function(){
		$("#searchClear").find("input").each(function(){
		   if(this.type == "text" && this.id != ""){
			   var attr_V = $("#"+this.id).attr("class");
			   if(attr_V.indexOf("easyui-combobox") >= 0){
				   $("#"+this.id).combobox('setValue',$("#"+this.id).attr("title"));
			   }else{
				   $("#"+this.id).textbox("setValue", $("#"+this.id).attr("title"));
			   }
		   }else if(this.type == "radio" && this.name != ""){
			   $("input[name='"+this.name+"']").prop('checked',false);
		   }else if(this.type == "checkbox" && this.name != ""){
			   $("input[name='"+this.name+"']").removeAttr("checked");//取消全选   
		   }
		});
	});
});

$("#menus_divs").delegate("li","click",function(){
    var ids = $(this).attr("id").split("_");
	content_opacity(ids[0]);
	if(ids.length > 2){
		$("#"+ids[0]+" iframe").hide();
		$("#"+ids[0]+"_"+ids[1]).show();
	}
	if("xgsj" == ids[0]){
		menu_opacity($(this).attr("id"));
	}else if("llsj" == ids[0]){
		menu_opacity($(this).attr("id"));
	}else{
		menu_opacity(ids[0]+"_div");
	}
	
});
function content_opacity(id){
	$("#alls_divs").children().hide();
	$("#" + id).show();
}
function menu_opacity(id){
	$("#menus_divs li").removeClass('oper-btn-selec'); 
	$("#menus_divs #" + id).addClass('oper-btn-selec');
}
$("#menus_divs").delegate("li","mouseover",function(){
	var ids = $(this).attr("id").split("_");
	if(ids.length > 2){
		content_opacity(ids[0]);
		$("#"+ids[0]+" iframe").hide();
		$("#"+ids[0]+"_"+ids[1]).show();
		if("xgsj" == ids[0]){
			menu_opacity($(this).attr("id"));
		}else if("llsj" == ids[0]){
			menu_opacity($(this).attr("id"));
		}else{
			menu_opacity(ids[0]+"_div");
		}
	}
});
function menuHandler(item){
	if("add" == item.name){
		content_opacity("tjsj");
		menu_opacity("tjsj_div");
	}else if("del" == item.name || "delAll" == item.name){
		var ck_v = $("#ssjg input:checked");
		if(ck_v.length == 0){
			$.messager.alert('警告','请选择您所要删除的记录','warning');
			return ;
		}
		if(ck_v.length == 1){if(ck_v[0].value =="on"){return ;}}
		$.messager.confirm('删除', '确认要删除？', function(r){
			if (r){
				var del_str = "";
				$(ck_v).each(function (index){
					if(ck_v[index].value!="on"){
						del_str = del_str + ck_v[index].value+",";
					}
				});
				del_str = del_str.substring(0, del_str.length-1);
				ajax_data($("#url").val()+"del.dhtml?id_key="+del_str);
			}
		});
	}else if("query" == item.name || "query_other" == item.name){
		var ck_v = $("#ssjg input:checked");
		if(ck_v.length == 0){
			$.messager.alert('警告','请选择您所要修改的记录','warning');
			return ;
		}
		//修改只能选择一条记录
		var selectLength=1;
		$(ck_v).each(function (index){
			if(ck_v[index].value=="on"){
				selectLength++;
			}
		});
		if(ck_v.length >selectLength){
			$.messager.confirm('修改数据', '请选择一条记录！', function(r){});
			return ;
		}
		var id = $("#id_key").val();
		if($("#xgsj_"+id).attr("src") == null || $("#xgsj_"+id).attr("src") == ""){
			content_opacity("xgsj");
			$("#menus_divs").append('<li class="oper-btn" id="xgsj_'+id+'_menu"><i class="oper-edit-btn"></i><span>编辑【'+$("#id_name").val()+'】</span></li>');
			menu_opacity("xgsj_" + id + "_menu");
			var no_yes = "no";
			if("query_other" == item.name){
				no_yes = "yes";
			}
			var content = '<iframe scrolling="'+no_yes+'" id="xgsj_'+id+'" frameborder="no" frameborder="0" marginwidth="0" marginheight="0"  src="'+$("#url").val() + 'query.dhtml?id_key='+$("#id_key").val()+'" style="width:100%;height:'+$('#xgsj').height()+'px;"></iframe>';
			$("#xgsj iframe").hide();
			$("#xgsj").append(content);
		}else{
			content_opacity("xgsj");
			$("#xgsj iframe").hide();
			$("#xgsj_"+id).show();
			menu_opacity("xgsj_" + id + "_menu");
		}
	}else{
		//扩展
		ddl_other(item);
	}
}
function colse_win(id){
 	$("#alls_divs").children("div").each(function(){
		$(this).children("iframe").each(function(){
			if(this.id == id){//关闭
				$("#" + this.id).remove();
				$("#" + this.id + "_menu").remove();
				content_opacity("ssjg");
				menu_opacity("ssjg_div");
			}
		});
	});
	page_refush();
}
function go_lists(){
	content_opacity("ssjg");
	menu_opacity("ssjg_div");
	page_refush();
}
function page_refush(){
	$("#tt").datagrid('reload');
}
function ajax_data(url){
	$.ajax({  
        type:"POST",  
        url:url,
        timeout:6000,
        dataType:'json',
        success:function(data){
           //处理保存完毕后处理
			$.messager.alert(' ',data.message);
        	$("#tt").datagrid('reload');
        },
        error: function(){
			$.messager.alert('警告','系统异常，请稍后重试！','warning');
        },
        complete : function(XMLHttpRequest,status){
        	if(status == "timeout"){
        		ajaxTimeoutTest.abort();
				$.messager.alert('警告','加载数据超时！','warning');
        	}
        }
     });
}
$(function(){
	content_opacity("ssjg");
	menu_opacity("ssjg_div");
	$('#tjsj').height($('#west_h').height()-45);
	$('#xgsj').height($('#west_h').height()-45);
	$('#llsj').height($('#west_h').height()-45);
	$('#tjsj_add').height($('#tjsj').height());
});
/**
 * 日期格式转换
 * @param dateString
 * @returns {string}
 */
function dateFormat(dateString,separate){
	var dateFromat='';
	var dateLength=$.trim(dateString).length;
	if(dateLength>0){
		var year=dateString.substr(0,4);
		var month=dateString.substr(4,2);
		var day=dateString.substr(6,2);
		dateFromat=year+separate+month+separate+day;
		if(dateLength>8){
			var hour=dateString.substr(8,2);
			var minute=dateString.substr(10,2);
			var second=dateString.substr(12,2);
			dateFromat+=' '+hour+':'+minute+':'+second;
		}
	}
	return dateFromat;
}

/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author JENA
 * @since 20131115.1504
 * @website ishere.cn
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        jQuery(':input[placeholder]').each(function(index, element) {
            var self = $(this), txt = self.attr('placeholder');
            var width = self.outerWidth(true);
            self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none',width:width+'px',float:'left'}));
            var pos = self.position(), h = self.outerHeight(true), paddingleft = self.css('padding-left');
            var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lineHeight:h+"px", paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
            self.focusin(function(e) {
                holder.hide();
            }).focusout(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(e) {
                holder.hide();
                self.focus();
            });
            
            if(self.css("display") == "none" || self.is(":hidden")){
            	self.parent().css("display","none");
            }
            
        });
    }
};
//执行
jQuery(function(){
    JPlaceHolder.init();    
});