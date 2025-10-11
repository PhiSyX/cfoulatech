package be.cfoulatech.course.presentation.controller;

import be.cfoulatech.course.business.service.MemberService;
import be.cfoulatech.course.domain.entity.Member;
import be.cfoulatech.course.domain.enums.MemberStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequiredArgsConstructor
class MemberController
{
	private final MemberService memberService;

	private List<Member> exampleDataMembers()
	{
		var members = new ArrayList<Member>();

		members.add(
			new Member("Doe", "John", "john@doe.org", LocalDate.of(1991, 10, 10), MemberStatus.ACTIVE)
		);

		members.add(
			new Member("Lenhon", "John", "john@lenhon.org", LocalDate.of(1971, 10, 10), MemberStatus.EXPIRED)
		);
		return members;
	}

	private List<Member> dataMembers()
	{
		return memberService.findAll();
	}

	@GetMapping(value = "/ex/members", name = "member_ex_index")
	public String ex_index(Model model)
	{
		var members = exampleDataMembers();
		model.addAttribute("members", members);
		return "member/index";
	}

	@GetMapping(value = "/ex/members/{email}", name = "member_ex_details")
	public String ex_show(@PathVariable String email, Model model)
	{
		var members = exampleDataMembers();
		var member = members.stream().filter(m -> m.getEmail().equals(email)).findFirst().get();
		model.addAttribute("member", member);
		return "member/details";
	}

	@GetMapping(value = "/members", name = "member_index")
	public String index(Model model)
	{
		var members = dataMembers();
		model.addAttribute("members", members);
		return "member/index";
	}

	@GetMapping(value = "/members/{email}", name = "member_details")
	public String show(@PathVariable String email, Model model)
	{
		var members = dataMembers();
		var member = members.stream().filter(m -> m.getEmail().equals(email)).findFirst().get();
		model.addAttribute("member", member);
		return "member/details";
	}
}
