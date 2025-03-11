<?php

namespace App\Entity;

use App\Repository\FicheDePaieRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: FicheDePaieRepository::class)]
class FicheDePaie
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\ManyToOne(inversedBy: 'fichesDePaie')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $coach = null;

    #[ORM\Column(length: 255)]
    private ?string $periode = null;

    #[ORM\Column]
    private ?float $totalHeures = null;

    #[ORM\Column]
    private ?float $montantTotal = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getCoach(): ?Coach
    {
        return $this->coach;
    }

    public function setCoach(?Coach $coach): static
    {
        $this->coach = $coach;

        return $this;
    }

    public function getPeriode(): ?string
    {
        return $this->periode;
    }

    public function setPeriode(string $periode): static
    {
        $this->periode = $periode;

        return $this;
    }

    public function getTotalHeures(): ?float
    {
        return $this->totalHeures;
    }

    public function setTotalHeures(float $totalHeures): static
    {
        $this->totalHeures = $totalHeures;

        return $this;
    }

    public function getMontantTotal(): ?float
    {
        return $this->montantTotal;
    }

    public function setMontantTotal(float $montantTotal): static
    {
        $this->montantTotal = $montantTotal;

        return $this;
    }
}