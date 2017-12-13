<!doctype html>
<html lang="en">
<head>
	<base href='${Request["basePath"] ! ""}' />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>后台管理系统</title>
	<style type="text/css">
		*{margin:0px;padding:0px;}
		body{font:12px/1.0 Arial,Microsoft YaHei,Tahoma;}
		ol, ul {list-style: none;}
		.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
		.clearfix{*zoom:1;}
		.l-top{margin:0 auto;width:100%;height:180px;background:#fff;font-family:Microsoft Yahei;}
		.l-top h1{width:528px;height:70px;margin:0px auto;padding-top:25px;}
		.l-top h1 i{float:left;display:inline-block;height:70px;width:75px;background:url(images/login-alllogo.png) no-repeat;background-position:0px -49px;}
		.l-top h1 b{float:left;display:inline-block;height:70px;line-height:70px;padding-left:20px;font-size:52px;color:black;font-weight:normal;}
		.l-body{width:100%;}
		.l-b-con{margin:0 auto;width:1200px;padding-top:500px;position:relative;}
		.l-con-img{position:absolute;height:130px;width:130px;background:url(images/login-alllogo.png) no-repeat 0px -125px;top:-65px;left:535px;}
		.l-con-info{margin:0px auto;width:426px;height:260px;padding:75px 70px 0px 32px;}
		.l-con-info .info-tr{padding-bottom:20px;height:40px;line-height:40px;}
		.l-con-info .info-tr .col1{width:100px;height:40px;padding-right:20px;text-align:right;font-size:24px;color:#aaa;}
		.l-con-info .info-tr .col2{width:306px;}
		.l-con-info .info-tr .col1,.l-con-info .info-tr .col2{float:left;}
		.col2 .username,.col2 .password,.col2 .code,.col2 .codeBtn{height:40px;line-height:40px;color:#b2b2b2;border-radius:4px;border: 1px #aaa solid;padding:0px 5px;}
		.col2 .username,.col2 .password{width:296px;font-size:16px;}
		.col2 .code{float:left;width:138px;font-size:36px;margin-right:10px;}
		.col2 .codeBtn{float:left;width:134px;font-size:35px;text-align:center;letter-spacing:0.125em;background-color:#DDD}
		.col2 button{border:0px;background-color:#05aed4;color:#fff;text-align:center;width:130px;height:40px;font-size:18px;border-radius:4px;cursor:pointer;}
		.col2 .login-btn{float:left;}
		.col2 .close-btn{float:right;}
		.l-con-contact{margin:0px auto;width:528px;height:44px;padding:50px 0px;color:#fff;}
		.l-con-contact .contact-info .icon{float:left;width:46px;height:44px;background:url(images/login-alllogo.png) no-repeat;}
		.l-con-contact .phone{float:left;}
		.l-con-contact .qq{float:right;}
		.l-con-contact .phone .icon{background-position:0px 0px;}
		.l-con-contact .qq .icon{background-position:-48px 0px;}
		.l-con-contact .contact-info .contact-con{float:left;height:44px;padding-left:10px;}
		.l-con-contact .contact-info .contact-con .number-title,.l-con-contact .contact-info .contact-con .number{height:22px;}
		.l-con-contact .contact-info .contact-con .number-title{font-size:15px;}
		.l-con-contact .contact-info .contact-con .number{font-size:24px;font-weight:bold;}
		.l-con-platform{margin:0px auto;width:1200px;padding-bottom:100px;}
		.l-con-platform li{float:left;width:240px;text-align:center;}
		.l-con-platform li .platform-name{color:000;font-size:18px;height:20px;line-height:20px;margin-bottom:12px;}
		.l-con-platform li .platform-entry{display:block;width:72px;height:26px;line-height:26px;background-color:#558bd4;color:#fff;font-size:14px;border-radius:2px;text-decoration:none;margin-left:60px;}
	</style>
	<link rel="stylesheet" type="text/css" href="css/themes/metro/easyui.css">
	<link rel="stylesheet" type="text/css" href="css/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="css/basic.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
</head>
<body style="background:url(images/login.png)">
<form id="loginForm" method="POST" action="login/loginCheck.dhtml">
	<div class="l-body clearfix">
		<div class="l-b-con">
			<div class="l-con-info">
				<div class="info-tr clearfix">
					<div class="col1">登录账号</div>
					<div class="col2">
						<input class="username" id="userAccount" name="userAccount"  value="" type="text" placeholder="请输入账号">
					</div>
				</div>
				<div class="info-tr clearfix">
					<div class="col1">登录密码</div>
					<div class="col2">
						<input class="password" id="password" name="password" value="" type="password" placeholder="请输入密码">
					</div>
				</div>
				<div class="info-tr clearfix">
					<div class="col1">验证码</div>
					<div class="col2">
						<input class="code" id="checkCode" name="checkCode" type="text" value="">
						<span class="codeBtn">${code!'123456'}</span>
					</div>
				</div>
				<div class="info-tr clearfix">
					<div class="col1"></div>
					<div class="col2">
						<button class="login-btn" type="button" onClick="onLogin()">登 录</button>
						<button class="close-btn" type="button">关 闭</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
</body>
<script type="text/javascript">
function onLogin(){
	if($("#userAccount").val() == ""){
		alert("用户名不能为空");
		return;
	}
	if($("#password").val() == ""){
		alert("密码不能为空");
		return;
	}
	if($("#checkCode").val() == ""){
		alert("验证码不能为空");
		return;
	}
	loginForm.submit();
}
</script>
</html>