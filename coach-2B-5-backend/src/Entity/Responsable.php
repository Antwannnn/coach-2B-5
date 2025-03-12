<?php

namespace App\Entity;

use App\Repository\ResponsableRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ResponsableRepository::class)]
class Responsable extends User
{
    #[ORM\Column(length: 255)]
    #[Groups(['responsable:read', 'user:read'])]
    private ?string $departement = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['responsable:read', 'user:read'])]
    private ?string $telephone = null;

    public function __construct()
    {
        $this->setRole('ROLE_RESPONSABLE');
    }

    public function __toString(): string
    {
        return $this->getNom() . ' ' . $this->getPrenom();
    }

    public function getDepartement(): ?string
    {
        return $this->departement;
    }

    public function setDepartement(string $departement): static
    {
        $this->departement = $departement;

        return $this;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }
} 