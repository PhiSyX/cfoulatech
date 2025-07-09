<?php

namespace App\Repository;

use App\Entity\RecipeComment;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<RecipeComment>
 */
class RecipeCommentRepository extends ServiceEntityRepository
{
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, RecipeComment::class);
	}

	public function findOne(int $rid, int $uid, int $cid): ?RecipeComment
	{
		return $this->createQueryBuilder('c')
			->where('c.recipe = :rid')
			->andWhere('c.author = :uid')
			->andWhere('c.id = :cid')
			->setParameter('rid', $rid)
			->setParameter('uid', $uid)
			->setParameter('cid', $cid)
			->getQuery()
			->getOneOrNullResult();
	}
}
