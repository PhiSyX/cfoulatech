<?php

namespace App\DTO;

use Knp\Component\Pager\Pagination\PaginationInterface;

class RecipeListDTO
{
	public function __construct(
		public PaginationInterface $list,
		public int                 $total,
	)
	{
	}
}
