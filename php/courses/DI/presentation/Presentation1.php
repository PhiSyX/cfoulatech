<?php

class Presentation1
{
	public function run()
	{
		$d = new DaoImplement();
		$m = new MetierImplement($d);
		echo "Out: " + $m->calcul() + "\n";
	}
}
