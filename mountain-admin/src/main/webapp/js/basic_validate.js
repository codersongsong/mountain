Date.prototype.format = function (format) {  
	var o = {  
		"M+": this.getMonth() + 1,  
		"d+": this.getDate(),  
		"h+": this.getHours(),  
		"m+": this.getMinutes(),  
		"s+": this.getSeconds(),  
		"q+": Math.floor((this.getMonth() + 3) / 3),  
		"S": this.getMilliseconds()  
	}  
	if (/(y+)/.test(format)) {  
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
	}  
	for (var k in o) {  
		if (new RegExp("(" + k + ")").test(format)) {  
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
		}  
	}  
	return format;  
}
$.extend(
		$.fn.validatebox.defaults.rules,
		{
			CHS : {
				validator : function(value, param) {
					return /^[\u0391-\uFFE5]+$/.test(value);
				},
				message : '请输入汉字'
			},
			english : {// 验证英语
				validator : function(value) {
					return /^[A-Za-z]+$/i.test(value);
				},
				message : '请输入英文'
			},
			CHS_EN_NUM : {
				validator : function(value) {
					return /^([\u4e00-\u9fa5]|[a-zA-Z0-9])+$/i.test(value);
				},
				message : '请输入中文英文或者数字'
			},
			CHS_EN_NUM_SOMECHAR : {
				validator : function(value) {
					return /^([\u4e00-\u9fa5]|[a-zA-Z0-9]|[%,=_\-，.。（）\(\)])+$/i.test(value);
				},
				message : '请输入中文英文或者数字'
			},
			RATE : {
				validator : function(value) {
					return /^(([1-9]\d*)|\d)(\.\d{1,2})?$/i.test(value);
				},
				message : '请输入利率，最多两位小数，如6.33'
			},
			ip : {// 验证IP地址
				validator : function(value) {
					return /\d+\.\d+\.\d+\.\d+/.test(value);
				},
				message : 'IP地址格式不正确'
			},
			ZIP : {
				validator : function(value, param) {
					return /^[0-9]\d{5}$/.test(value);
				},
				message : '邮政编码不存在'
			},
			QQ : {
				validator : function(value, param) {
					return /^[1-9]\d{4,10}$/.test(value);
				},
				message : 'QQ号码不正确'
			},
			mobile : {
				validator : function(value, param) {
					return /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/
							.test(value);
				},
				message : '手机号码不正确'
			},
			tel : {
				validator : function(value, param) {
					return /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?(-\d{1,6})?$/
							.test(value);
				},
				message : '电话号码不正确'
			},
			mobileAndTel : {
				validator : function(value, param) {
					return /(^([0\+]\d{2,3})\d{3,4}\-\d{3,8}$)|(^([0\+]\d{2,3})\d{3,4}\d{3,8}$)|(^([0\+]\d{2,3}){0,1}13\d{9}$)|(^\d{3,4}\d{3,8}$)|(^\d{3,4}\-\d{3,8}$)/
							.test(value);
				},
				message : '请正确输入电话号码'
			},
			number : {
				validator : function(value, param) {
					return /^[0-9]+.?[0-9]*$/.test(value);
				},
				message : '请输入数字'
			},
			money : {
				validator : function(value, param) {
					return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/)
							.test(value);
				},
				message : '请输入正确的金额'

			},
			moneyyuan : {
				validator : function(value, param) {
					return /^[1-9]+[0-9]{0,16}$/.test(value);
				},
				message : '请输入整数，单位为元'

			},
			mone : {
				validator : function(value, param) {
					return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/)
							.test(value);
				},
				message : '请输入整数或小数'

			},
			integer : {
				validator : function(value, param) {
					return /^[+]?[1-9]\d*$/.test(value);
				},
				message : '请输入最小为1的整数'
			},
			integ : {
				validator : function(value, param) {
					return /^[+]?[0-9]\d*$/.test(value);
				},
				message : '请输入整数'
			},
			range : {
				validator : function(value, param) {
					if (/^[1-9]\d*$/.test(value)) {
						return value >= param[0] && value <= param[1]
					} else {
						return false;
					}
				},
				message : '输入的数字在{0}到{1}之间'
			},
			minLength : {
				validator : function(value, param) {
					return value.length >= param[0]
				},
				message : '至少输入{0}个字'
			},
			maxLength : {
				validator : function(value, param) {
					return value.length <= param[0]
				},
				message : '最多{0}个字'
			},
			// select即选择框的验证
			selectValid : {
				validator : function(value, param) {
					if (value == param[0]) {
						return false;
					} else {
						return true;
					}
				},
				message : '请选择'
			},
			// 
			selectValueRequired: {  
		        validator: function (value, param) { 
		        	if(param!=undefined){
		        		if($("#"+param[0]).combobox("getValue")==undefined||$("#"+param[0]).combobox("getValue")==""){
		        			return false; 
		        		}else{
		        			return true; 
		        		}
		        	}else if (value == "" || value.indexOf('选择') >= 0 || value.indexOf('全部') >= 0) {
		         	   return false; 
		            }else { 
		         	   return true; 
		            } 
		             
		        },  
		        message: '请选择'  
		    },  
			idCode : {
				validator : function(value, param) {
					return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
							.test(value);
				},
				message : '请输入正确的身份证号'
			},
			loginName : {
				validator : function(value, param) {
					return /^[\u0391-\uFFE5\w]+$/.test(value);
				},
				message : '登录名称只允许汉字、英文字母、数字及下划线。'
			},
			equalTo : {
				validator : function(value, param) {
					return value == $(param[0]).val();
				},
				message : '两次输入的字符不一至'
			},
			ltCurTo : {//小于等于 当前时间
				validator : function(value, param) {
					return value >= new Date().format("yyyy-MM-dd hh:mm:ss");
				},
				message : '时间小于当前时间'
			},
			gtCurTo : {//大于等于 当前时间
				validator : function(value, param) {
					return value <= new Date().format("yyyy-MM-dd hh:mm:ss");
				},
				message : '时间大于当前时间'
			},
			ltTo : {//小于等于 时间
				validator : function(value, param) {
					if($(param[0]).datetimebox("getValue")==""){
						return true;
					}
					return value >= $(param[0]).datetimebox("getValue");
				},
				message : '结束时间小于开始时间'
			},
			gtTo : {//大于等于 时间
				validator : function(value, param) {
					if($(param[0]).datetimebox("getValue")==""){
						return true;
					}
					return value <= $(param[0]).datetimebox("getValue");
				},
				message : '开始时间大于结束时间'
			},
			timeCmp : {//时间与时间比较，参数1：比较时间id，参数2：错误描述参数
				validator : function(value, param) {
					if($(param[0]).datetimebox("getValue")==""){
						return true;
					}
					return value >= $(param[0]).datetimebox("getValue");
				},
				message : '{1}'
			},
			englishOrNum : {// 只能输入英文和数字
				validator : function(value) {
					return /^[a-zA-Z0-9]{1,}$/.test(value);
				},
				message : '请输入英文、数字'
			},
			xiaoshu : {
				validator : function(value) {
					return /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/
							.test(value);
				},
				message : '最多保留两位小数！'
			},
			ddPrice : {
				validator : function(value, param) {
					if (/^[1-9]\d*$/.test(value)) {
						return value >= param[0] && value <= param[1];
					} else {
						return false;
					}
				},
				message : '请输入1到100之间正整数'
			},
			jretailUpperLimit : {
				validator : function(value, param) {
					if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
						return parseFloat(value) > parseFloat(param[0])
								&& parseFloat(value) <= parseFloat(param[1]);
					} else {
						return false;
					}
				},
				message : '请输入0到100之间的最多俩位小数的数字'
			},
			rateCheck : {
				validator : function(value, param) {
					if (/^[0-9]+([.]{1}[0-9]{1,2})?$/.test(value)) {
						return parseFloat(value) > parseFloat(param[0])
								&& parseFloat(value) <= parseFloat(param[1]);
					} else {
						return false;
					}
				},
				message : '请输入0到1000之间的最多俩位小数的数字'
			},
			regExpCheck : {
				validator : function(value, param) {
					var regExp = new RegExp(param[0]);
					if(regExp.test(value)){
						return true;
					}else{
						return false;
					}
				},
				message : '请填写正确的值'
			}
		});