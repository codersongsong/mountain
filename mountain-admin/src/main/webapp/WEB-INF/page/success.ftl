<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<base href='${Request["basePath"] ! ""}' />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>金融财神系统管理后台</title>
	<link rel="stylesheet" type="text/css" href="css/themes/metro/easyui.css">
	<link rel="stylesheet" type="text/css" href="css/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="css/basic.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
</head>
<body>
<div style="background:#E0ECFF; border: 0.03cm #95B8E7 solid;width:250px;height:100px;padding:20px;margin-left: auto;margin-right: auto;margin-top:100px;">
	<table>
		<tr><td  width="20" height="60"></td><td  width="60">
		<#if resultStatus = "true">
			<div style="width: 44px; height: 44px; background: url(images/result_src.png) no-repeat -94px 0px;">&nbsp;<div>
		<#else>
			<div style="width: 44px; height: 44px; background: url(images/result_src.png) no-repeat -138px 0px;">&nbsp;<div>
		</#if>
		</td><td style="font-size:14px;">${messages}</td></tr>
		<tr><td></td><td></td><td>
			<span onclick="add_win('${ADN_ADD_URL}')" class="easyui-linkbutton" data-options="iconCls:'icon-add'">继续添加&nbsp;&nbsp;</span>&nbsp;&nbsp;
		</td></tr>
	</table>
	
</div>
<script type="text/javascript">	
function add_win(url){
	parent.$('#tjsj_add').attr('src', url);
}
</script>
</body>
</html>