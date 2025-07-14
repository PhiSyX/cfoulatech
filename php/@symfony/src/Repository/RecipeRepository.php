<?php

namespace App\Repository;

use App\DTO\RecipeListDTO;
use App\DTO\SearchDTO;
use App\Entity\Recipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @extends ServiceEntityRepository<Recipe>
 */
class RecipeRepository extends ServiceEntityRepository
{
	const int RECIPES_PER_PAGE = 9;

	public function __construct(
		ManagerRegistry            $registry,
		private PaginatorInterface $paginator,
	)
	{
		parent::__construct($registry, Recipe::class);
	}

	/**
	 * @return Recipe[]
	 */
	public function findFromSmallerDuration(int $duration): array
	{
		return $this->createQueryBuilder("r")
			->where("r.duration <= :duration")
			->orderBy("r.duration", "ASC")
			->setParameter("duration", $duration)
			->getQuery()
			->getResult();
	}

	public function findBySearch(SearchDTO $searchDTO): PaginationInterface
	{
		$q = urlencode($searchDTO->getQuery());
		$recipes = $this->createQueryBuilder("r")
			->where("r.title LIKE :search")
			->setParameter("search", "%{$q}%")
			->getQuery()
			->getResult();
		return $this->paginator->paginate($recipes, $searchDTO->getPage(), 9);
	}

	public function all(
		?int $duration = null,
		?int $page = 1,
	): RecipeListDTO
	{
		$recipes = [];

		if ($duration) {
			$recipes = $this->findFromSmallerDuration($duration);
		} else {
			$recipes = $this->findAll();
		}

		$totalRecipes = count($recipes);

		$recipes = $this->paginator->paginate(
			$recipes,
			$page,
			self::RECIPES_PER_PAGE,
		);

		return new RecipeListDTO($recipes, $totalRecipes);
	}

	public function filter(SearchDTO $searchDTO, ?int $page = 1): RecipeListDTO
	{
		$searchDTO->setPage($page);
		$recipes = $this->findBySearch($searchDTO);
		return new RecipeListDTO($recipes, count($recipes));
	}

//    /**
//     * @return Recipe[] Returns an array of Recipe objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('r.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Recipe
//    {
//        return $this->createQueryBuilder('r')
//            ->andWhere('r.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
