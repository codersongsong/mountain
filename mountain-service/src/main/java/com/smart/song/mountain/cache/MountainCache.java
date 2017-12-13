package com.smart.song.mountain.cache;

import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ConcurrentHashMap;

/**
 * <Description> 应用级缓存 </Description>
 * <ClassName> MountainCache </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:38秒
 */
public class MountainCache {

	public static ConcurrentMap<String, String> business = new ConcurrentHashMap<String,String>();
	
}
