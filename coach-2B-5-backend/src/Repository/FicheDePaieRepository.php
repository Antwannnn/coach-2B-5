<?php

namespace App\Repository;

use App\Entity\FicheDePaie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<FicheDePaie>
 *
 * @method FicheDePaie|null find($id, $lockMode = null, $lockVersion = null)
 * @method FicheDePaie|null findOneBy(array $criteria, array $orderBy = null)
 * @method FicheDePaie[]    findAll()
 * @method FicheDePaie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FicheDePaieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FicheDePaie::class);
    }

    public function save(FicheDePaie $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(FicheDePaie $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}