package com.smart.song.mountain.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * <Description> 测试控制器 </Description>
 * <ClassName> TestsController </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:39秒
 */
@Controller
@RequestMapping("/tests")
public class TestsController {

	@RequestMapping("/tests")
	public String init(Model model,HttpServletRequest request, HttpServletResponse response) {
		
		return "tests";
	}

}
