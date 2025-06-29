<?php

class DaoImplementV2 implements DaoInterface
{
	public function getData(): float
	{
		echo "Version web service";
		return 42;
	}
}
