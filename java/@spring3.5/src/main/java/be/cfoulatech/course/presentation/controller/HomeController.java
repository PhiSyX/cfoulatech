package be.cfoulatech.course.presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
class HomeController
{
	@GetMapping("/")
	public String index()
	{
		return "home/index";
	}

	@GetMapping("/hello")
	public String hello_world(
		Model model
	)
	{
		return "hello/details";
	}

	@GetMapping("/hello/{name}")
	public String hello_name(
		@PathVariable String name,
		Model model
	)
	{
		model.addAttribute("name", name);
		return "hello/details";
	}
}
