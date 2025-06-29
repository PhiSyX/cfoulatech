<?php

require_once "./Employee.php";

$employees = [
	new Employee("M1", "S.", "Mike", new DateTime("1991-12-07"), new DateTime("16-10-2004"), 4300),
	new Employee("M2", "M.", "Lionel", new DateTime("1986-06-24"), new DateTime("12-11-2014"), 2000),
	new Employee("M3", "D.", "Alessandro", new DateTime("1974-11-09"), new DateTime("12-07-2015"), 2300),
	new Employee("M4", "D.", "Maradona", new DateTime("1960-10-30"), new DateTime("16-10-2024"), 3000),
];

foreach ($employees as $employee) {
	echo $employee->display();

	$salary_inc = rand(10, 200);
	echo "On augmente le salaire de " . $salary_inc . " €, ";
	$employee->increaseSalary($salary_inc);
	echo "son nouveau salaire est de " . $employee->getSalary() . " € <br>";

	echo "<hr>";
}
