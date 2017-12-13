package com.smart.song.mountain.dubbo.bean;

/**
 * <Description> 黄河入海流常量类 </Description>
 * <ClassName> MountainConstants </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:38秒
 */
public class MountainConstants {
	
	/**返回结果码：0000成功；*/
	public final static String RESULT_SUCCESS = "0000";
	
	/**返回结果码：0001，重复入库；*/
	public final static String RESULT_REPEAT = "0001";
	
	/**返回结果码：0003，过期。*/
	public final static String RESULT_EXPIRE = "0003"; 
	
	/**返回结果码：0002，失败。*/ 
	public final static String RESULT_FAIL = "0002"; 

	/**返回结果码：5555,接口调用权限限制*/
	public final static String CHANNEL_LIMIT = "5555"; 
	
}
