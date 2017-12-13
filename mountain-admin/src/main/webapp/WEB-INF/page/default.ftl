<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<base href='${Request["basePath"] ! ""}' />
	<title>项目自动化管理后台</title>
	<link rel="stylesheet" type="text/css" href="css/themes/metro/easyui.css">
	<link rel="stylesheet" type="text/css" href="css/themes/icon.css">
	<link rel="stylesheet" type="text/css" href="css/default.css">
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="js/jquery.easyui-lang-zh_CN.js"></script>
</head>
<body class="easyui-layout" data-options="fit:true">
	<div data-options="region:'north',border:false" id="norths" style="overflow:visible;">
		<div class="login-Bg">
			<div class="logo"></div>
			<div class="user-status" style="color:#ffffff"><br/>
			当前用户：${user.trueName!''}&nbsp;&nbsp;&nbsp;&nbsp;
			<#if user.userAccount = "admin">
			【<span onclick="add_menu('修改密码','login/update.dhtml','update','update')" style="color:#ffffff;cursor:pointer">修改密码</span>】
			</#if>
			【<a href="login/refundLogin.dhtml"  style="color:#ffffff;text-decoration:none;">退出登录</a>】</div>
		</div>
		<div class="main-nav">
			<div class="main-nav-logo"></div>
			<div class="main-nav-box">
				<ul class="nav-box">
					<li class="nav-item click-cur" id="nav-item-dlsy">
						<a class="nav-item-primary" onClick="add_menu('登录首页','defaultshow/show.dhtml','dlsy',this)">登录首页</a>
					</li>
					<#if quickMenuListCount = "1">
						<li class="nav-item" id="nav-item-0000">
							<a class="nav-item-primary">快捷菜单</a>
							<div class="dropbox" id="dropbox0000">
								<#list quickMenuList as menuInfo_quick>
									<dl>
										<dt onclick="add_menu('${menuInfo_quick.menuName}','${menuInfo_quick.menuUrl!""}','${menuInfo_quick.menuNo?c}','dropbox0000')">${menuInfo_quick.menuName}<i class="sub-line"></i></dt>
									</dl>
								</#list>
							</div>
						</li>
					</#if>
					<#list menuList as menuInfo_one>
		 				<#if menuInfo_one.parentNo = 0>
				 			<li class="nav-item" id="nav-item-${menuInfo_one.menuNo?c}">
								<a class="nav-item-primary">${menuInfo_one.menuName}</a>
								<#assign two_Menu_num = 0>
								<#list menuList as menuInfo_two>
									<#if menuInfo_one.menuNo = menuInfo_two.parentNo >
										<#assign two_Menu_num = two_Menu_num+1>
									</#if>
								</#list>
								<#if two_Menu_num gt 0 >
									<div class="dropbox" id="dropbox${menuInfo_one.menuNo?c}">
										<#list menuList as menuInfo_two>
											<#if menuInfo_one.menuNo = menuInfo_two.parentNo >
												<dl>
													<dt>${menuInfo_two.menuName}<i class="sub-line"></i></dt>
													<dd>
														<#list menuList as menuInfo_three>
															<#if menuInfo_two.menuNo = menuInfo_three.parentNo && menuInfo_three.menuUrl != ''>
																<a id="nav-bxsy" onclick="add_menu('${menuInfo_three.menuName}','${menuInfo_three.menuUrl}','${menuInfo_three.menuNo?c}','dropbox${menuInfo_one.menuNo?c}')">${menuInfo_three.menuName!""}</a>
															</#if>
														</#list>
													</dd>
												</dl>
											</#if>
										</#list>
									</div>
								</#if>
							</li>
						</#if>
					</#list>
				</ul>
			</div>
		</div>
	</div>
	<div data-options="region:'center',border:false" id="center_div">
		<iframe scrolling="no" id="centerIframe-dlsy" frameborder="no" frameborder="0" marginwidth="0" marginheight="0"  src="defaultshow/show.dhtml" style="width:100%;"></iframe>
	</div>
	<div data-options="region:'south',border:false" class="default_menu" id="south_div">
		<div class="cur-item dlsy" id="dlsy_menu" parentMenuID="nav-item-dlsy">登录首页</div>
	</div>
</body>
<input type="text" id="height_default" value=""/>
<script type="text/javascript" src="js/default.js?a=bbabb"></script>
</html>