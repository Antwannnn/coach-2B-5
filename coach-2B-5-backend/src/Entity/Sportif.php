<?php

namespace App\Entity;

use App\Repository\SportifRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SportifRepository::class)]
class Sportif extends User
{
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['sportif:read', 'user:read'])]
    private ?\DateTimeInterface $dateInscription = null;

    #[ORM\Column(length: 255)]
    #[Groups(['sportif:read', 'user:read'])]
    private ?string $niveauSportif = null;

    #[ORM\ManyToMany(targetEntity: Seance::class, mappedBy: 'sportifs')]
    #[Groups(['sportif:read'])]
    private Collection $seances;

    public function __construct()
    {
        $this->seances = new ArrayCollection();
        $this->setRole('ROLE_SPORTIF');
    }

    public function getDateInscription(): ?\DateTimeInterface
    {
        return $this->dateInscription;
    }

    public function setDateInscription(\DateTimeInterface $dateInscription): static
    {
        $this->dateInscription = $dateInscription;

        return $this;
    }

    public function getNiveauSportif(): ?string
    {
        return $this->niveauSportif;
    }

    public function setNiveauSportif(string $niveauSportif): static
    {
        $this->niveauSportif = $niveauSportif;

        return $this;
    }

    /**
     * @return Collection<int, Seance>
     */
    public function getSeances(): Collection
    {
        return $this->seances;
    }

    public function addSeance(Seance $seance): static
    {
        if (!$this->seances->contains($seance)) {
            $this->seances->add($seance);
            $seance->addSportif($this);
        }

        return $this;
    }

    public function removeSeance(Seance $seance): static
    {
        if ($this->seances->removeElement($seance)) {
            $seance->removeSportif($this);
        }

        return $this;
    }
}