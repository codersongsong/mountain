package com.smart.song.mountain.admin.util;

import com.smart.song.mountain.admin.interceptor.UserLoginBean;
import com.gomeplus.frame.cache.GlobalApplicationCache;
import com.gomeplus.security.base64.Base64Util;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

/**
 * <Description> cookie添加、删除、查询操作类 </Description>
 * <ClassName> CookiesUtils </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:39秒
 */
public class CookiesUtils {
	private static final Logger logger = LoggerFactory.getLogger(CookiesUtils.class);

	public static String key = "finance_user";

	public static String charset = "UTF-8";

	public static String USER_LOGIN_BEAN = "userLoginBean";

	public static int cookieOverdue = Integer.parseInt((String) GlobalApplicationCache.getInstance().get("cookieOverdue")) ;
	
	public static String systemDomain = GlobalApplicationCache.getInstance().getStr("systemDomain");

	public static boolean addCookie(UserLoginBean userLoginBean, HttpServletResponse response) {
		try {
			JSONObject json = JSONObject.fromObject(userLoginBean);
			String content = Base64Util.encodeMessage(json.toString().getBytes(charset));
			Cookie cookie = new Cookie(key, content);
			cookie.setPath("/");
			cookie.setDomain(systemDomain);
			cookie.setMaxAge(cookieOverdue);
			response.addCookie(cookie);
			return true;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return false;
	}

	public static UserLoginBean getCookie(HttpServletRequest request, HttpServletResponse response) {
		try {
			Cookie[] cookies = request.getCookies();
			if (cookies != null) {
				Cookie userCookie = null;
				for (Cookie cookie : cookies) {
					if (cookie.getName().equals(key)) {
						userCookie = cookie;
						if (request.getServerName().equals(cookie.getDomain())) {
							break;
						}
					}
				}
				if (userCookie != null) {
					String value = userCookie.getValue();
					value = new String(Base64Util.decodeMessage(value), charset);
					userCookie.setPath("/");
					userCookie.setMaxAge(cookieOverdue);
					userCookie.setDomain(systemDomain);
					response.addCookie(userCookie);
					JSONObject jSONObject = JSONObject.fromObject(value);
					UserLoginBean userLoginBean = (UserLoginBean) JSONObject.toBean(jSONObject, UserLoginBean.class);
					return userLoginBean;
				}
			}
		} catch (UnsupportedEncodingException e) {
			logger.error("登陆获取cookie异常", e);
		}
		return null;
	}

	public static boolean delCookie(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			Cookie userCookie = null;
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(key)) {
					userCookie = cookie;
					if (request.getServerName().equals(cookie.getDomain())) {
						break;
					}
				}
			}
			if (userCookie != null) {
				userCookie.setPath("/");
				userCookie.setMaxAge(0);
				response.addCookie(userCookie);
			}
		}
		return false;
	}

}
