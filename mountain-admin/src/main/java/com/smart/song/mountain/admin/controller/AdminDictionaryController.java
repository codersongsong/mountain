package com.smart.song.mountain.admin.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gomeplus.frame.cache.DictionaryVo;
import com.gomeplus.frame.cache.GlobalDataDictionaryCache;
import com.gomeplus.frame.controller.AbstractAdminController;

/**
 * <Description> 数据字典获取控制器 </Description>
 * <ClassName> AdminDictionaryController </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:39秒
 */
@Controller
@RequestMapping("/dictionary")
public class AdminDictionaryController extends AbstractAdminController{

	@RequestMapping("/select")
	public void selects(HttpServletRequest request, HttpServletResponse response) {
		List<DictionaryVo> list = new ArrayList<DictionaryVo>();
		try {
			String key = request.getParameter("key");
			List<DictionaryVo> obj = GlobalDataDictionaryCache.getInstance().getIdValue(key);
			if (obj != null) {
				Collections.addAll(list,  new  DictionaryVo[obj.size()]);   
				Collections.copy(list, obj);   
				DictionaryVo idvalue = new DictionaryVo(null,"全部",true);
				list.add(0, idvalue);
			}
			ajaxJsonMessage(response,JSONArray.fromObject(list).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/selectv")
	public void selectsv(HttpServletRequest request, HttpServletResponse response) {
		try {
			String key = request.getParameter("key");
			List<DictionaryVo> obj = GlobalDataDictionaryCache.getInstance().getIdValue(key);
			ajaxJsonMessage(response,JSONArray.fromObject(obj).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/selectl")
	public void selectl(HttpServletRequest request, HttpServletResponse response) {
		List<DictionaryVo> list = new ArrayList<DictionaryVo>();
		try {
			String key = request.getParameter("key");
			List<DictionaryVo> obj = GlobalDataDictionaryCache.getInstance().getIdValue(key);
			if (obj != null) {
				Collections.addAll(list,  new  DictionaryVo[obj.size()]);   
				Collections.copy(list, obj);   
				DictionaryVo idvalue = new DictionaryVo(null,"无",true);
				list.add(0, idvalue);
			}
			ajaxJsonMessage(response,JSONArray.fromObject(list).toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
