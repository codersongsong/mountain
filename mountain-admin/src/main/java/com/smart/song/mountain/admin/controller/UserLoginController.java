package com.smart.song.mountain.admin.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.gomeplus.frame.controller.AbstractAdminController;

/**
 * <Description> 登陆控制器 </Description>
 * <ClassName> UserLoginController </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:39秒
 */
@Controller
@RequestMapping("/login")
public class UserLoginController extends AbstractAdminController{

	@RequestMapping("/login")
	public String login(Model model,HttpServletRequest request, HttpServletResponse response) {
		
		return "login";
	}

	@RequestMapping("/loginCheck")
	public String loginCheck(Model model,HttpServletRequest request, HttpServletResponse response) {
		
		return "default";
	}

}
