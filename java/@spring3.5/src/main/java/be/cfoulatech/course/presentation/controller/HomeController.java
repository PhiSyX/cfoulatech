package be.cfoulatech.course.presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
class HomeController
{
	@GetMapping("/")
	public String index()
	{
		return "home/index";
	}
}
