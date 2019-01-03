package kr.co.netpoint.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);

	@RequestMapping(value = "/")
	public String redirectMain() {
		logger.info(">>> page /");
		return "redirect:main/main";
	}

	@RequestMapping(value = "/main/main")
	public ModelAndView main() {
		logger.info(">>>main");
		ModelAndView mv = new ModelAndView();
		mv.setViewName("main/main");
		return mv;
	}

	@RequestMapping(value = "/test/test")
	public ModelAndView test() {
		logger.info(">>>test");
		ModelAndView mv = new ModelAndView();
		mv.setViewName("test/test");
		return mv;
	}
	@RequestMapping(value = "/test/send")
	public ModelAndView send() {
		logger.info(">>>send");
		ModelAndView mv = new ModelAndView();
		mv.setViewName("test/send");
		return mv;
	}
}
