document.oncontextmenu=function(){return false;}
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
    	$.each(rowData,function(k,v){
			if(k == pri_key){
				openEast($("#url").val()+"view.dhtml?id_key=" + v);
				var left_title = $("#tt").attr("left_title");
				$('#east_show').panel('setTitle',left_title);
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
		var dg = $('#tt');
	    var queryParams =dg.datagrid('options').queryParams; 
	    params_str(queryParams);
	    dg.datagrid('options').queryParams = queryParams;  
	    dg.datagrid('reload'); 
	});
	
	$('#search_clear_button').click(function(){
		$("#searchClear").find("input").each(function(){
		   if(this.type == "text" && this.id != ""){
			   var attr_V = $("#"+this.id).attr("class");
			   if(attr_V.indexOf("easyui-combobox") >= 0){
				   $("#"+this.id).combobox('setValue',"");
			   }else{
				   $("#"+this.id).textbox("setValue","");
			   }
		   }else if(this.type == "radio" && this.name != ""){
			   $("input[name='"+this.name+"']").prop('checked',false);
		   }else if(this.type == "checkbox" && this.name != ""){
			   $("input[name='"+this.name+"']").removeAttr("checked");//取消全选   
		   }
		});
	});
});

function ajax_data(url){
	$.ajax({  
        type:"POST",  
        url:url,
        timeout:6000,
        dataType:'json',
        success:function(data){
           //处理保存完毕后处理
        	alert(data.message);
        	$("#tt").datagrid('reload');
        },
        error: function(){  
           alert('系统异常，请稍后重试！');  
        },
        complete : function(XMLHttpRequest,status){
        	if(status == "timeout"){
        		ajaxTimeoutTest.abort();
        		alert("加载数据超时！");
        	}
        }
     });
}