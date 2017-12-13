package com.smart.song.mountain.admin.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.gomeplus.frame.cache.DictionaryVo;
import com.gomeplus.frame.cache.GlobalDataDictionaryCache;

import com.smart.song.mountain.admin.logic.CacheService;

/**
 * <Description> 缓存参数初始化接口实现 </Description>
 * <ClassName> CacheServiceImpl </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:39秒
 */
@Service
public class CacheServiceImpl implements CacheService {

	private Logger logger = LoggerFactory.getLogger(this.getClass().getSimpleName());
	
	@PostConstruct
	private void inits() {
		logger.info("系统启动时初始化静态参数开始...");
		setSysDic();
		logger.info("系统启动时初始化静态参数成功");
	}
	
	public void cacheUpdate() {
		logger.info("系统更新初始化静态参数开始...");
		setSysDic();
		logger.info("系统更新初始化静态参数成功");
	}

	private void setSysDic(){
		List<DictionaryVo> list = new ArrayList<DictionaryVo>();
		list.add(new DictionaryVo("010","测试1"));
		list.add(new DictionaryVo("020","测试2"));
		list.add(new DictionaryVo("030","测试3"));
		list.add(new DictionaryVo("040","测试4"));
		GlobalDataDictionaryCache.getInstance().putIdValue("TEST_TEST", list);
	}
}
