package com.smart.song.mountain.admin.interceptor;

import com.gomeplus.frame.cache.GlobalApplicationCache;
import com.smart.song.mountain.admin.util.CookiesUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import redis.Gcache;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <Description> 登陆拦截器 </Description>
 * <ClassName> GomeUserLoginInterceptor </ClassName>
 *
 * @Author generator
 * @Date 2017年12月13日 11时:57分:39秒
 */
public class GomeUserLoginInterceptor implements HandlerInterceptor {

    private Logger logger = LoggerFactory.getLogger(GomeUserLoginInterceptor.class);

    private String[] allowUrls = null;

    @Resource
    private Gcache fundGcache;


    public String[] getAllowUrls() {
        return allowUrls;
    }

    public void setAllowUrls(String[] allowUrls) {
        this.allowUrls = allowUrls;
    }

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/";
        request.setAttribute("basePath", basePath);
        String uri = request.getRequestURI();
        logger.info("权限校验,uri:{}", uri);
        for (String url : allowUrls) {
            if (uri.contains(url)) {
                return true;
            }
        }

        UserLoginBean userLoginBean = CookiesUtils.getCookie(request, response);
        if (userLoginBean == null) {
            logger.info("未登录");
            //response.sendRedirect(basePath + "login/login_show.dhtml");
            response.sendRedirect(GlobalApplicationCache.getInstance().getStr("login_show"));
            return false;
        }else{
             logger.info("当前操作用户：{}，校验权限：{}",userLoginBean.getUserId(),uri);
			
			//校验是否登录
			if(!"admin".equals(userLoginBean.getUserAccount()) && !check(uri,userLoginBean)){
				response.sendRedirect(GlobalApplicationCache.getInstance().getStr("limit_show"));
				return false;
			}
			
			request.setAttribute(CookiesUtils.USER_LOGIN_BEAN, userLoginBean);
			return true;
        }
    }

    private boolean check(String uri, UserLoginBean userLoginBean) {
        try {
            //校验是否登录
            String userMenuLimit = fundGcache.get("USER_MENU_LIMIT_" + userLoginBean.getUserId());

            JSONArray jas = JSONArray.fromObject(userMenuLimit);
            JSONObject jo = null;
            String reqUrl = uri.split("\\.")[0];
            String[] reqUrls = reqUrl.split("\\/");
            reqUrl = reqUrls[reqUrls.length - 2] + "/" + reqUrls[reqUrls.length - 1];
            for (int i = 0; i < jas.size(); i++) {
                jo = (JSONObject) jas.get(i);
                if (jo.getString("limitTal").indexOf(reqUrl) > -1) {//有权限
                    return true;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return true;
        }
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }

}
