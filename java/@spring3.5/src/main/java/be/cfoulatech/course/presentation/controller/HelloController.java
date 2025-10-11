package be.cfoulatech.course.presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
class HelloController
{
	@GetMapping("/hello")
	public String hello_world(Model model)
	{
		return "hello/details";
	}

	@GetMapping("/hello/{name}")
	public String hello_name(@PathVariable String name, Model model)
	{
		model.addAttribute("name", name);
		return "hello/details";
	}

	@GetMapping("/bonjour")
	public String bonjour(Model model)
	{
		model.addAttribute("firstname", "John");
		model.addAttribute("lastname", "Doe");
		model.addAttribute("city", "Paris");
		return "hello/bonjour";
	}
}
