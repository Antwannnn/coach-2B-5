<?php

namespace App\Repository;

use App\Entity\Sportif;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Sportif>
 *
 * @method Sportif|null find($id, $lockMode = null, $lockVersion = null)
 * @method Sportif|null findOneBy(array $criteria, array $orderBy = null)
 * @method Sportif[]    findAll()
 * @method Sportif[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SportifRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Sportif::class);
    }

    public function save(Sportif $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Sportif $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }
}